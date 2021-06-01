import React, { useEffect, useState } from 'react'
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import DisplayDucks from '../Trophies/GameCategories/ducks';
import DisplayDeer from '../Trophies/GameCategories/deer';
import DisplayBass from '../Trophies/GameCategories/bass';
import DisplayBigMama from '../Trophies/GameCategories/bigMama';
import DisplayBigRackLittleBuck from '../Trophies//GameCategories/bigRackLittleBuck';
import DisplayLittleBigFoot from '../Trophies/GameCategories/bigRackLittleBuck'

// this component passes most of it's own props down to children, categories of itself.

const UsersTrophies = (props) => {

   const [game, setGame] = useState('');


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       if (game === 'duck'){
           return props.usersDucks.map(ducks => <DisplayDucks usersDucks={ducks} />)
       }
       if (game === 'deer'){
           return props.usersBucks.map(bucks => <DisplayDeer topBucks={bucks}/>)
       }
       if(game === 'bass'){
           return props.usersBass.map(bass => <DisplayBass topBass={bass} />)
       }
       if(game === 'bigMama'){
           return props.usersMama.map(bigMama => <DisplayBigMama usersMama={bigMama} />)
       }
       if(game === 'bigRackLittleBuck'){
           return <DisplayBigRackLittleBuck usersBigRackLittleBuck={props.usersBigRackLittleBuck} />
       }
       if(game === 'littleBigFoot'){
        return <DisplayLittleBigFoot usersBigFoot={props.usersLittleBigFoot} />
       }
       

    }
   
    return (
        <center>
        <Grid id="trophyCase">
            <header style={{marginBottom: "1rem"}}><u style={{color: "gold"}}>Trophy Case</u></header>
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

            <Grid style={{height: "400px", overflowY: "scroll"}}>
                {selectShowingCase()}
                </Grid>
               
        </Grid>
        </center>

    );
}

export default UsersTrophies;