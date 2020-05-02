import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  constructor() { }

  resetCommentaryForm(form) {
    form.reset();
  }
}
