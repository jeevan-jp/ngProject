import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/delay';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback) {
    return this.restangular.all('feedback').post(feedback);
  }

}
