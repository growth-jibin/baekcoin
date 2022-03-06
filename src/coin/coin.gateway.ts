import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class EventGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('ClientToServer')
  sendMessage() {}
}
