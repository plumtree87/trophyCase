import React, { useEffect, useState } from 'react'
import { Card, Grid, ButtonProps, TextField, ThemeProvider, Form, FormControlLabel, Checkbox } from '@material-ui/core';
import { findByPlaceholderText } from '@testing-library/dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';




const UsersGame = (props) => {

   const [isFront, setSide] = useState(true);
   const [isInEditor, setToEditor] =useState(false);
   const [isPregnant, setIsPregnant] =useState(false)

 
   useEffect(() =>{
       console.log('Use Effect running')
   });

   const [game, setGame] = useState({
       rackpoints: '',
       comment: '',
       weight: '',
   })
   

   // I got tired of typing IF statements for these, which was pretty repetitive, and I dont know if it actually saved me any time, but..
   // Idk... I made it anyways.   This just looks at the incoming prop.game.data to find if they're currently browsing ducks/bucks/bass
   // depending on which one they're currently browsing, then I put functions I want to run on all 3 of them, but it only runs the one
   // which is currently being browsed. 

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


   // Depending on which game they're currently browsing/editing, this will sent to my axios PUT request dependant on which one they're on.
   async function handleSubmit(id){
       console.log("RUNNING HANDLE SUBMIT:   DATA=", buckData, "id =", id)
       
       props.putBuck(buckData, id)
       setToEditor(!isInEditor);
       //flowController(props.putBuck(buckData, id), props.putBass(bassData, id), props.putDuck(duckData, id))
    }

    

    // coudln't think of a briefer, easier way to do this...
    const buckData = {
        weight: game.weight,
        rackpoints: game.specialAttribute,
        comment: game.comments,
    }
    const bassData = {
        weight: game.weight,
        isPregnant: game.specialAttribute,
        comment: game.comments,
    }
    const duckData = {
        weight: game.weight,
        footsize: game.specialAttribute,
        comment: game.comments,
    }


   const onChangeWeight = (e) => {
        setGame({
        ...game, weight: e.target.value
        })
    }
    const onChangeSpecialAttribute = (e) => {
        setGame({
        ...game, specialAttribute: e.target.value
        })
    }
    const onChangeComment = (e) => {
        setGame({
        ...game, comment: e.target.value
        })
    }

    // idk if this function was uncessary, but couldn't wrap my brain around using onChangeSpecialAttribute for this also.
    const handleIsPregnant = (e) => {
        const { checked } = e.target
        console.log(isPregnant)
        setIsPregnant({
          isPregnant: checked
        })
        setGame({
            ...game, specialAttribute: isPregnant
        })
    }

    // I made this one a constant, and the other ones functions just to test and see how they behave, and to know if they behave differently...
    // I dont notice a difference, but I never do hit my try in my flowController, it's always a catch. *shrug* still learning...

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


  // This function determines what will display in the window. Either the Details about the users game, 
  // or an Editor Window, that allows them to change values of weight, etc.

   function displayDetailsOrEditor(){
        if(isInEditor === false){
            if(props.topGame.rackpoints !== undefined){
           
            return <Card id="userBackCard"  onClick={() => setSide(!isFront)}>{props.topGame.weight} lbs <br></br> {props.topGame.rackpoints} rack-points {props.topGame.comments}  </Card>
            }
            if(props.topGame.isPregnant !== undefined){
                if(props.topGame.isPregnant === true){
                    return <Card id="userBackCard"  onClick={() => setSide(!isFront)}>{props.topGame.weight} pound Moma! <Card>{props.topGame.comments}</Card></Card>
                }
                else return <Card id="userBackCard"  onClick={() => setSide(!isFront)}>{props.topGame.weight} lbs </Card>
            }
            if(props.topGame.footsize !== undefined){
            return <Card id="userBackCard"  onClick={() => setSide(!isFront)}>{props.topGame.weight} lbs with {props.topGame.footsize} inch long feet! <Card>{props.topGame.comments}</Card></Card>
            }
        }

        if(isInEditor === true){
            return (
            <Grid>
            <Card style={{height: "300px", width: "300px"}}>
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
          
                <TextField
                        label="comment"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="comment"
                        onChange={onChangeComment}
                        
                    />
                </ThemeProvider>
              
            </form>
            </Card>
            <div>  <input type="submit" value="Submit" style={{marginRight: "1rem", marginTop: "1rem"}} onClick={() => handleSubmit(props.topGame.id)} />
                              <a id="notRegistered" href='#' onClick={() => setToEditor(false)}> Back </a>
              </div>
           
           
            </Grid>
            )
        }
    }



    return (
        <Grid>
            <Grid >
            {isFront ? <Card style={{height: "auto", width: "95%", background: "content-box", marginRight: "10%"}}>
                             <img src={"http://127.0.0.1:8000"+props.topGame.image} alt="photo of your ducks" onClick={() => setSide(!isFront)} style={{width: "75%", height: "75%", maxHeight: "400px", maxWidth: "400px", marginTop: "1rem" }} />
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