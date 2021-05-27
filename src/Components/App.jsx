
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import Login from './Login/login';
import Register from './Login/register';
import TopDisplayCase from './Trophies/topTrophies'



class App extends Component {
    state = { 
        component: '',
        users: [],
        currentUser: '',
        isOpen: false,


    }
    componentDidMount(){
        this.getUsers();
        console.log(this.state.isOpen)
        
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


 /// displayWindow() //  also close window ///


    displayWindow(e){
        if (this.state.component == 'login'){
            return <Login registerUser={this.postUser.bind(this)} />
                        

                   
        }
        if (this.state.component == 'register'){
            return <Register  />
        }
    }

 /// END OF displayWindow() /// close window also.. //
    
    render() { 
        return (
            <div>
            <div><button onClick={() => this.state.isOpen ? this.setState({component: 'login', isOpen: !this.state.isOpen}) : this.setState({component: '', isOpen: !this.state.isOpen})}> login </button></div>
           <Grid id="mainScreen" >
          
             {this.displayWindow()}

           </Grid>
           <Grid id="test">
                <TopDisplayCase />
             </Grid>
           </div>

         );
    }
}
 
export default App;