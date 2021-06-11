import React, { useEffect, useState, createRef } from 'react'
import { Grid, Button, Card } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios'
//import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// the props for this component are passed in from main app into <TopDisplayCase />, and from topTrophies.jsx to here.  


const DisplayGame = (props) => {


    const [isFront, setSide] = useState(false);
    const [location, setLocation] = useState({lat: 35, lng: 150})
    const [profileView, setProfileView] = useState(false)
    let myRef = React.createRef();
    let textInput = React.createRef();
  


   useEffect(() =>{
       console.log('Use Effect running')
      
       
     
      
      
       
   });

   async function getUserProfile(data){
      
    setProfileView(!profileView)
    console.log("game.jsx line 97 entering props.displayProfile(data) which leads to topTrophies.jsx displayProfileView props.")
    await props.displayProfileView(data)
    
    
  }

  async function leaveUserProfile(){
    console.log("game.jsx line 104 entering props.exitProfileView() which leads to topTrophies.jsx exitProfileView props ")
    await props.exitProfileView()
    setProfileView(!profileView)
  }
   

   const handleClick = (address) => {
     console.log(address, "AADDDRESSSS")
    
    //geocode(location);
    setSide(!isFront);
    if (isFront === true){
      geocode(address)
    }
    
   
    
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

   

    return (
     
        
    <Card>
          { profileView ? 
          <button ref={textInput} style={{borderWidth: "thick"}} onClick={() => leaveUserProfile()}>Switch between User's Profile and TopGame</button> : 
          <button ref={textInput} style={{borderWidth: "thick"}} onClick={() => getUserProfile(props.topGame.user)}>Switch between User's Profile and TopGame</button> }
       
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