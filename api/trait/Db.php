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
  private $servername = 'ameddabmangroup.mysql.db';
  /**
   * @var string
   */
  private $username = 'ameddabmangroup';
  /**
   * @var string
   */
  private $passwordDB = 'LQz9aT530';
  /**
   * @var string
   */
  private $dbname = 'ameddabmangroup';

  /**
   * @return PDO
   */
  private function getDB() {
    $this->db = new PDO('mysql:host='.$this->servername.';dbname='.$this->dbname.';charset=utf8', $this->username, $this->passwordDB);
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    return $this->db;
  }
}
