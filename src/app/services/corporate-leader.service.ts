import { Injectable } from '@angular/core';
import { Leader } from '../shared/corporateLeader';
import { LEADERS } from '../shared/corporateLeaders';

@Injectable()
export class CorporateLeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: number): Leader {
    return LEADERS.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }

}
