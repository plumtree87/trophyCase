import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core';


const DisplayLittleBigFoot = (props) => {

  


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       

    }

    return (
        
       <h1> This game is not paid out seasonally, but only after the last record has been beaten. You're looking for the smallest weighing duck,
            with the biggest foot. measured by a tape-measurer. I imagine, this record will eventually become so hard to get, that the pool if people
            played long enough, could get up to the millions... through your monthly subscriptions for using the Tropy Case, profits that the website generates
            pay into a rewards pool for users to reap.  Good luck on catching Big Foot!  We will try to use Guiness Book of World Records to document these special cases.
            because, they're going to be historically the most special of their kind on record, in time.. I'm sure.
       </h1>

    );
}

export default DisplayLittleBigFoot;