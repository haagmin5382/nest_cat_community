import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService], // 제거하면 공급자가 없음 그래서 controller(소비자)는 제품(공급자, Service)을 사용할 수 없음
})
export class AppModule {}