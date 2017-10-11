import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router'; //Allow to access route parameters
import { Location } from '@angular/common'; //Allows to track location of page in the history of browser


import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  //Changes into constructor are made to get hold of dish :id by using various services
  constructor(private dishservice: DishService,
    private route: ActivatedRoute, 
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL ) {
      this.createForm();
     }

    ngOnInit() {
      
          this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
          this.route.params
            .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
            .subscribe(dish => { this.dish = dish; this.dishcopy = dish, this.setPrevNext(dish.id); },
            errorMess => this.errMess = <any>errorMess);
        }
      
        setPrevNext(dishId: number) {
          let index = this.dishIds.indexOf(dishId);
          this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
          this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
        }

        commentForm: FormGroup;
        userComment: Comment;

        formErrors = {
          'author': '',
          'comment': ''
        }

        validationMessages= {
          'author': {
            'required':  'Your Name is required.',
            'minlength':  'Aothor Name must be at least 2 characters long.',
            'maxlength':  'Name cannot be more than 25 characters long.'
          },
          'comment': {
            'required': 'Comment is required.'
          }
        }

        createForm(): void {
          this.commentForm = this.fb.group({
            rating: [5],
            comment: ['', [Validators.required]],
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25) ]]
          });

        this.commentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    
        this.onValueChanged(); // (re)set validation messages now
      }
    
      onValueChanged(data?: any) {      
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }

      onSubmit() {
        this.userComment = this.commentForm.value;
        this.userComment.date = new Date().toISOString();
        if(this.userComment.rating === undefined) {
          this.userComment.rating = 5;
        }
        console.log(this.userComment);
        this.dishcopy.comments.push(this.userComment);
        this.dishcopy.save()
          .subscribe(dish => {this.dish = dish; console.log(this.dish) });
        this.commentForm.reset({
          rating: 5,
          comment: '',
          author: ''
        });
      }

  goBack(): void {
    this.location.back();
  }

}
