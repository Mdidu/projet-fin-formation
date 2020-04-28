<?php


trait Db
{
  private $db;

  private $servername = 'localhost';
  private $username = 'root';
  private $passwordDB = '';
  private $dbname = 'mangroup';

  /**
   * @return PDO
   */
  public function getDB() {
    $this->db = new PDO('mysql:host=' . $this->servername . ';dbname=' . $this->dbname . ';charset=utf8', $this->username, $this->passwordDB);
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    return $this->db;
  }
}
