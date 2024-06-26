import { Module } from '@nestjs/common';
import { TournamentsResolver } from './tournaments.resolver';
import { TournamentsService } from './tournaments.service';

@Module({
  providers: [TournamentsResolver, TournamentsService]
})
export class TournamentsModule {}
