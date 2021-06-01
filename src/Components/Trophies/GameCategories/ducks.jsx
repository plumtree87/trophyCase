import React, { useEffect, useState } from 'react'
import { Grid, Button, Card } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';

// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  


const DisplayDucks = (props) => {


    const [isFront, setSide] = useState(false);
  


   useEffect(() =>{
       console.log('Use Effect running')
   });

   const handleClick = (event) => {
    event.stopPropagation();
    setSide(!isFront);
    }

   function selectShowingCase(){
       

    }
    /// I was having issues with my django media files being rendered on tha page. I do not know why. I followed several guides, and I couldn't piece it together. 
    /// one guide really frustrated me, when it showed me putting in my web address and the image file location, and saying "it should look like this once you're done"
    /// and I did, and mine loaded on my host, so apparently I did everything right, but it still wouldn't show up on my react. I have a lot to do... 
    /// going to figure out the real way to do this later..  I'll have to come back to it, because I have so much more work left to do. I want to get the design right, and worry
    /// about this media thing later.
    return (
        
    <Card>
       
         <ReactCardFlip isFlipped={isFront} flipDirection='horizontal'>
       <Card id="topTrophiesCard" onClick={handleClick}>
             <img id="topTrophies" src={"http://127.0.0.1:8000"+props.topDucks.image}></img>  

               <Card id="topTrophiesDetailsCard" > {props.topDucks.weight} lbs</Card>
        </Card>
        <Card id="topTrophiesCardBack" onClick={handleClick}>
      
               I want to put here, the Geolocation of the area the hunter captured this creature at... I think? Although thought of making comments possilble on the backside. not sure yet.
         
        </Card>
        </ReactCardFlip>
       </Card>
    );
}

export default DisplayDucks;