import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AttributesModule } from './attributes/attributes.module';
import { SkusModule } from './skus/skus.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!, {
    }),
    UsersModule,
    AuthModule,
    AttributesModule,
    SkusModule,
    ProductsModule,
  ],
})
export class AppModule {}
