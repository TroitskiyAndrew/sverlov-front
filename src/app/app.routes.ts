import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { TicketsPageComponent } from './components/tickets-page/tickets-page.component';
import { TicketsTourComponent } from './components/tickets-tour/tickets-tour.component';
import { TicketsMainComponent } from './components/tickets-main/tickets-main.component';
import { TicketsEventComponent } from './components/tickets-event/tickets-event.component';
import { MyTicketsPageComponent } from './components/my-tickets-page/my-tickets-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  {
    path: 'event/:id',
    component: EventPageComponent
  },
  {
    path: 'tickets',
    component: TicketsMainComponent,
    children: [
      { path: 'tour', component: TicketsTourComponent },
      { path: 'event/:id', component: TicketsEventComponent },
      {
        path: '',
        pathMatch: 'full',
        component: TicketsPageComponent
      }
    ]
  },
  {
    path: 'my-tickets',
    component: MyTicketsPageComponent
  },
];
