
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import Login from './Login/login';
import Register from './Login/register';



class App extends Component {
    state = { 
        component: '',
        users: [],
        currentUser: '',

    }
    componentDidMount(){
        this.getUsers();
        
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>    all axios requests between these comments    <<<<<<<<<<<<<<<<<   ///
    async getUsers(e){
        let response = await axios.get('http://127.0.0.1:8000/user/')
        this.setState({
            users: response.data
        })
        console.log(response.data)
    }

    async postUser(data){
        console.log(data)
        let response = await axios.post('http://127.0.0.1:8000/user/', data)
        console.log(response.data)
    }

    


    
    // <<<<<<<<<<<<<<<<<<<<<<<<<    all axios requests between these comments   >>>>>>>>>>>>>>>>>/// 


 /// displayWindow() //

    displayWindow(e){
        if (this.state.component == 'login'){
            return <Login registerUser={this.postUser.bind(this)}
                        

                    />
        }
        if (this.state.component == 'register'){
            return <Register registerUser={this.postUser.bind(this)} />
        }
    }

 /// END OF displayWindow() ///
    
    render() { 
        return (
            <div>
            <div><button onClick={() => this.setState({component: 'login'})}> login </button></div>
           <Grid id="mainScreen" >
          
             {this.displayWindow()}
           </Grid>
           </div>

         );
    }
}
 
export default App;