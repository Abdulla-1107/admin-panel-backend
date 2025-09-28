import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, CustomerModule, SellerModule, RegionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
