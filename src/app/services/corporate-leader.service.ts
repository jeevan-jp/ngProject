import { Injectable } from '@angular/core';
import { Leader } from '../shared/corporateLeader';
import { LEADERS } from '../shared/corporateLeaders';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class CorporateLeaderService {

  constructor(private restangular: Restangular, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('LEADERS').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('LEADERS', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('LEADERS').getList({featured: true})
      .map(leaders => leaders[0]);
  }

}
