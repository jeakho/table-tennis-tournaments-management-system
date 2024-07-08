import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { Player } from "./player";

interface PlayerRecord extends Player {
    no: number
}

interface PlayersDisplayProps {
    playersRecords: PlayerRecord[]
}

function PlayersDisplay({ playersRecords }: PlayersDisplayProps) {
    return (
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
                        playersRecords.map(({ id, no, fullName, gender, birthYear, rating }) => 
                            <TableRow key={id}>
                                <TableCell align="left">{ no }</TableCell>
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
    );
}

export default PlayersDisplay;