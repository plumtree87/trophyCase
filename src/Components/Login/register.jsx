import React, {Component} from 'react';
import { Grid, Form, TextField, ThemeProvider } from '@material-ui/core';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,

            }
            this.props.registerUser(user);
            console.log(user)
            this.setState({
                username: '',
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
                        type="email"
                        onChange={this.handleChange}
                        name="email"
                        value={this.state.email}
                        required
                    />
                    <TextField
                        label="User Name"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="username"
                        value={this.state.username}
                        required
                
                    />
                <TextField
                        label="Password"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="password"
                        value={this.state.password}
                        type="password"
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