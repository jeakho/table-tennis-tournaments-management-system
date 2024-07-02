
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RatingRange {
    from?: Nullable<number>;
    to?: Nullable<number>;
}

export class Player {
    id: IntegerID;
    fullName: string;
    yearOfBirth: number;
    rating: number;
}

export abstract class IQuery {
    abstract topPlayers(nameStartsWith?: Nullable<string>, ratingFrom?: Nullable<number>, ratingTo?: Nullable<number>): Player[] | Promise<Player[]>;

    abstract tournaments(): Tournament[] | Promise<Tournament[]>;
}

export class Tournament {
    id: IntegerID;
    date: string;
    name: string;
}

export type IntegerID = any;
type Nullable<T> = T | null;
