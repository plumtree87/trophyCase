import React, { useEffect, useState, createRef } from 'react'
import { Grid, Button, Card } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios'
// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  

const DisplayBigRackLittleBuck = (props) => {

    const [isFront, setSide] = useState(false);
    const [detailSide, setDetail] = useState(true);
    const [locationSide, setLocationSide] = useState(false);
    const [location, setLocation] = useState({lat: 39, lng: 150})
    var myRef = new React.createRef();
    const videoSrc = `https://www.youtube.com/embed/${props.trophyBigRackLittleBuck.video_id}`;

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
    
    function selectGeoCodingSide(data){
        setLocationSide(!locationSide)
       // if(locationSide === true){
            geocode(data);
       // }
        
    }

    async function geocode(props){
      
        var location = props;
        let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyC3CR7HFXvYhJDemaEE5f82ZvH7SUb8GDQ`)
     
        setLocation(response.data.results[0]['geometry'].location)
        
      }
       
  
      function loadScript(url) {
        var index = window.document.getElementsByTagName('script')[0]
        var script = window.document.createElement('script')
        script.src = url
        script.async = true
        script.defer = true
        index.parentNode.insertBefore(script, index)
      }
  
      const initMap = () => {
  
        var map = new window.google.maps.Map(myRef.current, {
          center: location,
          zoom: 8,
          
        });
        //delete these pins later, they were just required for user stories, but dont really want to show people's pins 
        // in case they actually put the full location of their secret fishing spot, or some private hunting ground,
        // and then strangers come to hunt or fish there.  It's better to just display general county 
        var marker = new window.google.maps.Marker({
          position : new window.google.maps.LatLng(location['lat'], location['lng']),
          map: map
        })
  
      }
  
      const renderMap = () => {
  
        console.log(location)
        
        loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyC3CR7HFXvYhJDemaEE5f82ZvH7SUb8GDQ&callback=initMap`)
        window.initMap = initMap
      }

    return (
        
        <Grid><Card>

           {isFront ? 
           <Button onClick={() => selectGeoCodingSide(props.trophyBigRackLittleBuck.address)}> 

           { locationSide ? 
           <h4 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Location</h4> : <h4 
                    style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Video</h4> }

           {locationSide ? 
           <h4>Click for Video</h4> : <h4>Click for Location</h4> } </Button>  : <Button onClick={() => selectDetailSide()}>
            
           { detailSide ? 
           <h4 style={{textAlign: "left", fontSize: "3vw", marginRight: "3rem"}}>Record BigRack lil'buck</h4> : <h4
               style={{textAlign: "left", fontSize: "3vw", marginRight: "2rem"}}>Rules to Win</h4> }


           {detailSide ? <h4> Click for Rules</h4> : <h4>Click for Record BRLB</h4>}
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
            <div id="map" ref={myRef} style={{height: "50vh", width: "100%", overflowY: "scroll"}}> {renderMap()}  </div> : <h4>
          <div id="myIframe">
          <iframe id="innerIframe" width="560" height="315" src={videoSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </h4> }

        
       </Card>
       </ReactCardFlip>
      </Card></Grid>
   
    );
}

export default DisplayBigRackLittleBuck;