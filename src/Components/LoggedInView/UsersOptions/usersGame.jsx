import React, { useEffect, useState, createRef } from 'react'
import { Card, Grid, ButtonProps, TextField, ThemeProvider, Form, FormControlLabel, Checkbox } from '@material-ui/core';
import { findByPlaceholderText } from '@testing-library/dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios'




const UsersGame = (props) => {

   const [isFront, setSide] = useState(true);
   const [isInEditor, setToEditor] =useState(false);
   const [isPregnant, setIsPregnant] =useState(false);
   const [location, setLocation] = useState({lat: 35, lng: 150})

   let myRef = React.createRef();

 
   useEffect(() =>{
       console.log('Use Effect running')
   });

   const [game, setGame] = useState({
       
       comment: '',
       weight: '',
   })
   

   //I didn't use this flow controller as much as I felt I was going to when I started it.. probably wasn't worth it. lol..

   function flowController(buckFunction, bassFunction, duckFunction){
     
       if(props.topGame.rackpoints !== undefined){
        try{
    
           buckFunction();
       } catch(e) { return buckFunction } // ignore the error
       }
       if(props.topGame.isPregnant !== undefined){
        try{
         
            bassFunction();
       } catch(e) {  return bassFunction } // ignore the error
       }
       if(props.topGame.footsize !== undefined){
        try{
            duckFunction();
       } catch(e) { return duckFunction } // ignore the error
       }
   }


   //yea my flow controller didn't work with this, because props.putGame whichever one wasn't being browsed at the time, was undefined... and it wouldn't 
   // even let my flow controller figure it out. 
   async function handleSubmit(id){
       
       if (props.putBuck !== undefined){
            var formdata = new FormData()
            formdata.append('weight', game.weight)
            //formdata.append('comment', game.comment)
            formdata.append('rackpoints', game.specialAttribute)
            formdata.append('video_id', game.video_id)
            formdata.append('address', game.location)
            props.putBuck(formdata, id)
       }
       if(props.putBass !== undefined){
            var formdata = new FormData()
            formdata.append('weight', game.weight)
            //formdata.append('comment', game.comment)
            formdata.append('isPregnant', game.specialAttribute)
            formdata.append('video_id', game.video_id)
            formdata.append('address', game.location)

            props.putBass(formdata, id)
       }
       if(props.putDuck !== undefined){
            var formdata = new FormData()
            formdata.append('weight', game.weight)
            //formdata.append('comment', game.comment)
            console.log(game.specialAttribute)
            console.log(game.weight)
            console.log(game.location)
            formdata.append('footsize', game.specialAttribute)
            formdata.append('video_id', game.video_id)
            formdata.append('address', game.location)
            console.log(formdata, "FORM DATA", id, "ID")
            console.log(game.specialAttribute, "FOOTSIZE HERE")
            console.log('address', game.address)
            props.putDuck(formdata, id)
       }
       
       setToEditor(!isInEditor);
       //flowController(props.putBuck(buckData, id), props.putBass(bassData, id), props.putDuck(duckData, id))   no worky work.
    }

    

    // 
    // const buckData = {
    //     weight: game.weight,
    //     rackpoints: game.specialAttribute,
    //     comment: game.comments,
    //     location: game.location,
    //     video_id: game.video_id,
    // }
    // const bassData = {
    //     weight: game.weight,
    //     isPregnant: game.specialAttribute,
    //     comment: game.comments,
    //     location: game.location,
    //     video_id: game.video_id
    // }
    // const duckData = {
    //     weight: game.weight,
    //     footsize: game.specialAttribute,
    //     comment: game.comments,
    //     location: game.location,
    //     video_id: game.video_id

    // }


   const onChangeWeight = (e) => {
       console.log(e.target.value)
        setGame({
        ...game, weight: e.target.value
        })
    }
    const onChangeSpecialAttribute = (e) => {
        console.log(e.target.value)
        setGame({
        ...game, specialAttribute: e.target.value
        })
    }
    const onChangeComment = (e) => {
        setGame({
        ...game, comment: e.target.value
        })
    }

    const onChangeLocation = (e) => {
        setGame({
            ...game, location: e.target.value
        })
    }

    const onChangeVideoId = (e) => {
        setGame({
            ...game, video_id: e.target.value
        })
    }

    // idk if this function was uncessary, but couldn't wrap my brain around using onChangeSpecialAttribute for this also.
    const handleIsPregnant = (e) => {
        const { checked } = e.target
     
        setIsPregnant({
          isPregnant: checked
        })
        setGame({
            ...game, specialAttribute: isPregnant
        })
    }

    // I made this one a constant, and the other ones functions just to test and see how they behave, and to know if they behave differently...
    // I dont notice a difference, but I never do hit my try in my flowController(), it's always a catch. *shrug* still learning...

    const returnBuckOnChangeValue = 
            <TextField
                label="rackpoints"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                name="rackpoints"
                onChange={onChangeSpecialAttribute}
            /> 
    
    
    function returnBassOnChangeValue(){
    
    
        return  <FormControlLabel
                value="isPregnant"
                control={<Checkbox color="primary"   onChange={e => handleIsPregnant(e)} />}
                label="is big Moma?"
                labelPlacement="end"
              
                defaultChecked={isPregnant}
            />
    }

    function returnDuckOnChangeValue(){
   
        return <TextField
                label="footsize"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                name="footsize"
                onChange={onChangeSpecialAttribute}
                />
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

     function setSideAndGeocode(address){
         setSide(!isFront)
         geocode(address);
     }
  // This function determines what will display in the window. Either the Details about the users game, 
  // or an Editor Window, that allows them to change values of weight, etc.

   function displayDetailsOrEditor(){
        if(isInEditor === false){
            if(props.topGame.rackpoints !== undefined){
           
            return <Card id="userBackCard"  onClick={() => setSideAndGeocode(props.topGame.address)}> {props.topGame.weight} lbs with {props.topGame.rackpoints} rack points <Card> {selectGameInfo()} </Card>  </Card>
            }
            if(props.topGame.isPregnant !== undefined){
                if(props.topGame.isPregnant === true){
                    return <Card id="userBackCard"  onClick={() => setSideAndGeocode(props.topGame.address)}> {props.topGame.weight} pound Moma! <Card>  {selectGameInfo()}</Card></Card>
                }
                else return <Card id="userBackCard"  onClick={() => setSideAndGeocode(props.topGame.address)}> {props.topGame.weight} lbs <Card> {selectGameInfo()}</Card> </Card>
            }
            if(props.topGame.footsize !== undefined){
            return <Card id="userBackCard"  onClick={() => setSide(!isFront)}>{props.topGame.weight} lbs with {props.topGame.footsize} inch long feet! <Card>  {selectGameInfo()}</Card></Card>
            }
        }

        if(isInEditor === true){
            return (
            <Grid style={{marginTop: "0rem"}}>
            <Card style={{width: "300px", textAlign: "-webkit-center"}}>
            <form style={{margin: "1rem"}} >
            {flowController(returnBuckOnChangeValue, returnBassOnChangeValue(), returnDuckOnChangeValue())}
                <ThemeProvider >
                    <TextField
                        label="weight"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="weight"
                        onChange={onChangeWeight}
                        
                    />
          
                {/* <TextField
                        label="comment"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="comment"
                        onChange={onChangeComment}
                        
                    /> */}
                 <TextField
                        label="location; example: Chickasha, OK"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="location"
                        onChange={onChangeLocation}
                        
                    />
                 <TextField
                        label="youtube video link"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="video_id"
                        onChange={onChangeVideoId}
                        
                    />
                </ThemeProvider>
                
              
            </form>
            </Card>
            <div>  <input type="submit" value="Submit" style={{marginRight: "1rem", marginTop: "1rem"}} onClick={() => handleSubmit(props.topGame.id)} />
                              <a id="notRegistered" href='#' style={{color: "white"}} onClick={() => setToEditor(false)}> Back </a>
              </div>
           
           
            </Grid>
            )
        }
    }

    function runTwoFunctions(data){
        setSide(!isFront)
        geocode(data)
    }

    //  <button onClick={() => geocode(props.topGame.address)}>re-geocode</button>

    return (
        <Grid>
              
            <Grid >
          
            {isFront ? <Card id="topTrophiesCard">
                             <img src={"http://127.0.0.1:8000"+props.topGame.image} alt="photo of your ducks" onClick={() => runTwoFunctions(props.topGame.address)} style={{width: "75%", height: "75%", maxHeight: "400px", maxWidth: "400px", marginTop: "1rem" , border: "groove"}} />
                      </Card>   : 
                       <Card style={{fontSize: "4vw", width: "95%", height: "auto", marginTop: "1rem", background: "content-box"}}>
                           
                            {displayDetailsOrEditor()}
                            {isInEditor ?  <div>   </div> : <div>  <button style={{fontSize: "3vw"}} onClick={() => setToEditor(true)}>edit</button> </div> } 
                      </Card>     }
   

          </Grid>
          

        </Grid>
      
      
  

    );
}

export default UsersGame;
