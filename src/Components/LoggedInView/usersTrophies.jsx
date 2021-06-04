import React, { useEffect, useState } from 'react'
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import DisplayBigMama from '../Trophies/GameCategories/bigMama';
import DisplayBigRackLittleBuck from '../Trophies//GameCategories/bigRackLittleBuck';
import DisplayLittleBigFoot from '../Trophies/GameCategories/bigRackLittleBuck';
import UsersGame from './UsersOptions/usersGame'
import axios from 'axios';

// this component passes most of it's own props down to children, categories of itself.

const UsersTrophies = (props) => {

   const [game, setGame] = useState('');
   const [usersDucks, setUsersDucks] = useState('');
   const [usersBucks, setUsersBucks] = useState('');
   const [usersBass, setUsersBass] = useState('');
   const [usersMama, setUsersMama] = useState('');
   const [usersBigRack, setUsersBigRack] = useState('');
   const [usersBigFoot, setUsersBigFoot] = useState('');



   useEffect(() =>{
       console.log('Use Effect running')
       
   });



   async function getUsersDucks(){
    let response = await axios.get('http://127.0.0.1:8000/api/usersDucks/', {headers: {Authorization: 'Bearer ' + props.jwt}})
    setUsersDucks(response.data)
  
   }
   async function getUsersBucks(){
    let response = await axios.get('http://127.0.0.1:8000/api/usersBucks/', {headers: {Authorization: 'Bearer ' + props.jwt}})
    setUsersBucks(response.data)
   
   }
   async function getUsersBass(){
    let response = await axios.get('http://127.0.0.1:8000/api/usersBass/', {headers: {Authorization: 'Bearer ' + props.jwt}})
    setUsersBass(response.data)
   
   }



   function selectShowingCase(){
       if (game === 'duck'){
           
           return props.usersDucks.map(ducks => <UsersGame topGame={ducks} putDuck={props.putDuck}/> )
       }
       if (game === 'deer'){
           return props.usersBucks.map(bucks => <UsersGame topGame={bucks} putBuck={props.putBuck} /> )
       }
       if(game === 'bass'){
           return props.usersBass.map(bass => <UsersGame topGame={bass} putBass={props.putBass} /> )
       }
    //    if(game === 'bigMama'){
    //        return usersMama.map(bigMama => <DisplayBigMama trophyMama={bigMama} /> )
    //    }
    //    if(game === 'bigRackLittleBuck'){
    //        return usersBigRack.map(bigRack => <DisplayBigRackLittleBuck trophyBigRackLittleBuck={bigRack} /> )
    //    }
    //    if(game === 'littleBigFoot'){
    //     return usersBigFoot.map (bigFoot => <DisplayLittleBigFoot trophyLittleBigFoot={bigFoot} /> )
    //    }
    }

    // I plan to use these button gropus and if statements, in the future. Probably will re-write the code a little, but...
    // I want to only display Trophies from special games that the users posted if they won, then display the winning trophy
    // no points in displaying their special games in their own tabs for now, since getting all bucks which have users ID, already displays that one.
    // leaving this here, for a reminder to come back and work on it in the future, if I decide to.
   
    return (
        
        <Grid id="trophyCase">
            <header style={{marginBottom: "1rem"}}><u style={{color: "gold"}}>Your Trophy Case</u></header>
            <div id="buttonGroup"> 
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{fontSize: "3vw", color: "gold"}}  onClick={() => setGame('duck')}>Duck</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('deer')}>Deer</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('bass')}>Bass</Button>
                </ButtonGroup>
                {/* <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{fontSize: "3vw", color: "gold"}}  onClick={() => setGame('bigMama')}>The Big Momma</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('bigRackLittleBuck')}>BIG RACK, little buck</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setGame('littleBigFoot')}>little Big Foot</Button>
                </ButtonGroup> */}

             
          
            </div>

            <Grid style={{height: "400px", overflowY: "scroll"}}>
                {selectShowingCase()}
                </Grid>
               
        </Grid>
    

    );
}

export default UsersTrophies;