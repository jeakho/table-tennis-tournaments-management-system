import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TournamentsModule } from './tournaments/tournaments.module';
import { join } from 'path';
import { PlayersModule } from './players/players.module';
import { IntegerIdScalar } from './scalars/integer-id';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      }
    }),
    TournamentsModule,
    PlayersModule
  ],
  controllers: [AppController],
  providers: [AppService, IntegerIdScalar],
})
export class AppModule {}
