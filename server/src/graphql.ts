
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Tournament {
    id: string;
    date: string;
    name: string;
}

export abstract class IQuery {
    abstract tournaments(): Tournament[] | Promise<Tournament[]>;
}

type Nullable<T> = T | null;
