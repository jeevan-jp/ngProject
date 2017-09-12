import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/corporateLeader';
import { CorporateLeaderService  } from '../services/corporate-leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(private leaderservice: CorporateLeaderService) { }

  ngOnInit() {
    this.leaders = this.leaderservice.getLeaders();
  }

}
