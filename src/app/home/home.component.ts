import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/corporateLeader';
import { CorporateLeaderService  } from '../services/corporate-leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promErrMess: string;
  leaderErrMess: string;
  errMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: CorporateLeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
       dishErr => this.dishErrMess = dishErr);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, 
      promErr => this.promErrMess = promErr);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, 
      leaderErr => this.leaderErrMess = leaderErr);
  }

}