import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { ProductImageModule } from './product-image/product-image.module';

@Module({
  imports: [
    UserModule,
    RegionModule,
    PrismaModule,
    ProductModule,
    ProductImageModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
