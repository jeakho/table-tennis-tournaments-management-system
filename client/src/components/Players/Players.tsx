import { gql, useQuery } from "@apollo/client";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
        $nameStartsWith: String, 
        $ratingFrom: Float, 
        $ratingTo: Float,
        $birthYearFrom: Int,
        $birthYearTo: Int,
        $gender: GENDER
    ) {
        topPlayers(
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


function Players() {
    const [filterOptions, setFilterOptions] = useState<PlayersFilterOptions>({});
    const { loading, error, data } = useQuery<{ topPlayers: Player[] }>(GET_TOP_PLAYERS, {
        variables: filterOptions
    });

    const handleFiltersChange = (newFilterOptions: PlayersFilterOptions) => {
        setFilterOptions(newFilterOptions)
    }

    if (error) {
        console.log('Error:', error.message); 
    }

    return (

        <Box sx={{ width: '100%', height: '100%' }}>
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
                {!loading && <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead sx={{ fontWeight: 'bold' }}>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Gender</TableCell>
                                <TableCell align="left">Birth Year</TableCell>
                                <TableCell align="left">Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data?.topPlayers.map(({ id, fullName, gender, birthYear, rating }) => 
                                    <TableRow key={id}>
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
                }
            </Box>
        </Box>
    )
}

export default Players;