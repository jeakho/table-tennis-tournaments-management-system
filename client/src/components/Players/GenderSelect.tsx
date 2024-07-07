import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";


interface GenderSelectProps {
    onGenderChange: (param: {name: string, value: string}) => void;
}

function GenderSelect({ onGenderChange }: GenderSelectProps) {
    const [gender, setGender] = useState('')

    return (

        <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={(_, newGender) => (setGender(newGender), onGenderChange({ name: 'gender', value: newGender }))}
            sx={{
                display: 'block',
                mt: 2
            }}
        >
            <ToggleButton selected={ !gender } value="">
                All
            </ToggleButton>
            <ToggleButton value="Male">
                Male
            </ToggleButton>
            <ToggleButton value="Female">
                Female
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default GenderSelect;