import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { StateService } from './services/state.service';
import { TelegrammService } from './services/telegramm.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sverdlov-front';
  constructor(private stateService: StateService, private telegrammService: TelegrammService, private router: Router) {
    this.stateService.init();
  }

  ngOnInit() {
    if (this.telegrammService.startParam) {
      const [param, value] = this.telegrammService.startParam.split('_SPLIT_');
      if(param === 'EVENT') {
        this.router.navigate(['event', value]);
      } else if (param === 'TICKET') {
        this.router.navigate(['check-ticket', value]);
      }
    }
  }
}
