import React, { useEffect, useState } from 'react'
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import DisplayGame from './GameCategories/game.';
import DisplayBigMama from './GameCategories/bigMama';
import DisplayBigRackLittleBuck from './GameCategories/bigRackLittleBuck';
import DisplayLittleBigFoot from './GameCategories/littleBigFoot';

// this component passes most of it's own props down to children, categories of itself.

const TopDisplayCase = (props) => {

   const [game, setGame] = useState('');


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       if (game === 'duck'){
           return props.trophyDucks.map(ducks => <DisplayGame topGame={ducks} getVenues={props.getVenues} />)
       }
       if (game === 'deer'){
           return props.trophyBucks.map(bucks => <DisplayGame topGame={bucks} getVenues={props.getVenues}/>)
       }
       if(game === 'bass'){
           return props.trophyBass.map(bass => <DisplayGame topGame={bass} getVenues={props.getVenues}/>)
       }
       if(game === 'bigMama'){
           return props.trophyMama.map(bigMama => <DisplayBigMama trophyMama={bigMama} />)
       }
       if(game === 'bigRackLittleBuck'){
           
           return props.trophyBigRack.map(bigRack => <DisplayBigRackLittleBuck trophyBigRackLittleBuck={bigRack} />)
       }
       if(game === 'littleBigFoot'){
         
        return props.trophyLittleBigFoot.map(bigFoot => <DisplayLittleBigFoot trophyBigFoot={bigFoot} /> )
       }
       

    }
   
    return (
    
        <Grid id="trophyCase">
            <header style={{marginBottom: "1rem"}}><u style={{color: "gold", fontSize: "4vw"}}>Trophy Case</u></header>
            
            <div id="buttonGroup"> 

                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{fontSize: "3vw", color: "gold"}}  onClick={() => setGame('duck')}>Duck</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('deer')}>Deer</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('bass')}>Bass</Button>
                </ButtonGroup>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{fontSize: "3vw", color: "gold"}}  onClick={() => setGame('bigMama')}>The Big Momma</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('bigRackLittleBuck')}>BIG RACK, little buck</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('littleBigFoot')}>little Big Foot</Button>
                </ButtonGroup>
          
            </div>
            {(game !== '')}
            <Grid style={{height: "700px", overflowY: "scroll"}}>
                {selectShowingCase()}
                </Grid>
               
        </Grid>

    );
}

export default TopDisplayCase;