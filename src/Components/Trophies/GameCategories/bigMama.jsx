import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core';


const DisplayBigMama = (props) => {

  


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       

    }

    return (
        
       <h5> This is a special game, where the reward isn't every season. It is paid out only once the last record has been beaten.
            This allows the rewards to grow every season, becoming larger and larger, until someone can cash out by beating the last record.
            This special game goes to the person who catches the heaviest pregnant bass. Bonus reward if you can eat all the caviar in one sitting.

            will just need to getAllDucks/Bucks/Bass and then order by weight ascending, and foot size  / rack points / descending, and isPregnant? heighest weight wins.
       
       </h5>

    );
}

export default DisplayBigMama;