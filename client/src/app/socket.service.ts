import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
​
@Injectable()

export class SocketService {
  connection: any;
  url = 'localhost:3000';
​
  constructor() {
    this.connection = io.connect(this.url);
    this.connection.on('connect', function () {
      console.log('Connected');
    });
  }
​
  socket() {
    if (!this.connection) {
      this.connection = io.connect(this.url);
    }
    return this.connection;
  }
}