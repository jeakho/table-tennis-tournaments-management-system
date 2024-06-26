import { gql, useQuery } from '@apollo/client';
import './TournamentsList.css';
import Tournament from '../Tournament/Tournament';
import { Box, Button } from '@mui/material';

const GET_TOURNAMENTS = gql`
   query Tournaments {
      tournaments {
         id
         date
         name
      }
   }
`

function TournamentsList() {
   const { loading, error, data } = useQuery(GET_TOURNAMENTS);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error : { error.message }</p>;
 
   return (
      <div className='tournaments-list__wrapper'>
         <div className='tournaments-list__container'>
            {  
               data.tournaments.map(({ id, date, name }: any) => (
                  <Tournament key={id} name={name} date={date} />
               ))
            }
         </div>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               width: '100%',
               boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
            }}
         >
            <Button
               sx={{
                  m: 1,
                  minWidth: 300
               }}
               variant='contained'

            >Create new</Button>
         </Box>
      </div>
   ) ;
}

export default TournamentsList;
