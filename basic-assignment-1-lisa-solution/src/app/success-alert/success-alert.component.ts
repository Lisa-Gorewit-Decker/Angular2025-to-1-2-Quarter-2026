import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  // styleUrls: ['./success-alert.component.css']
  styles: [`div.alert.alert-success{
    text-align: center;

  }`]
})
export class SuccessAlertComponent {

  constructor() {
  }
}
