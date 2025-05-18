import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AttributesModule } from './attributes/attributes.module';
import { SkusModule } from './skus/skus.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get<string>('DATABASE_HOST'),
        port: cs.get<number>('DATABASE_PORT'),
        username: cs.get<string>('DATABASE_USER'),
        password: cs.get<string>('DATABASE_PASSWORD'),
        database: cs.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    AttributesModule,
    SkusModule,
    ProductsModule,
  ],
})
export class AppModule {}