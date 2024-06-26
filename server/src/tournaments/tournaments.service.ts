import { Injectable } from '@nestjs/common';
import { Tournament } from 'src/graphql';


const tournaments = [
    { id: '1', date: "12/03/22", name: "Tournament 1" },
    { id: '2', date: "13/03/22", name: "Tournament 2" },
    { id: '3', date: "14/03/22", name: "Tournament 3" },
    { id: '4', date: "15/03/22", name: "Tournament 4" },
    { id: '5', date: "16/03/22", name: "Tournament 5" },
]


@Injectable()
export class TournamentsService {
    async getTournaments(): Promise<Tournament[]> {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return tournaments;
    }
}
