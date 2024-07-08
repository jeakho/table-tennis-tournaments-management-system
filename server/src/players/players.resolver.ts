import { Args, Query, Resolver } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { GENDER } from 'src/graphql';


@Resolver()
export class PlayersResolver {
    constructor(private playersService: PlayersService) {}

    @Query('topPlayers')
    async getPlayers(
        @Args('offset') offset: number | undefined,
        @Args('limit') limit: number | undefined,
        @Args('nameStartsWith') nameStartsWith: string | undefined,
        @Args('ratingFrom') ratingFrom: number | undefined,
        @Args('ratingTo') ratingTo: number | undefined,
        @Args('birthYearFrom') birthYearFrom: number | undefined,
        @Args('birthYearTo') birthYearTo: number | undefined,
        @Args('gender') gender: GENDER | undefined
    ) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return this.playersService.getPlayers(
            offset,
            limit,
            nameStartsWith,
            ratingFrom,
            ratingTo,
            birthYearFrom,
            birthYearTo,
            gender
        );
    }

    @Query('playersCount')
    getPlayersCount(
        @Args('offset') offset: number | undefined,
        @Args('limit') limit: number | undefined,
        @Args('nameStartsWith') nameStartsWith: string | undefined,
        @Args('ratingFrom') ratingFrom: number | undefined,
        @Args('ratingTo') ratingTo: number | undefined,
        @Args('birthYearFrom') birthYearFrom: number | undefined,
        @Args('birthYearTo') birthYearTo: number | undefined,
        @Args('gender') gender: GENDER | undefined
    ) {
        return this.playersService.getPlayers(
            offset,
            limit,
            nameStartsWith,
            ratingFrom,
            ratingTo,
            birthYearFrom,
            birthYearTo,
            gender
        ).length;
    }
}
