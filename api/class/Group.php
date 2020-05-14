<?php


class Group
{

  use Db;

  /**
   * @var int
   */
  private $id;
  /**
   * @var string
   */
  private $name;
  /**
   * @var string
   */
  private $description;
  /**
   * @var int
   */
  private $timestamp;
  /**
   * @var string
   */
  private $security;
  /**
   * @var string
   */
  private $visibility;
  /**
   * @var int
   */
  private $userId;

  /**
   * @var int
   */
  private $rankUser;

  public function __construct(/*$name*/)
  {
    /*$this->name = $name;*/
  }

  /**
   * @param $id int
   */
  private function setId($id) {
    $this->id = $id;
  }

  /**
   * @param $name string
   */
  private function setName($name) {
    $this->name = $name;
  }
  /**
   * @param $description string
   */
  private function setDescription($description) {
    $this->description = $description;
  }
  /**
   * @param $timestamp int
   */
  private function setTimestamp($timestamp) {
    $this->timestamp = $timestamp;
  }
  /**
   * @param $security string
   */
  private function setSecurity($security) {
    $this->security = $security;
  }
  /**
   * @param $visibility string
   */
  private function setVisibility($visibility) {
    $this->visibility = $visibility;
  }

  /**
   * @param $rankUser int
   */
  private function setRankUser($rankUser) {
    $this->rankUser = $rankUser;
  }

  /**
   * @param $userId int
   */
  private function setUserId($userId) {
    $this->userId = $userId;
  }

  /**
   * @return int
   */
  public function getId() {
    return $this->id;
  }

  /**
   * @return string
   */
  public function getName() {
    return $this->name;
  }

  /**
   * @return string
   */
  public function getDescription() {
    return $this->description;
  }

  /**
   * @return int
   */
  public function getTimestamp() {
    return $this->timestamp;
  }

  /**
   * @return string
   */
  public function getSecurity() {
    return $this->security;
  }

  /**
   * @return string
   */
  public function getVisibility() {
    return $this->visibility;
  }

  /**
   * @return int
   */
  public function getRankUser() {
    return $this->rankUser;
  }

  /**
   * @return int
   */
  public function getUserId() {
    return $this->userId;
  }

  /**
   * @param $name string
   * @return int|null
   */
  private function searchGroupId($name)
  {
    $this->setName($name);
    $sql = $this->getDB()->prepare('SELECT id, name FROM groups');

    $sql->execute();

    while($row = $sql->fetch(PDO::FETCH_ASSOC)){
      if($row['name'] == $this->getName())
      {
        $id = intval($row['id']);
        $sql->closeCursor();

        return $id;
      }
    }
    $sql->closeCursor();

    return NULL;
  }

  /**
   * @return array
   */
  public function searchAllGroup() {
    $sql = $this->getDB()->prepare("SELECT * FROM groups WHERE visibility = 'visible'");

    $sql->execute();

    $row = $sql->fetchAll(PDO::FETCH_ASSOC);

    $sql->closeCursor();

    return $row;
  }

  /**
   * @param $userId int
   * @return array
   */
  public function searchAllGroupCurrentUser($userId) {
    $this->setUserId($userId);

    $sql = $this->getDb()->prepare('
        SELECT groups.*
        FROM group_rank
        LEFT JOIN user ON group_rank.user_id = user.id
        LEFT JOIN groups ON group_rank.group_id = groups.id
        WHERE user.id = :id'
    );
    $sql->bindValue(':id', $this->getUserId());
    $sql->execute();


    $row = $sql->fetchAll(PDO::FETCH_ASSOC);
    $sql->closeCursor();
    return $row;
  }

  /**
   * @return bool
   */
  private function searchAlreadyMember() {
    $sql = $this->getDb()->prepare('
        SELECT *
        FROM group_rank
        WHERE group_id = :group_id && user_id = :user_id'
    );
    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();

    $row = $sql->fetch(PDO::FETCH_ASSOC);
    if($row['user_id'] === $this->getUserId()) {
      $sql->closeCursor();
      return false;
    }
    $sql->closeCursor();
    return true;
  }

  /**
   * @param $name string
   * @param $description string
   * @param $security string
   * @param $visibility string
   * @param $userId int
   * @return bool|int
   */
  public function addGroup($name, $description, $security, $visibility, $userId) {
    $this->setName($name);
    $this->setId($this->searchGroupId($this->getName()));
    $this->setDescription($description);
    $this->setTimestamp(time());
    $this->setSecurity($security);
    $this->setVisibility($visibility);
    $this->setUserId($userId);

    if(!isset($this->id)) {
      $sql = $this->getDB()->prepare('INSERT INTO groups (name, description, date, security, visibility)
                                                VALUES (:name, :description, :timestamp, :security, :visibility)');

      $sql->bindValue(':name', $this->getName());
      $sql->bindValue(':description', $this->getDescription());
      $sql->bindValue('timestamp', $this->getTimestamp());
      $sql->bindValue('security', $this->getSecurity());
      $sql->bindValue('visibility', $this->getVisibility());

      $sql->execute();

      $sql->closeCursor();

      $this->assignmentRank(1, $this->getUserId());

      $this->setId($this->searchGroupId($this->getName()));

      return $this->getId();
    }
    return false;
  }

  /**
   * @param $groupId int
   * @param $name string
   */
  public function updateName($groupId, $name) {
    $this->setId($groupId);
    $this->setName($name);

    $sql = $this->getDB()->prepare('UPDATE groups SET name = :name WHERE id = :id');
    $sql->bindValue(':name', $this->getName());
    $sql->bindValue(':id', $this->getId());
    $sql->execute();
    $sql->closeCursor();
  }
  /**
   * @param $groupId int
   * @param $description string
   */
  public function updateDescription($groupId, $description) {
    $this->setId($groupId);
    $this->setDescription($description);

    $sql = $this->getDB()->prepare('UPDATE groups SET description = :description WHERE id = :id');
    $sql->bindValue(':description', $this->getDescription());
    $sql->bindValue(':id', $this->getId());
    $sql->execute();
    $sql->closeCursor();
  }
  /**
   * @param $groupId int
   * @param $security string
   */
  public function updateSecurity($groupId, $security) {
    $this->setId($groupId);
    $this->setSecurity($security);

    $sql = $this->getDB()->prepare('UPDATE groups SET security = :security WHERE id = :id');
    $sql->bindValue(':security', $this->getSecurity());
    $sql->bindValue(':id', $this->getId());
    $sql->execute();
    $sql->closeCursor();
  }
  /**
   * @param $groupId int
   * @param $visibility string
   */
  public function updateVisibility($groupId, $visibility) {
    $this->setId($groupId);
    $this->setVisibility($visibility);

    $sql = $this->getDB()->prepare('UPDATE groups SET visibility = :visibility WHERE id = :id');
    $sql->bindValue(':visibility', $this->getVisibility());
    $sql->bindValue(':id', $this->getId());
    $sql->execute();
    $sql->closeCursor();
  }
  /**
   * @param $rankId int
   * @param $groupId int
   * @param $userId int
   * @return bool
   */
  public function updateUserRank($rankId, $groupId, $userId) {
    $this->setRankUser($rankId);
    $this->setId($groupId);
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('
                UPDATE group_rank
                SET rank_id = :rank_id
                WHERE group_id = :group_id AND user_id = :user_id');

    $sql->bindValue(':rank_id', $this->getRankUser());
    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();

    $sql->closeCursor();

    return true;
  }
  /**
   * @param $groupId int
   * @param $userId int
   */
  public function joinGroup($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);
    // 3 = rank user
    $this->setRankUser(3);

    if($this->searchAlreadyMember()) {
      $sql = $this->getDB()->prepare('INSERT INTO group_rank (group_id, user_id, rank_id) VALUES (:group_id, :user_id, :rank_id)');

      $sql->bindValue(':group_id', $this->getId());
      $sql->bindValue(':user_id', $this->getUserId());
      $sql->bindValue(':rank_id', $this->getRankUser());

      $sql->execute();

      $sql->closeCursor();
    }
  }

  /**
   * @return int|null
   */
  public function searchApplyAndInviteId() {

    $sql = $this->getDB()->prepare(
      'SELECT * FROM apply WHERE group_id = :group_id AND user_id = :user_id
                UNION
                SELECT * FROM invite WHERE group_id = :group_id AND user_id = :user_id');

    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();

    while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
//      var_dump($row);
      if ($row['group_id'] == $this->getId() && $row['user_id'] == $this->getUserId()) {
        $id = intval($row['id']);
        $sql->closeCursor();

        return $id;
      }
    }
    $sql->closeCursor();

    return NULL;
  }

  /**
   * @param $groupId int
   * @param $userId int
   * @return bool
   */
  public function addApplyGroup($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);

    $applyId = $this->searchApplyAndInviteId();

    if(!isset($applyId)) {
      $sql = $this->getDB()->prepare('INSERT INTO apply (group_id, user_id) VALUES (:group_id, :user_id)');

      $sql->bindValue(':group_id', $this->getId());
      $sql->bindValue(':user_id', $this->getUserId());

      $sql->execute();
      $sql->closeCursor();

      return true;
    }
    return false;
  }
  /**
   * @param $groupId int
   * @param $userId int
   */
  public function deleteApply($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('DELETE FROM apply WHERE group_id = :group_id && user_id = :user_id');

    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();

    $sql->closeCursor();
  }

  /**
   * @param $groupId int
   * @param $userId int
   * @return bool
   */
  public function addInviteGroup($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);

    $inviteId = $this->searchApplyAndInviteId();

    if(!isset($inviteId)) {
      $sql = $this->getDB()->prepare('INSERT INTO invite (group_id, user_id) VALUES (:group_id, :user_id)');

      $sql->bindValue(':group_id', $this->getId());
      $sql->bindValue(':user_id', $this->getUserId());

      $sql->execute();
      $sql->closeCursor();

      return true;
    }
    return false;
  }

  /**
   * @param $groupId int
   * @param $userId int
   */
  public function deleteInvite($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('DELETE FROM invite WHERE group_id = :group_id && user_id = :user_id');

    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();

    $sql->closeCursor();
  }

  /**
   * @param $groupId int
   * @param $userId int
   */
  public function leaveGroup($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);

    if(!$this->searchAlreadyMember()) {
      $sql = $this->getDB()->prepare('DELETE FROM group_rank WHERE group_id = :group_id && user_id = :user_id');

      $sql->bindValue(':group_id', $this->getId());
      $sql->bindValue(':user_id', $this->getUserId());

      $sql->execute();

      $sql->closeCursor();
    }
  }

  /**
   * @param $id int
   * @return mixed
   */
  public function getGroup($id) {
    $this->setId($id);

    $sql = $this->getDB()->prepare('SELECT * FROM groups WHERE id = :id');

    $sql->bindValue(':id', $this->getId());

    $sql->execute();

    $row = $sql->fetch(PDO::FETCH_ASSOC);

    $sql->closeCursor();
    return $row;
  }

  /**
   * @param $id int
   * @return array
   *
   */
  public function getMembers($id) {
    $this->setId($id);

    $sql = $this->getDB()->prepare('
                SELECT user.id AS id, pseudo AS username
                FROM group_rank
                LEFT JOIN user ON group_rank.user_id = user.id
                WHERE group_id = :group_id');
    $sql->bindValue(':group_id', $this->getId());
    $sql->execute();
    $row = $sql->fetchAll(PDO::FETCH_ASSOC);
    $sql->closeCursor();

    return $row;
  }

  /**
   * @param $groupId int
   * @return array
   */
  public function getApply($groupId) {
    $this->setId($groupId);

    $sql = $this->getDB()->prepare('
                SELECT group_id, user_id, user.pseudo AS username, user.id AS id
                FROM apply
                LEFT JOIN user ON apply.user_id = user.id
                WHERE group_id = :group_id');

    $sql->bindValue(':group_id', $this->getId());
    $sql->execute();

    $row = $sql->fetchAll(PDO::FETCH_ASSOC);

    $sql->closeCursor();

    return $row;
  }
  /**
   * @param $userId int
   * @return array
   */
  public function getInvite($userId) {
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('
                SELECT group_id AS id, user_id, name, description, security, visibility
                FROM invite
                LEFT JOIN groups ON invite.group_id = groups.id
                WHERE user_id = :user_id');

    $sql->bindValue(':user_id', $this->getUserId());
    $sql->execute();

    $row = $sql->fetchAll(PDO::FETCH_ASSOC);

    $sql->closeCursor();

    return $row;
  }
  /**
   * Search the user's rank in the groupe he is visiting.
   * @param $groupId int
   * @param $userId int
   * @return mixed
   */
  public function getCurrentGroupUserRank($groupId, $userId) {
    $this->setId($groupId);
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('SELECT rank_id FROM group_rank WHERE group_id = :group_id && user_id = :user_id');

    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();

    $rankId = $sql->fetch(PDO::FETCH_ASSOC);
    $sql->closeCursor();

    return $rankId;
  }

  /**
   * @param $rankId int
   * @param $userId int
   */
  private function assignmentRank($rankId, $userId) {
    $this->setId($this->searchGroupId($this->getName()));
    $this->setRankUser($rankId);
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('INSERT INTO group_rank (group_id, user_id, rank_id) VALUES (:group_id, :user_id, :rank_id)');

    $sql->bindValue(':group_id', $this->getId());
    $sql->bindValue(':user_id', $this->getUserId());
    $sql->bindValue(':rank_id', $this->getRankUser());

    $sql->execute();
    $sql->closeCursor();
  }
}
