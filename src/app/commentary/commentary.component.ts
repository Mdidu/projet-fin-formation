import {Component, Input, OnInit} from '@angular/core';
import {CommentaryService} from "../services/commentary.service";
import {ArticlesService} from "../services/article/articles.service";

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit {

  @Input() articleId;

  constructor(private commentaryService: CommentaryService, public articlesService: ArticlesService) { }

  ngOnInit() {
    this.commentaryService.getCommentary(this.articleId);
  }

}
