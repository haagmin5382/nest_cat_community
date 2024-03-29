import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // .env 사용
import { AuthModule } from './auth/auth.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    // 모듈 사용
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI), // db 연결
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService], // 제거하면 공급자가 없음 그래서 controller(소비자)는 제품(공급자, Service)을 사용할 수 없음
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats'); // cats router에 binding
    mongoose.set('debug', this.isDev); // mongoose query가 찍혀지게도됨, 배포할 땐 false로 해놔야한다.
  }
}
