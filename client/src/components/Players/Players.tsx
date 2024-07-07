import { gql, useQuery } from "@apollo/client";
import { Box, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Player } from "./player";
import { useState } from "react";
import FilterOptionsPanel from "./FilterOptionsPanel";


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

const PLAYERS_PER_PAGE_OPTIONS = [2, 5, 10];

function Players() {
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage, setPlayersPerPage] = useState(PLAYERS_PER_PAGE_OPTIONS[0]);
    const [filterOptions, setFilterOptions] = useState<PlayersFilterOptions>({});

    const { data: playersCount } = useQuery<{ playersCount: number }>(GET_PLAYERS_COUNT, {
        variables: filterOptions
    });
    const { loading, error, data } = useQuery<{ topPlayers: Player[] }>(GET_TOP_PLAYERS, {
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
                    <FilterOptionsPanel filters={filterOptions} onFiltersChange={handleFiltersChange}></FilterOptionsPanel>
                </Box>

                {loading && <p>Loading...</p>}
                {!loading && <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }}>
                            <TableHead sx={{ fontWeight: 'bold' }}>
                                <TableRow>
                                    <TableCell align="left">№</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Gender</TableCell>
                                    <TableCell align="left">Birth Year</TableCell>
                                    <TableCell align="left">Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data?.topPlayers.map(({ id, fullName, gender, birthYear, rating }, ind) => 
                                        <TableRow key={id}>
                                            <TableCell align="left">{ computeOffset(currentPage, playersPerPage) + ind + 1 }</TableCell>
                                            <TableCell align="left">{ fullName }</TableCell>
                                            <TableCell align="left">{ gender }</TableCell>
                                            <TableCell align="left">{ birthYear }</TableCell>
                                            <TableCell align="left">{ rating }</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                }
                {!!playersCount?.playersCount &&
                    <Box sx={{ display: 'flex ', mt: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Pagination 
                            count={ computePagesCount(playersCount.playersCount, playersPerPage) } 
                            showFirstButton showLastButton 
                            shape="rounded" 
                            color="primary"
                            page={ currentPage }
                            sx={{ mr: 1 }}
                            onChange={(_, currentPage) => setCurrentPage(currentPage)}
                        />
                        <Select
                            size="small"
                            value={ playersPerPage }
                            onChange={ (e) => handlePlayersPerPageChange(+e.target.value) }
                        >
                            {PLAYERS_PER_PAGE_OPTIONS.map((option) => (
                                <MenuItem key={ option } value={ option }>
                                    { option }
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Players;