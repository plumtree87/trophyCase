import React, { useEffect, useState, createRef } from 'react'
import { Grid, Button, Card } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios'
//import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  


const DisplayGame = (props) => {


    const [isFront, setSide] = useState(false);
    const [location, setLocation] = useState({lat: 35, lng: 150})
    let myRef = React.createRef();
  


   useEffect(() =>{
       console.log('Use Effect running')
       console.log(location)
       
     
      
      
       
   });
   

   const handleClick = (address) => {
     console.log(address, "AADDDRESSSS")
    
    //geocode(location);
    setSide(!isFront);
    
    geocode(address)
    
    console.log(location, "LOCATIONNNNN")
  }



    async function geocode(props){
      console.log(props, "props")
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
    }

    const renderMap = () => {

     
      
      console.log(location)
      
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyC3CR7HFXvYhJDemaEE5f82ZvH7SUb8GDQ&callback=initMap`)
      window.initMap = initMap
    }




   

   function selectGameInfo(){
       if(props.topGame.rackpoints !== undefined){
  
         return <Card> <div id="map" ref={myRef} style={{height: "50vh", width: "100%", overflowY: "scroll"}}> {renderMap()}  </div>  </Card>
       }  
       if(props.topGame.isPregnant !== undefined){
      
         return <Card> <div id="map" ref={myRef} style={{height: "50vh", width: "100%", overflowY: "scroll"}}> {renderMap()}  </div></Card>
       }
       if(props.topGame.footsize !== undefined){
      
         return <Card> <div id="map" ref={myRef} style={{height: "50vh", width: "100%", overflowY: "scroll"}}> {renderMap()}  </div></Card>
       }

    }
    /// I was having issues with my django media files being rendered on tha page. I do not know why. I followed several guides, and I couldn't piece it together. 
    /// one guide really frustrated me, when it showed me putting in my web address and the image file location, and saying "it should look like this once you're done"
    /// and I did, and mine loaded on my host, so apparently I did everything right, but it still wouldn't show up on my react. I have a lot to do... 
    /// going to figure out the real way to do this later..  I'll have to come back to it, because I have so much more work left to do. I want to get the design right, and worry
    /// about this media thing later.
    return (
     
        
    <Card>
       
         <ReactCardFlip isFlipped={isFront} flipDirection='horizontal'>
       <Card id="topTrophiesCard" onClick={() => handleClick(props.topGame.address)}>
             <img id="topTrophies" src={"http://127.0.0.1:8000"+props.topGame.image}></img>  

               <Card id="topTrophiesDetailsCard" > {props.topGame.weight} lbs</Card>
        </Card>
        <Card id="topTrophiesCardBack" onClick={() => handleClick(props.topGame.address)}>
      
              {selectGameInfo()}
        </Card>
        </ReactCardFlip>
       </Card>
    );
}

export default DisplayGame;