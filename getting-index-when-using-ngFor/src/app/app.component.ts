import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSecret = false;
  log = [];

  onToggleDetails() {
    // @ts-ignore
    this.showSecret = !this.showSecret;
    // @ts-ignore
    this.log.push(new Date());
    // @ts-ignore
    // this.log.push(this.log.length + 1);
  }
}
