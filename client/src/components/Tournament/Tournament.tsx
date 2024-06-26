import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Tournament.css'

export interface TournamentProps {
    name: string
    date: string
}

function Tournament({ name, date }: TournamentProps) {
    return (
        <Card sx={{
            width: 250, 
            height: 200,
            m: 2,
            '&:hover': {
                'box-shadow': '0 0 11px rgba(33,33,33,.2)'
            }
        }}>
            <CardMedia 
                image='/public/table-tennis.jpg'
            />
            <CardContent>
                <Typography variant='h5'>
                    { name }
                </Typography>
                <Typography variant='body2' color="text.secondary">
                    { date }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Tournament;