
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum GENDER {
    Male = "Male",
    Female = "Female"
}

export class Player {
    id: IntegerID;
    fullName: string;
    birthYear: number;
    rating: number;
    gender: GENDER;
}

export abstract class IQuery {
    abstract topPlayers(nameStartsWith?: Nullable<string>, ratingFrom?: Nullable<number>, ratingTo?: Nullable<number>, birthYearFrom?: Nullable<number>, birthYearTo?: Nullable<number>, gender?: Nullable<GENDER>): Player[] | Promise<Player[]>;

    abstract tournaments(): Tournament[] | Promise<Tournament[]>;
}

export class Tournament {
    id: IntegerID;
    date: string;
    name: string;
}

export type IntegerID = any;
type Nullable<T> = T | null;
