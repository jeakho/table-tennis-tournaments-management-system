import { Args, Query, Resolver } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { RatingRange } from 'src/graphql';

@Resolver()
export class PlayersResolver {
    constructor(private playersService: PlayersService) {}


    @Query('topPlayers')
    getPlayers(
        @Args('nameStartsWith') nameStartsWith: string | undefined,
        @Args('ratingFrom') ratingFrom: number | undefined,
        @Args('ratingTo') ratingTo: number | undefined
    ) {
        let players = this.playersService.getPlayers();
        
        if (ratingFrom) {
            players = players.filter(player => player.rating >= ratingFrom)
        }
        if (ratingTo) {
            players = players.filter(player => player.rating <= ratingTo)
        }
        if (nameStartsWith) {
            const lowerCaseStartString = nameStartsWith.toLowerCase();
            players = players.filter(player => {
                const [firstName, secondName] = player.fullName.split(' ');

                return firstName.toLowerCase().startsWith(lowerCaseStartString) ||
                    secondName.toLowerCase().startsWith(lowerCaseStartString) ||
                    player.fullName.toLowerCase().startsWith(lowerCaseStartString);
            })
        }

        return [...players].sort((p1, p2) => p2.rating - p1.rating);
    }
}
