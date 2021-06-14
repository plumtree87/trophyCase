
import React, { useEffect, useState } from 'react'
import { Card, Grid, ButtonProps, TextField, ThemeProvider, Form, FormControlLabel, Checkbox, Menu, MenuItem, Button} from '@material-ui/core';
import { findByPlaceholderText } from '@testing-library/dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

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
    
        const file = event.target.files[0];

        try {
            if (file.size > 1024){
                console.log("File.size > 1024: (not that it really matters..) attempting to setGame image: value")
                setGame({
                    ...game, image: event.target.files[0]
                })
            //alert("Sorry I can't figure out how to get this dang thing to work. Please dont upload image for now. Open file uploader again, and press cancel to remove.");
            }
            else  setGame({
                ...game, image: event.target.files[0]
            })  
       }catch {
           alert("thank you")
       }

       
    }

    const documentChangeHandler=(event)=>{
       
        setGame({
            ...game, documents: event.target.files[0]
        })
    }

 

    const onChangeWeight = (e) => {
        setGame({
            ...game, weight: e.target.value
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
            return  <TextField
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
        
        if(type === 'duck'){
            var formdata = new FormData()
            formdata.append('image', game.image)
            formdata.append('weight', game.weight)
            //formdata.append('comment', game.comment)
            formdata.append('user', game.user)
            formdata.append('footsize', game.specialAttribute)
            formdata.append('video_id', game.video_id)
            formdata.append('address', game.location)
            formdata.append('documents', game.documents)
            props.postDuck(formdata)
        }
        if(type === 'buck'){
            var formdata = new FormData()
            formdata.append('image', game.image)
            formdata.append('weight', game.weight)
            //formdata.append('comment', game.comment)
            formdata.append('user', game.user)
            formdata.append('rackpoints', game.specialAttribute)
            formdata.append('video_id', game.video_id)
            formdata.append('address', game.location)
            formdata.append('documents', game.documents)
            props.postBuck(formdata)

        }
        if(type === 'bass'){
            var formdata = new FormData()
            formdata.append('image', game.image)
            formdata.append('weight', game.weight)
            //formdata.append('comment', game.comment)
            formdata.append('user', game.user)
            formdata.append('isPregnant', game.specialAttribute)
            formdata.append('video_id', game.video_id)
            formdata.append('address', game.location)
            formdata.append('documents', game.documents)
            props.postBass(formdata)
        }

    }

    function getVideoID(){
        let vidId = game.video_id.split("=")
        let shareId = game.video_id.split("be/")
   
        if(vidId[1] !== undefined){
            return vidId[1]
        }
        if(shareId[1] !== undefined){
            return shareId[1]
        }
        else {
         
            return game.video_id
        }
        
    }

    const duckData = {
        weight: game.weight,
        footsize: game.specialAttribute,
        comments: game.comments,
        image: game.image,
        user: game.user,
        prize: 0,
        video_id: getVideoID(),
        location: game.location,
        

    } 

    const buckData = {
        weight: game.weight,
        rackpoints: game.specialAttribute,
        comments: game.comments,
        image: game.image,
        user: game.user,
        prize: 0,
        video_id: getVideoID(),
        location: game.location,
      

    }

    const bassData = {
        weight: game.weight,
        rackpoints: game.specialAttribute,
        comments: game.comments,
        image: game.image,
        user: game.user,
        prize: 0,
        video_id: getVideoID(),
        location: game.location
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
                    {/* <TextField
                        label="comment"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="comment"
                        onChange={onChangeComment}
                        
                    /> */}
                     <TextField
                        label="youtube video link"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="video_id"
                        onChange={onChangeVideoId}
                        
                    />
                     <TextField
                        label="location; ex.  Chickasha, OK"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        name="location"
                        onChange={onChangeLocation}
                        
                    />
                    {gameTypeDependantDisplay()}
                </ThemeProvider>
         

                
               
              <div>  <input type="file" name="file" accept="image/" onChange={fileChangeHandler}/> <AddPhotoAlternateOutlinedIcon />
                </div>  

                <input type="file" name="document" onChange={documentChangeHandler}/>   <NoteAddOutlinedIcon />
    
              
            </form>
            <div>  <input type="submit" value="Submit" style={{marginRight: "1rem", marginTop: "1rem"}} onClick={handleSubmit} />
              </div>
              <p style={{fontSize: "2vh"}}> Copy the Youtube video's web address / url from the browser and paste it here. Or, the share copy/link.
                </p>
        
        </Grid>
    );
}

export default RegisterTrophy;