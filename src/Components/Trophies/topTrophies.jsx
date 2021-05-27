import React, { useEffect, useState } from 'react'
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import DisplayDucks from './GameCategories/ducks';
import DisplayDeer from './GameCategories/deer';
import DisplayBass from './GameCategories/bass';



const TopDisplayCase = (props) => {

   const [game, setGame] = useState('duck');


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       if (game === 'duck'){
           return <DisplayDucks />
       }
       if (game === 'deer'){
           return <DisplayDeer />
       }
       if(game === 'bass'){
           return <DisplayBass />
       }

    }
   
    return (
        <center>
        <Grid id="trophyCase">
            <header><u>Trophy Case</u></header>
            <div> 
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{fontSize: "3vw"}}  onClick={() => setGame('duck')}>Duck</Button>
                    <Button style={{fontSize: "3vw"}} onClick={() => setGame('deer')}>Deer</Button>
                    <Button style={{fontSize: "3vw"}} onClick={() => setGame('bass')}>Bass</Button>
                </ButtonGroup>

                {selectShowingCase()}
            </div>
               
        </Grid>
        </center>

    );
}

export default TopDisplayCase;