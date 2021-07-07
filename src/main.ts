import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'books',
            brokers: ['localhost:9092'],
        },
        consumer: {
            groupId: 'new-book-consumer'
        },
        parser: {
            keepBinary: true
        }
    }
  });


  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
