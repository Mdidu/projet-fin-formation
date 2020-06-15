<?php

class User
{

  use Token;

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
  private $email;
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
   * @param $email string
   */
  private function setEmail($email)
  {
    $this->email = $email;
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
  public function getEmail()
  {
    return $this->email;
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
   * @param $email string
   * @return bool
   */
  public function checkedEmail($email) {
    $this->setEmail($email);

    $sql = $this->getDB()->prepare('SELECT email FROM user WHERE email = :email');
    $sql->bindValue(':email', $this->getEmail());
    $sql->execute();

    $row = $sql->fetch(PDO::FETCH_ASSOC);
    
    $sql->closeCursor();

    if($row['email'] === $this->getEmail()) {
      return true;
    }
    return false;
  }

  /**
   * @param $email string
   * @param $password int
   * @return bool
   */
  public function addUser($email, $password)
  {
    $this->setId($this->searchUserId());
    $this->setEmail($email);
    $this->setPassword($password);

    if(!isset($this->id)) {
      $sql = $this->getDB()->prepare(
        'INSERT INTO user (pseudo, email, password, token, active, rank_id)
                    VALUES (:pseudo, :email, :password, :token, 0, :rank_id)');

      $sql->bindValue(':pseudo', $this->getPseudo());
      $sql->bindValue(':email', $this->getEmail());
      $sql->bindValue(':password', $this->getPassword());
      $sql->bindValue(':token', $this->getToken());
      $sql->bindValue(':rank_id', $this->getRank());

      $sql->execute();

      $sql->closeCursor();

      return true;
    }
    return false;
  }

  /**
   * @param $email string
   * @param $password string
   * @return bool | mixed
   */
  public function log($email, $password){
    $this->setEmail($email);
    $this->setPassword($password);

    $sql = $this->getDB()->prepare('SELECT id, pseudo AS username, email, password, rank_id FROM user WHERE email = :email AND active = 1');

    $sql->bindValue(':email', $this->getEmail());

    $sql->execute();

    $rows = $sql->fetch(PDO::FETCH_ASSOC);
    $sql->closeCursor();

    if($this->getEmail() === $rows['email'] && password_verify($this->password, $rows['password'])) {
      $this->addToken($rows['id'], $rows['username']);
      $row['id'] = intval($rows['id']);
      $row['username'] = $rows['username'];
      $row['token'] = $this->getToken();
      return $row;
    }
    return false;
  }

  /**
   * @param $email string
   * @param $password string
   * @return bool
   */
  public function updatePassword($email, $password) {
    $this->setEmail($email);
    $this->setPassword($password);

    $sql = $this->getDB()->prepare('UPDATE user SET password = :password WHERE email = :email');
    $sql->bindValue(':password', $this->getPassword());
    $sql->bindValue(':email', $this->getEmail());
    $sql->execute();
    $sql->closeCursor();

    return true;
  }

  /**
   * @return bool
   */
  private function checkedValidate() {
    $sql = $this->getDB()->prepare('SELECT pseudo, token FROM user WHERE pseudo = :pseudo AND token = :token');

    $sql->bindValue(':pseudo', $this->getPseudo());
    $sql->bindValue(':token', $this->getToken());

    $sql->execute();
    $row = $sql->fetch(PDO::FETCH_ASSOC);
    $sql->closeCursor();
    if(empty($row)) {
      return false;
    }
    return true;
  }

  /**
   * @param $token string
   * @return bool
   */
  public function validateAuth($token) {
    $this->setToken($token);

    $response = $this->checkedValidate();

    if($response) {
      $sql = $this->getDB()->prepare('UPDATE user SET active = 1 WHERE pseudo = :pseudo AND token = :token');

      $sql->bindValue(':pseudo', $this->getPseudo());
      $sql->bindValue(':token', $this->getToken());

      $sql->execute();

      $sql->closeCursor();

      return true;
    }
  }

//  public function logout() {
//    session_unset();
//
//    session_destroy();
//  }
}
