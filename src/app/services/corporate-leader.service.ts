import { Injectable } from '@angular/core';
import { Leader } from '../shared/corporateLeader';
import { LEADERS } from '../shared/corporateLeaders';

@Injectable()
export class CorporateLeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }

}
