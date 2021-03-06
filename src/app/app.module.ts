import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { CorporateLeaderService } from './services/corporate-leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FeedbackService } from './services/feedback.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { baseURL } from './shared/baseurl';
import {RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [ DishService, PromotionService, CorporateLeaderService,
  { provide: 'BaseURL', useValue: baseURL },
    ProcessHTTPMsgService,
    FeedbackService ],
  entryComponents: [LoginComponent],   //components which are not triggered directly (will be opened via click)
  bootstrap: [AppComponent]
})
export class AppModule { }
