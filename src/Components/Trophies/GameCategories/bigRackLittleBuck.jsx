import React, { useEffect, useState } from 'react'
import { Grid, Button, Card } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';
// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  

const DisplayBigRackLittleBuck = (props) => {

    const [isFront, setSide] = useState(false);
    const [detailSide, setDetail] = useState(true);
    const [locationSide, setLocation] = useState(false);

   useEffect(() =>{
       console.log('Use Effect running')
   });


   const handleClick = (event) => {
    event.stopPropagation();
    setSide(!isFront);
    }
    
  
   function selectDetailSide(){
       setDetail(!detailSide)

    }
    
    function selectGeoCodingSide(){
        setLocation(!locationSide)
    }

    return (
        
        <Grid><Card>

           {isFront ? 
           <Button onClick={() => selectGeoCodingSide()}> 

           { locationSide ? 
           <h8 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>USER DETAILS</h8> : <h8 
                    style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>LOCATION</h8> }

           {locationSide ? 
           <Card style={{textAlign: "right", fontSize: "3vw", marginRight: "3rem"}}>Click to see Location</Card> : <Card>Click for Champ Details</Card> } </Button>  : <Button onClick={() => selectDetailSide()}>
            
           { detailSide ? 
           <h8 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Record BigRack lil'buck</h8> : <h8
               style={{textAlign: "left", fontSize: "3vw", marginRight: "2rem"}}>Rules to Win</h8> }


           {detailSide ? <Card>Click for Rules</Card> : <Card>Click for Record BRLB</Card>}
           </Button> }

        <ReactCardFlip isFlipped={isFront} flipDirection='vertical'>
      <Card id="topTrophiesCard" onClick={handleClick}>
           {detailSide ? 
           <img id="topTrophies" src={"http://127.0.0.1:8000"+props.trophyBigRackLittleBuck.image}></img> : <b>
           <p style={{height: "500px", paddingRight: "0.5rem", width: "75%", overflowY: "scroll", color: "gold"}}>
           
           
                This is a special game. Unlike the seasonal winner being paid out for biggest Buck, Duck, or Bass. This reward is paid out only after the last best set record is beaten.
                So, let's say someone sets a really good record that is hard to beat and it takes years to beat it. That means, every year the pool size is accruing more and more size to the pot.
                Once someone eventually beats the record.. who knows how much $$$ it could become worth in time.

                Big Rack little buck, is a game that the aware goes to the person who catches the buck with the most points on his rack, that weighs the least. They get the pool. 

                In order to win, your buck must have greater than or equal to the number of points on his rack as the last greatest record, but also weigh less.
                It it calculated by taking the list of all the bucks registered, and ordering them by weight in ascending order least to greatest. Taking the top 7 least in weight,
                then comparing their rack points. The one with the least rack points, wins. I've been trying to think of a better way to calculate it, but that's my simple solution for now.

                Video of the person who ate the caviar will be uploaded here!
           
           
          </p></b>  } 

              <Card id="topTrophiesDetailsCard" > {props.trophyBigRackLittleBuck.weight} lbs </Card>
       </Card>
       <Card id="topTrophiesCardBack" onClick={handleClick} style={{overflowY: "scroll"}}>
        {locationSide ?
          <h4> {props.trophyBigRackLittleBuck.comments}   USERNAME, FNAME LASTNAME, DATE RECORDED.  </h4> : <h4>

            LOCATION FOUND GOES HERE
        </h4> }

        
       </Card>
       </ReactCardFlip>
      </Card></Grid>
   
    );
}

export default DisplayBigRackLittleBuck;