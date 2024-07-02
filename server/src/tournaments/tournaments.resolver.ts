import { Query, Resolver } from '@nestjs/graphql';
import { TournamentsService } from './tournaments.service';

@Resolver('Tournaments')
export class TournamentsResolver {
    constructor(private tournamentsService: TournamentsService) { }

    @Query('tournaments')
    getTournaments() {
        return this.tournamentsService.getTournaments();
    }
}
