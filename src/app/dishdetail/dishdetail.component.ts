import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router'; //Allow to access route parameters
import { Location } from '@angular/common'; //Allows to track location of page in the history of browser


import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  //Changes into constructor are made to get hold of dish :id by using various services
  constructor(private dishservice: DishService,
    private route: ActivatedRoute, 
    private location: Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dish = this.dishservice.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }

}
