import { gql, useQuery } from '@apollo/client';
import './TournamentsList.css';
import Tournament from '../Tournament/Tournament';

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
         {  
            data.tournaments.map(({ id, date, name }: any) => (
               <Tournament key={id} name={name} date={date} />
            ))
         }
      </div>
   ) ;
}

export default TournamentsList;
