import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [ProductsModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
