import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StatusPipe implements PipeTransform {
  readonly StatusOptions = ['PUBLIC', 'PRIVATE'];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.status.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    console.log('pass pipe...');
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
