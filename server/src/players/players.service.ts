import { Injectable } from '@nestjs/common';
import { Player } from 'src/graphql';

const players: Player[] = [
    { id: 1, fullName: 'Olexandr Khokholkov', yearOfBirth: 2002, rating: 29.5 },
    { id: 2, fullName: 'Eva Khokholkova', yearOfBirth: 2015, rating: 14.3 },
    { id: 3, fullName: 'Kayla Delgado', yearOfBirth: 2007, rating: 8.9 },
    { id: 4, fullName: 'Kailey Chandler', yearOfBirth: 2006, rating: 0 },
    { id: 5, fullName: 'Khloe Barry', yearOfBirth: 2000, rating: 12.4 },
    { id: 6, fullName: 'Sasha Cortes', yearOfBirth: 2011, rating: 6.7 },
    { id: 7, fullName: 'Evelyn Freeman', yearOfBirth: 2003, rating: 3.8 },
    { id: 8, fullName: 'Astrid Felix', yearOfBirth: 2004, rating: 20 },
    { id: 9, fullName: 'Cameron Huang', yearOfBirth: 2015, rating: 18.2 },
    { id: 10, fullName: 'Whitley Cordova', yearOfBirth: 2015, rating: 13.8 },
    { id: 11, fullName: 'Reese Zuniga', yearOfBirth: 2015, rating: 11.5 },
]


@Injectable()
export class PlayersService {
    getPlayers(): Player[] {
        return players;
    }
}
