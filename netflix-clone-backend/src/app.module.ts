import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // To load environment variables
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Enable environment variables
    // Debug environment variables
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: process.env.DB_NAME }),
    AuthModule,
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('Mongo URI:', process.env.MONGO_URI);
    console.log('DB Name:', process.env.DB_NAME);
  }
}
