import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {ShoppingListCollectionService} from "../shared/shopping-list-collection.service";
import {ShoppingList} from "../shared/shopping-list";

@Component({
  selector: 'bs-shopping-list-comment-form',
  templateUrl: './shopping-list-comment-form.component.html',
  styles: []
})
export class ShoppingListCommentFormComponent implements OnInit {

  commentForm: FormGroup;
  //empty comment text
  feedback_text: string = '';
  errors: { [key: string]: string } = {};
  user_id: number;
  id: number;
  @Input() list: ShoppingList;
  @Output() listChanged = new EventEmitter<ShoppingList>();

  constructor(private fb: FormBuilder, private ss: ShoppingListCollectionService,
              private route: ActivatedRoute, private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.user_id = this.authService.getCurrentUserId();
    this.id = this.route.snapshot.params['id'];

    this.commentForm = this.fb.group({
      feedback_text: this.feedback_text
    });
  }

  submitForm() {
    //console.log(this.commentForm.value);

    const comment = {
      'feedback': {
        'user_id': this.user_id,
        'feedback_text': this.commentForm.value.feedback_text
      }
    };

    //console.log(comment);

    this.ss.postComment(this.id, comment).subscribe(res => {
      this.feedback_text = '';
      this.commentForm.reset(this.feedback_text);
    });

    this.ss.getSingle(this.id).subscribe(res => this.list = res);
    this.listChanged.emit(this.list);
  }

}
