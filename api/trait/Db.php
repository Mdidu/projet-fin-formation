<?php


trait Db
{
  /**
   * @var PDO
   */
  private $db;

  /**
   * @var string
   */
  private $servername = 'localhost';
  /**
   * @var string
   */
  private $username = 'root';
  /**
   * @var string
   */
  private $passwordDB = '';
  /**
   * @var string
   */
  private $dbname = 'mangroup';

  /**
   * @return PDO
   */
  public function getDB() {
    $this->db = new PDO('mysql:host='.$this->servername.';dbname='.$this->dbname.';charset=utf8', $this->username, $this->passwordDB);
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    return $this->db;
  }
}
