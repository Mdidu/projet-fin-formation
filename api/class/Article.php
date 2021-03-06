<?php


class Article
{

  use Token;

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
  private $groupId;
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
  private function setId($id)
  {
    $this->id = $id;
  }

  /**
   * @param $content string
   */
  private function setContent($content)
  {
    $this->content = $content;
  }

  /**
   * @param $timestamp int
   */
  private function setTimestamp($timestamp)
  {
    $this->timestamp = $timestamp;
  }

  /**
   * @param $groupId int
   */
  private function setGroupId($groupId)
  {
    $this->groupId = $groupId;
  }

  /**
   * @param $author string
   */
  private function setAuthor($author)
  {
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
  public function getId()
  {
    return $this->id;
  }

  /**
   * @return string
   */
  public function getContent()
  {
    return $this->content;
  }

  /**
   * @return int
   */
  public function getTimestamp()
  {
    return $this->timestamp;
  }

  /**
   * @return int
   */
  public function getGroupId()
  {
    return $this->groupId;
  }

  /**
   * @return string
   */
  public function getAuthor()
  {
    return $this->author;
  }
  /**
   * @return int
   */
  public function getAuthorId()
  {
    return $this->authorId;
  }

  public function __construct()
  {
    $this->setTimestamp(time());
  }

  /**
   * @param $content string
   * @param $groupId int
   * @param $authorId int
   */
  public function addArticles($content, $groupId, $authorId)
  {
    $this->setContent($content);
    $this->setGroupId($groupId);
    $this->setAuthorId($authorId);

    $sql = $this->getDB()->prepare("INSERT INTO article (content, date, group_id, user_id) VALUES (:content, :date, :group_id, :user_id)");

    $sql->bindValue(":content", $this->getContent());
    $sql->bindValue(":date", $this->getTimestamp());
    $sql->bindValue(':group_id', $this->getGroupId());
    $sql->bindValue(":user_id", $this->getAuthorId());

    $sql->execute();

    $sql->closeCursor();
  }

  /**
   * @param $content string
   * @param $id int
   */
  public function updateArticle($content, $id)
  {
    $this->setContent($content);
    $this->setId($id);

    $sql = $this->getDB()->prepare("UPDATE article SET content = :content WHERE id = :id");
    $sql->bindValue(":content", $this->getContent());
    $sql->bindValue(":id", $this->getId());

    $sql->execute();
    $sql->closeCursor();
  }

  /**
   * @param $id int
   */
  public function removeArticle($id)
  {

    $this->setId($id);

    $sql = $this->getDB()->prepare("DELETE FROM article WHERE id = :id");

    $sql->bindValue(":id", $this->getId());

    $sql->execute();
    $sql->closeCursor();
  }

  /**
   * @param $groupId int
   * @return array
   */
  public function getArticles($groupId)
  {
    $this->setGroupId($groupId);

    $sql = $this->getDB()->prepare(
      "SELECT article.id AS id, content, date, pseudo AS author, user.id AS authorId
                FROM article
                LEFT JOIN user ON article.user_id = user.id
                WHERE article.group_id = :group_id
                ORDER BY date DESC"
    );

    $sql->bindValue(':group_id', $this->getGroupId());

    $sql->execute();

    $rows = $sql->fetchAll(PDO::FETCH_ASSOC);

    $sql->closeCursor();

    return $rows;
  }
}
