import { Injectable, EventEmitter, Output } from '@angular/core';
import { SocketService } from './socket.service';
import { AppComponent } from './app.component';

@Injectable()

export class AppService {
	private connection;

	@Output() data = new EventEmitter();

  	constructor(private mySocket: SocketService) {
  		let that = this;
  		this.connection = this.mySocket.socket();

  		this.connection.on('reponse:mot', (mot) => {
  			that.data.emit(mot[0].word);
  		});
  		this.connection.emit('demande:mot', 'ENVOIE UN MOT !!');
  	}
}