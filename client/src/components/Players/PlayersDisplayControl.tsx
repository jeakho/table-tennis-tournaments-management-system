import { Box, Pagination, Select, MenuItem } from "@mui/material";


interface PlayersDisplayControlProps {
    currentPage: number;
    pagesCount: number;
    playersPerPage: number;
    onPageSelect: (newPage: number) => void;
    onPlayersPerPageChange: (newValue: number) => void;
}

export const PLAYERS_PER_PAGE_OPTIONS = [2, 5, 10];

function PlayersDisplayControl({ 
    currentPage, 
    pagesCount, 
    playersPerPage, 
    onPageSelect,
    onPlayersPerPageChange
}: PlayersDisplayControlProps) {
    return (
        <Box sx={{ display: 'flex ', mt: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Pagination 
                count={ pagesCount } 
                showFirstButton showLastButton 
                shape="rounded" 
                color="primary"
                page={ currentPage }
                sx={{ mr: 1 }}
                onChange={(_, currentPage) => onPageSelect(currentPage)}
            />
            <Select
                size="small"
                value={ playersPerPage }
                onChange={ (e) => onPlayersPerPageChange(+e.target.value) }
            >
                {PLAYERS_PER_PAGE_OPTIONS.map((option) => (
                    <MenuItem key={ option } value={ option }>
                        { option }
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}

export default PlayersDisplayControl;