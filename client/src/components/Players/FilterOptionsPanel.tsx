import { Box, Card, CardContent, TextField } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import { PlayersFilterOptions } from "./Players";
import { debounce } from "lodash";
import GenderSelect from "./GenderSelect";


interface FilterPanelProps {
    filters: PlayersFilterOptions;
    onFiltersChange: (filters: PlayersFilterOptions) => void;
}


function FilterOptionsPanel({ filters, onFiltersChange }: FilterPanelProps) {
    const [filterPanelShown, setFilterPanelShown] = useState(false);

    const handleChange = ({ name, value }: {name: string, value: string}) => {
        const newFilters = { ...filters, [name]: value ? (isNaN(parseFloat(value)) ? value : parseFloat(value)) : undefined };
        onFiltersChange(newFilters);
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ 
                    mr: 2, 
                    display: 'inline-block', 
                    textAlign: 'center',
                    height: '40px',
                    backgroundColor: 'transparent',
                    border: '1px solid #d2d2d2'
                }} 
                component="button"
                onClick={() => setFilterPanelShown(!filterPanelShown)}
            >
                <FilterListIcon />
                <ArrowDropDownIcon />
            </Box>
            <TextField sx={{ width: '50%' }}
                name="nameStartsWith"
                size="small" 
                label="Name" 
                variant="outlined"
                onChange={ debounce(({ target }) => handleChange({ name: target.name, value: target.value }), 500) }
            />


            <Card sx={{
                m: '20px 10px',
                display: filterPanelShown ? 'block' : 'none'
            }} >
                <CardContent sx={{ display: 'flex' }}>
                    <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        Rating:
                        <TextField
                            name="ratingFrom"
                            size="small" 
                            sx={{ ml: 3, width: '100px' }} 
                            label="from"
                            onChange={ debounce(({ target }) => handleChange({ name: target.name, value: target.value }), 500) }
                        />
                        <TextField
                            name="ratingTo"
                            size="small" 
                            sx={{ ml: 1, width: '80px' }} 
                            label="to"
                            onChange={ debounce(({ target }) => handleChange({ name: target.name, value: target.value }), 500) }
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', ml: 2 }}>
                        Birth Year:
                        <TextField
                            name="birthYearFrom"
                            size="small" 
                            sx={{ ml: 3, width: '100px' }} 
                            label="from"
                            onChange={ debounce(({ target }) => handleChange({ name: target.name, value: target.value }), 500) }
                        />
                        <TextField
                            name="birthYearTo"
                            size="small" 
                            sx={{ ml: 1, width: '80px' }} 
                            label="to"
                            onChange={ debounce(({ target }) => handleChange({ name: target.name, value: target.value }), 500) }
                        />
                    </Box>
                </CardContent>
            </Card>
            <GenderSelect onGenderChange={handleChange} />
        </Box>
    )
}

export default FilterOptionsPanel;