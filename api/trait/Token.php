<?php


trait Token
{
  use Db;

  /**
   * @var string
   */
  private $token;
  /**
   * @var int
   */
  private $id;
  /**
   * @var string
   */
  private $usernameToken;
  /**
   * @param $token string
   */
  private function setToken($token) {
    $this->token = $token;
  }
  /**
   * @param $id int
   */
  private function setId($id) {
    $this->id = $id;
  }
  /**
   * @param $username string
   */
  private function setUsernameToken($username) {
    $this->usernameToken = $username;
  }
  /**
   * @return string
   */
  public function getToken() {
    return $this->token;
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
  public function getUsernameToken() {
    return $this->usernameToken;
  }

  private function createToken($id, $username) {
    $this->setId($id);
    $this->setUsernameToken($username);

    $this->setToken(hash("sha512", session_id().microtime().rand(0, 999999999999999999999)));

    $sql = $this->getDb()->prepare('UPDATE user SET token = :token WHERE id = :id AND pseudo = :pseudo');

    $sql->bindValue(':token', $this->getToken());
    $sql->bindValue(':id', $this->getId());
    $sql->bindValue(':pseudo', $this->getUsernameToken());

    $sql->execute();

    $sql->closeCursor();
  }
  public function checkedToken() {
    $sql = $this->getDB()->prepare('
        SELECT id, pseudo AS username, token
        FROM user
        WHERE id = :id
        AND pseudo = :pseudo
        AND token = :token');

    $sql->bindValue(':token', $this->getToken());
    $sql->bindValue(':id', $this->getId());
    $sql->bindValue(':pseudo', $this->getUsernameToken());

    $sql->execute();

    $rows = $sql->fetch(PDO::FETCH_ASSOC);
    $sql->closeCursor();
  }
}
