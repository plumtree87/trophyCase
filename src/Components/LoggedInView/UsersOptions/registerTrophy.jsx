
import React, { useEffect, useState } from 'react'
import { Card, Grid, ButtonProps, TextField, ThemeProvider, Form, FormControlLabel, Checkbox, Menu, MenuItem, Button} from '@material-ui/core';
import { findByPlaceholderText } from '@testing-library/dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

const RegisterTrophy = (props) => {

    const [type, setType] = useState('dropdown')
    const [isPregnant, setIsPregnant] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [game, setGame] = useState({
        specialAttribute: '',
        weight: 0,
        comments: '',
        image: null,
        user: props.user,
        prize: 0,
        video_id: '',

    })

    useEffect(()=> {
        console.log('Use Effect running')
    })

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fileChangeHandler=(event)=>{

        console.log(event.target.files[0])
        console.log("does this work?", event.target.files[0])
        const file = event.target.files[0];
        try {
            if (file.size > 1024)
            alert("Sorry I can't figure out how to get this dang thing to work. Please dont upload image for now. Open file uploader again, and press cancel to remove.");
            else  setGame({
                ...game, image: event.target.files[0]
            })  
       }catch {
           alert("thank you")
       }

       


       
    }
   

    const onChangeWeight = (e) => {
        setGame({
            ...game, weight: e.target.value
        })
       
    }   
    const onChangeVideoId = (e) => {
        setGame({
            ...game, video_id: e.target.value
        })
        
    }
    const onChangeSpecialAttribute = (e) => {
        setGame({
            ...game, specialAttribute: e.target.value
        })
    }
    const onChangeComment =(e) => {
   
        setGame({
        ...game, comments: e.target.value
        })
    }
    const handleIsPregnant = (e) => {
        const { checked } = e.target

        setIsPregnant({
          isPregnant: checked
        })
        setGame({
            ...game, specialAttribute: isPregnant
        })
    }
    
    function gameTypeDependantDisplay(){
        if(type === 'duck'){
            return <TextField
            label="footsize"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            name="footsize"
            onChange={onChangeSpecialAttribute}
            />
        }
        if(type === 'bass'){
            return <FormControlLabel
            style={{marginLeft: "1rem"}}
            value="isPregnant"
            control={<Checkbox color="primary"   onChange={e => handleIsPregnant(e)} />}
            label="is big Moma?"
            labelPlacement="end"
            defaultChecked={isPregnant}
            />
        }
        if(type === 'buck'){
            return         <TextField
            label="rackpoints"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            name="rackpoints"
            onChange={onChangeSpecialAttribute}
            /> 
        }
    }



    async function handleSubmit(event){

        event.preventDefault();
        
       
        console.log(duckData, "DUCK DATA HERE INSIDE HANDLE SUBMIT")
        if(type === 'duck'){
            console.log(duckData.image.file)
            props.postDuck(duckData)
        }
        if(type === 'buck'){
            props.postBuck(buckData)
        }
        if(type === 'bass'){
            props.postBass(bassData)
        }

    }

    const duckData = {
        weight: game.weight,
        footsize: game.specialAttribute,
        comments: game.comments,
        image: game.image,
        user: game.user,
        prize: 0,
        video_id: game.video_id,

    } 

    const buckData = {
        weight: game.weight,
        rackpoints: game.specialAttribute,
        comments: game.comments,
        image: game.image,
        user: game.user,
        prize: 0,
        video_id: game.video_id,

    }

    const bassData = {
        weight: game.weight,
        rackpoints: game.specialAttribute,
        comments: game.comments,
        image: game.image,
        user: game.user,
        prize: 0,
        video_id: game.video_id,
    }


    return (

         <Grid id='registerForm' style={{textAlign: "-webkit-center"}}>
            
            <form >
                 <Button style={{marginBottom: "1.5rem", width: "75%"}}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}>


                    {type} <ArrowDropDownCircleIcon />
                    </Button>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={() => setType('duck')}>Duck</MenuItem>
                    <MenuItem onClick={() => setType('buck')}>Buck</MenuItem>
                    <MenuItem onClick={() => setType('bass')}>Bass</MenuItem>
                    </Menu>

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
                     <TextField
                        label="youtube video id "
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="video_id"
                        onChange={onChangeVideoId}
                        
                    />
                    {gameTypeDependantDisplay()}
                </ThemeProvider>
         

                
               
              
                <input type="file" name="file" onChange={fileChangeHandler}/>
    
              
            </form>
            <div>  <input type="submit" value="Submit" style={{marginRight: "1rem", marginTop: "1rem"}} onClick={handleSubmit} />
              </div>
              <p style={{fontSize: "2vh"}}> Example, https://www.youtube.com/watch?v=KQPs_1Ag29w  <br></br>
                 everything after ?v=COPY  and paste into video id.
                </p>
        
        </Grid>
    );
}

export default RegisterTrophy;