import React, { useEffect, useState } from 'react'
import { Grid, Form, TextField, ThemeProvider } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import UsersTrophies from './usersTrophies'


const LoggedInView = (props) => {

   const [userChoice, setChoice] = useState('');

   useEffect(() =>{
       console.log('Use Effect running')
      
   });



   function selectView(){
       if(userChoice === 'usersTrophies'){
            return <UsersTrophies />
       }
       if(userChoice === 'registerTrophy'){

       }
   }
   /// form handlers between these comments below///

   const [user, setUser] = useState({
       email: '',
       password: '',
   });

    return (
        <Grid >
                       <ButtonGroup variant="text" color="primary" aria-label="text primary button group"  id="buttonGroup" style={{width: "100%"}}>
                    <Button style={{fontSize: "3vw", color: "gold"}}  onClick={() => setChoice('usersTrophies')}>Your Trophies</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setChoice('registerTrophy')}>Something here</Button>
                    <Button style={{fontSize: "3vw", color: "gold"}} onClick={() => setChoice('littleBigFoot')}>Something Here</Button>
                </ButtonGroup>
                <Grid>
                    {selectView()}
                </Grid>
        </Grid>
    
  

    );
}

export default LoggedInView;
