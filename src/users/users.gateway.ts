import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { Logger } from '@nestjs/common';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  namespace: 'users',
})
export class UsersGateway {
  client: Record<string, any>;

  constructor() {
    this.client = {};
  }

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  public handleConnection(client: Socket): void {
    console.log('hisss');
    this.client[client.id] = client;
    this.logger.log(`Client Connected!! : ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    console.log('bye', client.id);
    delete this.client[client.id];
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string, // 클라이언트로부터 들어온 데이터
    @ConnectedSocket() client: Socket,
  ) {
    const res: string = data + ' ' + client.id;
    this.logger.log(data);
    this.server.emit('msgToClient', res);
  }
}
