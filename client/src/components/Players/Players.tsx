import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { Player } from "./player";
import { useState } from "react";
import PlayersDisplayFilters from "./PlayersDisplayFilters";
import PlayersDisplay from "./PlayersDisplay";
import PlayersDisplayControl, { PLAYERS_PER_PAGE_OPTIONS } from "./PlayersDisplayControl";


export interface PlayersFilterOptions {
    nameStartsWith?: string;
    ratingFrom?: number;
    ratingTo?: number;
    birthYearFrom?: number;
    birthYearTo?: number;
    gender?: string;
}

const GET_TOP_PLAYERS = gql`
    query TopPlayers(
        $offset: Int,
        $limit: Int,
        $nameStartsWith: String, 
        $ratingFrom: Float, 
        $ratingTo: Float,
        $birthYearFrom: Int,
        $birthYearTo: Int,
        $gender: GENDER
    ) {
        topPlayers(
            offset: $offset,
            limit: $limit,
            nameStartsWith: $nameStartsWith, 
            ratingFrom: $ratingFrom, 
            ratingTo: $ratingTo,
            birthYearFrom: $birthYearFrom,
            birthYearTo: $birthYearTo,
            gender: $gender
        ) {
            id
            fullName
            gender
            birthYear
            rating
        }
    }
`

const GET_PLAYERS_COUNT = gql`
    query PlayersCount(
        $offset: Int,
        $limit: Int,
        $nameStartsWith: String, 
        $ratingFrom: Float, 
        $ratingTo: Float,
        $birthYearFrom: Int,
        $birthYearTo: Int,
        $gender: GENDER
    ) {
        playersCount(
            offset: $offset,
            limit: $limit,
            nameStartsWith: $nameStartsWith, 
            ratingFrom: $ratingFrom, 
            ratingTo: $ratingTo,
            birthYearFrom: $birthYearFrom,
            birthYearTo: $birthYearTo,
            gender: $gender
        )
    }
`

function computeOffset(pageNo: number, playersPerPage: number) {
    return (pageNo - 1) * playersPerPage
}

function computePagesCount(playersCount: number, playersPerPage: number) {
    return Math.ceil(playersCount / playersPerPage);
}

function Players() {
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage, setPlayersPerPage] = useState(PLAYERS_PER_PAGE_OPTIONS[0]);
    const [filterOptions, setFilterOptions] = useState<PlayersFilterOptions>({});

    const { data: playersCount } = useQuery<{ playersCount: number }>(GET_PLAYERS_COUNT, {
        variables: filterOptions
    });
    const { loading, error, data: playersData } = useQuery<{ topPlayers: Player[] }>(GET_TOP_PLAYERS, {
        variables: { offset: computeOffset(currentPage, playersPerPage), limit: playersPerPage, ...filterOptions }
    });

    const handleFiltersChange = (newFilterOptions: PlayersFilterOptions) => (
        setFilterOptions(newFilterOptions),
        setCurrentPage(1)
    );

    const handlePlayersPerPageChange = (value: number) => (
        setPlayersPerPage(value),
        setCurrentPage(1)
    );

    if (error) {
        console.log('Error:', error.message); 
    }

    return (

        <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                width: '50%',
                height: '100%',
                ml: 'auto', 
                mr: 'auto'
            }}>
                <Box sx={{
                    width: '100%',
                    mt: '20px',
                    mb: '20px'
                }}>
                    <PlayersDisplayFilters filters={filterOptions} onFiltersChange={handleFiltersChange}></PlayersDisplayFilters>
                </Box>

                {loading && <p>Loading...</p>}
                {!loading && !!playersData && <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <PlayersDisplay playersRecords={
                        playersData.topPlayers.map((player, ind) => ({ no: computeOffset(currentPage, playersPerPage) + ind + 1, ...player}))
                    } />
                </Box>
                }
                {!!playersCount?.playersCount && 
                    <PlayersDisplayControl 
                        currentPage={ currentPage }
                        pagesCount={ computePagesCount(playersCount.playersCount, playersPerPage )}
                        playersPerPage={ playersPerPage }
                        onPageSelect={ setCurrentPage }
                        onPlayersPerPageChange={ handlePlayersPerPageChange }
                    />
                }
            </Box>
        </Box>
    )
}

export default Players;