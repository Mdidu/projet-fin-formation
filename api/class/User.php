<?php

//namespace Mdidu\Api;

class User
{
  use DB;

  /**
   * @var int
   */
  private $id;
  /**
   * @var string
   */
  private $pseudo;
  /**
   * @var string
   */
  private $password;
  /**
   * @var int
   */
  private $rank;

  /**
   * User constructor.
   * @param $pseudo string
   */
  public function __construct($pseudo)
  {
    $this->pseudo = $pseudo;
    $this->rank = 3;
  }

  /**
   * @param $id int
   */
  private function setId($id)
  {
    $this->id = $id;
  }

  /**
   * @param $pseudo string
   */
  private function setPseudo($pseudo)
  {
    $this->pseudo = $pseudo;
  }

  /**
   * @param $password string
   */
  private function setPassword($password)
  {
    $this->password = $password;
  }

  /**
   * @param $rank int
   */
  private function setRank($rank)
  {
    $this->rank = $rank;
  }

  /**
   * @return int
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * @return string
   */
  public function getPseudo()
  {
    return $this->pseudo;
  }

  /**
   * @return string
   */
  public function getPassword()
  {
    return $this->password;
  }

  /**
   * @return int
   */
  public function getRank()
  {
    return $this->rank;
  }

  /**
   * @return int|null
   */
  public function searchUserId()
  {
    $sql = $this->getDB()->prepare('SELECT id, pseudo FROM user');

    $sql->execute();

    while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
      if ($row['pseudo'] === $this->getPseudo()) {
        $id = intval($row['id']);
        $sql->closeCursor();

        return $id;
      }
    }
    $sql->closeCursor();

    return NULL;
  }

  /**
   * @param $password string
   * @return bool
   */
  public function addUser($password)
  {
    $this->setId($this->searchUserId());
    $this->setPassword($password);

    if(!isset($this->id)) {
      $sql = $this->getDB()->prepare('INSERT INTO user (pseudo, password, rank_id) VALUES (:pseudo, :password, :rank_id)');

      $sql->bindValue(':pseudo', $this->getPseudo());
      $sql->bindValue(':password', $this->getPassword());
      $sql->bindValue(':rank_id', $this->getRank());

      $sql->execute();

      $sql->closeCursor();

      return true;
    }
    return false;
  }

  /**
   * @param $password string
   * @return bool | mixed
   */
  public function log($password){
    $this->setPassword($password);

    $sql = $this->getDB()->prepare('SELECT id, pseudo AS username, password, rank_id FROM user WHERE pseudo = :pseudo');

    $sql->bindValue(':pseudo', $this->getPseudo());

    $sql->execute();

    $row = $sql->fetch(PDO::FETCH_ASSOC);
    $sql->closeCursor();

    if($this->getPseudo() === $row['username'] && password_verify($this->password, $row['password'])) {

      return $row;
    }
    return false;
  }

//  public function logout() {
//    session_unset();
//
//    session_destroy();
//  }
}
