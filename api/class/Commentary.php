<?php


class Commentary
{

  use Db;

  /**
   * @var int
   */
  private $id;
  /**
   * @var string
   */
  private $content;
  /**
   * @var int
   */
  private $timestamp;
  /**
   * @var int
   */
  private $articleId;
  /**
   * @var string
   */
  private $author;
  /**
   * @var int
   */
  private $authorId;

  /**
   * @param $id int
   */
  private function setId($id) {
    $this->id = $id;
  }

  /**
   * @param $content string
   */
  private function setContent($content) {
    $this->content = $content;
  }

  /**
   * @param $timestamp int
   */
  private function setTimestamp($timestamp) {
    $this->timestamp = $timestamp;
  }

  /**
   * @param $articleId int
   */
  private function setArticleId($articleId) {
    $this->articleId = $articleId;
  }

  /**
   * @param $author string
   */
  private function setAuthor($author) {
    $this->author = $author;
  }

  /**
   * @param $authorId int
   */
  private function setAuthorId($authorId) {
    $this->authorId = $authorId;
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
  public function getContent() {
    return $this->content;
  }

  /**
   * @return int
   */
  public function getTimestamp() {
    return $this->timestamp;
  }

  /**
   * @return int
   */
  public function getArticleId() {
    return $this->articleId;
  }

  /**
   * @return string
   */
  public function getAuthor() {
    return $this->author;
  }

  /**
   * @return int
   */
  public function getAuthorId() {
    return $this->authorId;
  }


  public function __construct()
  {
    $this->setTimestamp(time());
//    $this->timestamp = time();
  }

  public function addCommentary($content, $articleId, $userId) {
    $this->setContent($content);
    $this->setArticleId($articleId);
    $this->setAuthorId($userId);

    $sql = $this->getDB()->prepare("INSERT INTO commentary (content, date, user_id, article_id) VALUES (:content, :date, :user_id, :article_id)");

    $sql->bindValue(":content", $this->getContent());
    $sql->bindValue(":date", $this->getTimestamp());
    $sql->bindValue(":user_id", $this->getAuthorId());
    $sql->bindValue(':article_id', $this->getArticleId());

    $sql->execute();

    $sql->closeCursor();
  }
}