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

    handleNestedChange(event) {
        //use split function to create hierarchy. example:
        //selectedCreditCard.creditCardNumber -> [selectedCreditCard , creditCardNumber]
        const obj = this.generate(
          event.target.name.split("."),
          event.target.value,
          0
        );
        
        this.setState({ ...obj });
        console.log(obj)
        this.props.registerUser(obj);
      }


    handleSubmit(event) {
        event.preventDefault();
        const user = {
            password: this.state.password,
            email: this.state.email,
            phone_number: this.state.phone_number,
            profile: {
                first_name: this.state.profile.first_name,
                last_name: this.state.profile.last_name,
                phone_number: this.state.profile.phone_number,
            }

            }
            console.log(user, "test 1");
        //     this.props.registerUser(user);
        //     console.log(user, "test 2")
        //     this.setState({
        //         profile: {
        //             first_name: '',
        //             last_name: '',
        //             phone_number: '',
        //             age: 0,
        //             gender: 'M',
        //         },
        //         password: '',
        //         email: '',


        // });
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
                        label="Password"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="password"
                        value={this.state.password}
                        type="password"
                        required
                    />]

                <TextField
                        label="First Name"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="profile.first_name"
                        value={this.state.profile && this.state.profile.first_name ? this.state.profile.first_name : null}
                        required
                
                    /> 
                 <TextField
                        label="Last Name"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="profile.last_name"
                        value={this.state.profile && this.state.profile.last_name ? this.state.profile.last_name : null}
                        required
                
                    /> 
                 <TextField
                        label="Phone Number"
                        variant="outlined"
                        id="mui-theme-provider-outlined-input"
                        onChange={this.handleChange}
                        name="profile.phone_number"
                        value={this.state.profile && this.state.profile.phone_number ? this.state.profile.phone_number : null}
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