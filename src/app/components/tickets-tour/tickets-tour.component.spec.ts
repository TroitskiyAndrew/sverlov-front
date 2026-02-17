import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsTourComponent } from './tickets-tour.component';

describe('TicketsTourComponent', () => {
  let component: TicketsTourComponent;
  let fixture: ComponentFixture<TicketsTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
