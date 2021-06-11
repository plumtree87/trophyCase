import React, { useEffect, useState } from 'react'
import { Grid, Button, Card } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';
// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  

const DisplayBigMama = (props) => {

  

    const [isFront, setSide] = useState(false);
    const [detailSide, setDetail] = useState(true);
    const [locationSide, setLocation] = useState(false);
    const videoSrc = `https://www.youtube.com/embed/${props.trophyMama.video_id}`;


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

           { locationSide ? <h4 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>USER DETAILS</h4> 
           : <h4 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Video</h4> }

           {locationSide ? <h4><b>Click for Video</b></h4> : <h4>Click to see Champ Details</h4> }
           </Button>  : 
           <Button onClick={() => selectDetailSide()}>
            
           { detailSide ? <h4 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Record BigMama</h4> 
           : <h4 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Rules to Win</h4> }


           {detailSide ? <h4>Click to see Rules</h4> : <h4>Click to see Record Mama</h4>}
           </Button> }

        <ReactCardFlip isFlipped={isFront} flipDirection='vertical'>
      <Card id="topTrophiesCard" onClick={handleClick}>
           {detailSide ? <img id="topTrophies" src={"http://127.0.0.1:8000"+props.trophyMama.image}></img> : <b><p style={{height: "400px", paddingRight: "0.5rem", width: "75%", overflowY: "scroll", color: "gold"}}>
           
           
                This is a special game. Unlike the seasonal winner being paid out for biggest Buck, Duck, or Bass. This reward is paid out only after the last best set record is beaten.
                So, let's say someone sets a really good record that is hard to beat and it takes years to beat it. That means, every year the pool size is accruing more and more size to the pot.
                Once someone eventually beats the record.. who knows how much $$$ it could become worth in time.

                Big Mama is a game where whoever catches the heaviest weighing pregnant largemouth bass, and eats all it's caviar in one sitting. They get the pool. 

                In order to win, your bass must weigh more than the last record, and you must also successfully eat all it's caviar in one sitting.
                Vomitting after stomaching it is allowed. If you're not the type to handle it. Grind it in a blender and chug it down. I dont care...
                It just has to go down the gulp.

                Video of the person who ate the caviar will be uploaded here!
           
           
          </p></b>  } 

              <Card id="topTrophiesDetailsCard" > {props.trophyMama.weight} lbs </Card>
       </Card>
       <Card id="topTrophiesCardBack" onClick={handleClick} style={{overflowY: "scroll"}}>
        {locationSide ?  <h4> {props.trophyMama.comments}   USERNAME, FNAME LASTNAME, DATE RECORDED.  </h4> : <h4>
            <div id="myIframe"> 
        <iframe id="innerIframe" width="560" height="315" src={videoSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </h4> }

        
       </Card>
       </ReactCardFlip>
      </Card></Grid>
   
    );
}

export default DisplayBigMama;