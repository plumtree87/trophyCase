import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core';
// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  

const DisplayBigRackLittleBuck = (props) => {

  


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       

    }

    return (
        
       <h5> 
       This is a special game, just like Big Mama. Winner is only paid if they beat the last highest set record. 

       This game goes to the winner who catches the buck with the most points on his rack, that weighs the least. 

       That's why it's called, "Big Rack, little buck."
       </h5>

    );
}

export default DisplayBigRackLittleBuck;