import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core';
// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  

const DisplayLittleBigFoot = (props) => {

  


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function selectShowingCase(){
       

    }

    return (
        
       <h5> 
       This is a special game, just like Big Mama and Big Rack little buck.  Rewards are paid out only if the last succesful record is beaten.
       You are in the search for Big Foot. 

       The duck that weighs the least, with the biggest size foot being measured by a tape measurer from heel to longest toe, wins.

       Every season, these special games records will become harder and harder to beat, until eventually... Who knows how big their pools could become.

       Will feel bad for all the hunters who actually beat these records, but weren't subscribed T_T

       Annually, I will come to visit the record holders if the pool size ever gets big enough to verify the winners. If the pool size is too small to be worth the trouble,
       then you'll just have to submit videos, photos, witnesses in the videos to testify of your truthfulness, and go to a butcher or a shop that stuffs animals for statues
       to get them to verify it, in the name of their shop and on the integrity of their shop. Willing to work with people who cannot meet one of these requirements. 
       
       These are rules I'm making up on the fly, we can change them as the community votes on FB poll, or Reddit Poll, anywhere we decide to use as home base.

       A gun section is coming soon! It will be an annual event, where subscribers meet together at a range, and all fire at a target. Shooter with most bullseyes wins. 
       And they will get a place in the annual hall of fame for best shooter on the site. 

       </h5>

    );
}

export default DisplayLittleBigFoot;