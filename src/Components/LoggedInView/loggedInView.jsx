import React, { useEffect, useState } from 'react'
import { Grid, Form, TextField, ThemeProvider } from '@material-ui/core';




const LoggedInView = (props) => {

   const [userName, setUserName] = useState('');

   useEffect(() =>{
       console.log('Use Effect running')
      
   });

   /// form handlers between these comments below///

   const [user, setUser] = useState({
       email: '',
       password: '',
   });

    return (
        <Grid style={{height: "auto", width: "100%"}}>
        <button > Register Trophy</button>
        </Grid>
    
  

    );
}

export default LoggedInView;
