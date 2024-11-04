import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, // 환경 파일 경로
      expandVariables: true, // 환경 변수 확장 (환경변수로 환경변수를 만들 수 있음 )
      cache: true, //캐시 사용
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),

    WeatherModule,
    UserModule,
    PostModule,
  ],
  controllers: [BlogController, AppController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
