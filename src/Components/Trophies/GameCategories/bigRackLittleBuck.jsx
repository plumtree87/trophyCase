import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core';


const DisplayBigRackLittleBuck = (props) => {

  


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       

    }

    return (
        
       <h1> This game is not paid out every season, but only once you beat the last best set record. This allows the pool of rewards to increase
            every season, until the last record is beat. This creates a very large pool, eventually. Ths reward goes to the person who catches the
            buck with with the most points on his rack, and the least amount of weight.
       </h1>

    );
}

export default DisplayBigRackLittleBuck;