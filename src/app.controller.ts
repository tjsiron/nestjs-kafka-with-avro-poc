import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('books.v1')
  async newBookHandler(@Payload() message) {
    const registry = new SchemaRegistry({ host: 'http://localhost:8081/' })

    console.log('I got hit');
    console.log(message);

    const decodedValue = await registry.decode(message.value);

    console.log(decodedValue);

    return 'test';
  }
}
