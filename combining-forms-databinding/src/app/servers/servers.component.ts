import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  allowNew2Server = false;
  serverCreationStatus = 'No server was created!';
  server2CreationStatus = 'No server2 was created!';
  serverName = '';
  server2Name = '';
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
    setTimeout(() => {
      this.allowNew2Server = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created!  is... ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  onCreate2Server() {
    this.server2CreationStatus = 'Server was created!  is... ' + this.server2Name;
  }

  onUpdateServer2Name(event: Event) {
    this.server2Name = (<HTMLInputElement>event.target).value;
  }
}
