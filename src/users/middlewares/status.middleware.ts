import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class StatusMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('pass middleware...');
    next();
  }
}
