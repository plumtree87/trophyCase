import React, {Component} from 'react';
import { Grid, Form, TextField, ThemeProvider } from '@material-ui/core';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            profile: {
                first_name: '',
                last_name: '',
                phone_number: '',
                age: 0,
                gender: 'M',
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   
    }


    handleChange(event) {
    
        this.setState({
            [event.target.name]: event.target.value
        });
       
    }

 

    handleNestedChange = (e , object , type) => {
        const profile = this.state.profile;
        var key = e.target.name;
        var value = e.target.value;
    
        object[key] = value;
        if(type === 'first_name'){
            profile.attributes.first_name = object;
        } else if (type === 'last_name'){
            profile.attributes.first_name = object;
        } else if (type === 'phone_number') {
            profile.attributes.phone_number = object;
        }
        this.setState({
          profile : profile
        });
      
    }

    async getResponse(user){
        let response = await this.props.registerUser(user)
   
        if(response === 'ok'){
            alert("Successfully Registered. Go ahead and login!")
            this.props.register();
        }
        
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = {
            password: this.state.password,
            email: this.state.email,
            profile: this.state.profile

        }
   
        this.getResponse(user);
        
        
        this.setState({
            profile: {
                first_name: '',
                last_name: '',
                phone_number: '',
                age: 0,
                gender: 'M',
            },
            password: '',
            email: '',


        });
       
    }
    //  <input type='text' name="title" value={this.state.title} onChange={this.handleChange} />

    render(){
        return (
            <Grid style={{backgroundColor: "gold", width: "250px"}}>
            <form onSubmit={this.handleSubmit}>
                <ThemeProvider>
                <TextField
                        label="email"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        //type="email"
                        onChange={this.handleChange}
                        name="email"
                        value={this.state.email}
                        required
                    />

                <TextField
                        label="Password"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="password"
                        value={this.state.password}
                        //type="password"
                        required
                    />

                <TextField
                        label="First Name"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        type="text"
                        name="first_name"
                        value={this.state.profile.first_name}
                        onChange={event => { this.handleNestedChange(event, this.state.profile ,'profile'); }}
                        required
                
                    /> 
                 <TextField
                        label="Last Name"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        type="text"
                        onChange={event => { this.handleNestedChange(event, this.state.profile ,'profile'); }}
                        name="last_name"
                        value={this.state.profile.last_name}
                        required
                
                    /> 
                 <TextField
                        label="Phone Number"
                        variant="outlined"
                        type="text"
                        id="mui-theme-provider-outlined-input"
                        onChange={event => { this.handleNestedChange(event, this.state.profile ,'profile'); }}
                        name="phone_number"
                        value={this.state.profile.phone_number}
                        required
                
                    /> 
                
                </ThemeProvider>
                <div><input type="submit" value="register"/></div>
            </form>
            </Grid>
            
        );
    }

}
export default Register;