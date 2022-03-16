import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'Socket.io';

@WebSocketGateway(8000, { transports: ['websocket'] })
export class EventGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('ClientToServer')
  async handleMessage(@MessageBody() data) {
    this.server.emit('ServerClient', data);
  }
}
