import React, { useEffect, useState } from 'react'
import { Grid, Form, TextField, ThemeProvider } from '@material-ui/core';
import Register from './register'



const Login = (props) => {

   const [userName, setUserName] = useState('');
   const [passWord, setPassWord] = useState('');
   const [register, setRegister] = useState(false); // this decides which form to dispay, register true? false is login form. 
   const [isOpen, setIsOpen] = useState(true)

   useEffect(() =>{
       console.log('Use Effect running')
      
   });

   /// form handlers between these comments below///

   const [user, setUser] = useState({
       username: '',
       email: '',
       password: '',
   });

   async function handleSubmit(event){
       event.preventDefault();
    const data = {
        username: user.username,
        email: user.email,
        password: user.password,
    }

}
   /// above is form handlers and everything related to it. //////   

   function switchFromLoginToRegister(){
        if (register === false){
            if(isOpen === true){
            return (       <Grid>
            
                <form>
            
                    <ThemeProvider>
                        <TextField
                            label="User Name"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            name="username"
                        />
                                    <TextField
                            label="Password"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            name="username"
                        />
                    </ThemeProvider>
        
                </form>
                <div>  <input type="submit" value="Submit" style={{marginRight: "1rem", marginTop: "1rem"}} /><a id="notRegistered" href='#' onClick={() => setRegister(!register)}> Not Registered?</a>
                  </div>
               
               
                </Grid>
        )
        }}
        if (register === true){
            return <Register registerUser={props.registerUser.bind(this)} />
        }
   };


    return (
        <Grid>
        {switchFromLoginToRegister()}
        </Grid>
    
  

    );
}

export default Login;

