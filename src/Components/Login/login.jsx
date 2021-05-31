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
       email: '',
       password: '',
   });

   async function handleSubmit(event){
     
    
       event.preventDefault();
        const data = {
        email: user.email,
        password: user.password,
        }

        props.loginUser(user)
    }
    
    const onChangeEmail = (e) => {
        setUser({
          ...user, email: e.target.value
        })
    }

    const onChangePassword = (e) => {
        setUser({
          ...user, password: e.target.value
        })
    }
    
    
   


   /// above is form handlers and everything related to it. //////   

   function switchFromLoginToRegister(){
        if (register === false){
            if(isOpen === true){
            return (       <Grid style={{backgroundColor: "gold", width: "250px"}}>
            
                <form >
            
                    <ThemeProvider >
                        <TextField
                            label="email"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            name="email"
                            onChange={onChangeEmail}
                            
                        />
                        <TextField
                            label="password"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            name="password"
                            onChange={onChangePassword}
                            
                        />
                    </ThemeProvider>
                  
                </form>
                <div>  <input type="submit" value="Submit" style={{marginRight: "1rem", marginTop: "1rem"}} onClick={handleSubmit} /><a id="notRegistered" href='#' onClick={() => setRegister(!register)}> Not Registered?</a>
                  </div>
               
               
                </Grid>
        )
        }}
        if (register === true){
            return <Register registerUser={props.registerUser} />
        }
   };


    return (
        <Grid>
        {switchFromLoginToRegister()}
        </Grid>
    
  

    );
}

export default Login;

