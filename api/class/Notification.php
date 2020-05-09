<?php


class Notification
{

  use Db;

  /**
   * @var int
   */
  private $id;
  /**
   * @var int
   */
  private $userId;

  /**
   * @param $id int
   */
  private function setId($id) {
    $this->id = $id;
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
   * @return int
   */
  public function getUserId() {
    return $this->userId;
  }

  public function getNotification($userId) {
    $this->setUserId($userId);

    $sql = $this->getDB()->prepare('SELECT * FROM notification WHERE user_id = :user_id');

    $sql->bindValue(':user_id', $this->getUserId());

    $sql->execute();
    $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
    $sql->closeCursor();
    return $rows;
  }
}
