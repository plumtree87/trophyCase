
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import Login from './Login/login';
import Register from './Login/register';
import TopDisplayCase from './Trophies/topTrophies';
import LoggedInView from './LoggedInView/loggedInView';
//import { BrowserRouter, Route, Switch } from "react-router-dom";



class App extends Component {
    state = { 
        component: '',
        users: [],
        currentUser: '',
        isOpen: false,
        ducks: [],
        bucks: [],
        bass: [],
        bigMama: [],
        bigRackLittleBuck: [],
        bigFoot: [],
        topBucks: [],
        topDucks: [],
        topBass: [],
        user: {},
        status: '',
        jwt: 0,
        usersBucks: [],
        usersDucks: [],
        usersBass: [],
        currentUser: '',
        profileView: false,





    }
    componentDidMount(){
 
            this.getTopDucks();
            this.getTopBass();
            this.getTopBucks();
           
     
        
    }




    getToken(){
        const jwt = localStorage.getItem('token');
      
        if(jwt){
      
        }
        else{
            console.log(jwt, "JWT NOT WORKING")
        }
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>    all axios requests and their pertaining functinos between these comments    <<<<<<<<<<<<<<<<<   ///
    //  {headers: {Authorization: 'Bearer ' + this.state.jwt}}

    sortWeightDescending(data){
        console.log(data)
        let sorted = data.sort(function(a, b){return b.weight-a.weight});
        console.log(sorted, "sorted descending")
   
        return sorted;
    }
    sortWeightAscending(data){

        let sorted = data.sort(function(a, b){return a.weight-b.weight});
        console.log(sorted, "sorted ascending")
        return sorted;
    }

    // USER            USER             USER            USER            USER
    async getUser(e){

        let response = await axios.get('http://127.0.0.1:8000/api/profile/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
 
        console.log(response.data, "response.data from getUser()" )
        this.setState({
            currentUser: response.data.data[0].user_id
        })


       
    }

    async loginUser(data){
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/signin', data)
            this.setState({
                status: response.status,
                jwt: response.data.token,

                
            })
            this.getUser();
            this.getUsersDucks();
            this.getUsersBucks();
            this.getUsersBass();
                
        }
        catch {
            this.setState({
                status: "not 200 OK"
            })
            alert("Check your account name or password. One of them is wrong. Email @me if you got any more issues [will make a better option than this in futre]")
        }
    }

    async registerUser(data){
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/signup', data)
          
            return 'ok'
        }
        catch{
            
            alert("Either this email is already taken, or the phone number you chose has already been used to create an account.")
        }
   
    }
    //DUCKS       DUCKS         DUCKS       DUCKS       DUCKS          DUCKS 

    sortByFootSize(data){
     
        if(data.length < 2){
        
            return data
        }
        let bigFoot = data.sort(function(a, b){return b.footsize-a.footsize});
     
        return [bigFoot[0]]
     
    }

    async getTopDucks(){
  
        let response = await axios.get('http://127.0.0.1:8000/api/ducks/')
        this.setState({
            ducks: response.data
        })
       
        let descendingOrder = this.sortWeightDescending(response.data)

        //descendingOrder.length=5;            // set to 5 for testing, ultimately will set to show top 100.
        this.setState({
            topDucks: descendingOrder
        })
        let setBigFoot = this.sortByFootSize(response.data)
        
        this.setState({
            bigFoot: setBigFoot
        })
     
     


    }


    async postDucks(data){
   
        let response = await axios.post('http://127.0.0.1:8000/api/ducks/', data,  {headers: {Authorization: 'Bearer ' + this.state.jwt, 'Content-Type': 'multipart/form-data'}} )
        console.log(response)
       
        this.getUsersDucks();

    }

    async getUsersDucks(){
        let response = await axios.get('http://127.0.0.1:8000/api/usersDucks/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.setState({
            usersDucks: response.data
        })

    }



    async putDuck(data, pk){
    
        let response = await axios.put(`http://127.0.0.1:8000/api/usersDucks/${pk}`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt, 'Content-Type': 'multipart/form-data'}})
        this.getUsersDucks();
    }

 
    async getAnotherProfileDucks(data){
     
        let profileDucks = this.state.ducks.filter(ducks => ducks.user === data)
       
        await this.setState({
            topDucks: profileDucks
        }, console.log(this.state.topDucks, "inside setstate of ducks function after setting state?"))
        
       
    }


    // BUCKS           BUCKS            BUCKS              BUCKS                 BUCKS              BUCKS     

    sortByRackPoints(data){
        let max = data[0];
        for(let i = 0; i < data.length; i++){
            if(data[i].rackpoints > max){
                
                max = data[i];
            }
        }
   
        return max
    }

    async getTopBucks(){
   
        let response = await axios.get('http://127.0.0.1:8000/api/bucks/')
        console.log(response.data) // here as well as line 268 both come in with weight in ascending order, some how? from axios request? in my admin they're not in that order.
        this.setState({
            bucks: response.data
        })
    
        
        let descendingOrder = this.sortWeightDescendingBucks(response.data)
        console.log(descendingOrder, 'descending order')
        
      
    
        //descendingOrder.length=5;            // set to 5 for testing, ultimately will set to show top 100.
        this.setState({
            topBucks: descendingOrder
        })
        let ascendingOrder = this.sortWeightAscending(response.data)
  
        
        let bigRack = this.sortByRackPoints(ascendingOrder)
        this.setState({
            bigRackLittleBuck: [bigRack]
        })
       


       


    }

    returnData(data){
        console.log(data)
        return data
    }

    // sortWeightDescending function was working for ducks, and bass, but not for bucks. It makes absolutely no sense to me why..
    // spent WAY too much time on this. Logically still it makes NO SENSE TO ME AT ALL, that this function doing a for loop some how returns
    // the bucks in descending order... makes no sense.  Otherwise, it always returns them ascending. I can't understand it.
    // some how this works, but it shouldn't?
    // makes no sense... no sense....
    // if someone can explain to me, why the heck sorted is returning them in ascending order, and why this stupid forloop is putting them in
    // descending order, please explain.
    sortWeightDescendingBucks(data){
        console.log(data) // here the data console.logs as weight in ascending order, and I dont know why or how, because that's not the order of the bucks.
        let bucks = []
        let sorted = data.sort(function(a, b){return b.weight-a.weight}); // this function is a copy paste from line 68 which was putting the bass/ducks in descending order, 
        //but didn't work on bucks some reason? I didnt understand why, it kept returning the in ascending order, yet returned ducks and bass in descending.

        for(let i = 0; i < data.length; i++){
            console.log(data[i].weight)
            bucks.push(data[i])
        }                                  // Here on this forloop, i'm looping through data which on line 268 is in ascending order. Yet, when I push it to this bucks =[]
        // some how it comes back as DESCENDING ORDER!?  makes no freaking sense...
        console.log(sorted) // this is weight in ascending order.
        console.log(bucks) // this has them in descending order!?
        this.setState({
            topBucks: bucks    // right here, I just said *shrug* whatever... and descending to use the one that was doing what it is not suppose to do, but is...
        })

        return bucks   // yea makes no sense at all..
    }

    async postBucks(data){
        
        
        let response = await axios.post(`http://127.0.0.1:8000/api/bucks/`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt, 'Content-Type': 'multipart/form-data'}} )
        console.log(response)
        this.getUsersBucks();
    }
    
    async putBuck(data, pk){
    
        let response = await axios.put(`http://127.0.0.1:8000/api/bucks/${pk}`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt, 'Content-Type': 'multipart/form-data'}})
        this.getUsersBucks();
    }

    async getUsersBucks(){
        
        let response = await axios.get('http://127.0.0.1:8000/api/usersBucks/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.setState({
            usersBucks: response.data
        })
        console.log(response.data)
    }

    async getAnotherProfileBucks(data){
        console.log(this.state.topBass, "did this.topBass setState work from previous function before this one? Should have only 1 person.")
        let profileBucks = this.state.bucks.filter(bucks => bucks.user === data)
        await this.setState({
            topBucks: profileBucks
        }, await this.getAnotherProfileDucks(data))
    
      
    }

    // BASS         BASS                BASS                    BASS                    BASS                   BASS
    checkPregnant(data){
        
        let bigMamas = data.filter(mama => {
         
            if(mama.isPregnant === true){
            
                return mama
        }})
       
        return bigMamas
    }

    
    async getTopBass(){
     
        let response = await axios.get('http://127.0.0.1:8000/api/fish/')

        this.setState({
            bass: response.data
        })
        let descendingOrder = this.sortWeightDescending(response.data)
        //descendingOrder.length=5;            // set to 5 for testing, ultimately will set to show top 100.
        this.setState({
            topBass: descendingOrder
        })
    
        let bigMamas = this.checkPregnant(response.data)
       
        let biggestMama = this.sortWeightDescending(bigMamas)
    
        biggestMama.length=1;
     
        this.setState({
           bigMama: biggestMama
        })
       
       
       


    }



    async postBass(data){
 
        let response = await axios.post('http://127.0.0.1:8000/fish/', data,  {headers: {Authorization: 'Bearer ' + this.state.jwt, 'Content-Type': 'multipart/form-data'}} )
        console.log(response)
        this.getUsersBass();
  
    }

    async getUsersBass(){
        let response = await axios.get('http://127.0.0.1:8000/api/usersBass/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.setState({
            usersBass: response.data
        })
    }

    async putBass(data, pk){
    
        let response = await axios.put(`http://127.0.0.1:8000/api/usersBass/${pk}`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt, 'Content-Type': 'multipart/form-data'}})
        this.getUsersBass();
    }


    async getAnotherProfileBass(data){
        console.log(this.state.profileView, "profileView is set to True?")
        let profileBass = this.state.bass.filter(bass => bass.user === data)
        await this.setState({
            topBass: profileBass
        }, await this.getAnotherProfileBucks(data))
      
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<    all axios requests and ther pertaining functions between these comments < UP FROM HERE  >>>>>>>>>>>>>>>>>/// 


 /// displayWindow() //  also close window ///


    displayLoginWindow(e){
        if (this.state.component === 'login'){
            return <Login 
            loginUser={(data) => this.loginUser(data)}
            registerUser={(data) => this.registerUser(data)}
             />
                        

                   
        }
        if (this.state.component === 'register'){
            return <Register />
        }
    }

 /// END OF displayWindow() /// close window //

 

    displayLoggedInDependancyView() {
        if(this.state.jwt !== 0){
            
         

            return    <Grid>   
                <LoggedInView 
                    jwt={this.state.jwt}
                    usersBucks={this.state.usersBucks}
                    usersDucks={this.state.usersDucks}
                    usersBass={this.state.usersBass}
                    putBuck={(data, id) => this.putBuck(data, id)}
                    putBass={(data, id) => this.putBass(data, id)}
                    putDuck={(data, id) => this.putDuck(data, id)}
                    postDuck={(data) => this.postDucks(data)}
                    postBuck={(data) => this.postBucks(data)}
                    postBass={(data) => this.postBucks(data)}
                    user={this.state.currentUser}

                 /> 
                 <input type='button' style={{marginTop: "10%"}}onClick={() => this.handlePayment()} value='click here to pay your yearly subscription' ></input>
            </Grid>

    
        }
        if(this.state.jwt === 0){
            return          <Grid>     <div style={{marginBottom: "-5rem", textAlign: "initial"}}><button style={{fontSize: "3vw", color: "white", backgroundColor: "green"}} onClick={() => this.state.isOpen ? this.setState({component: 'login', isOpen: !this.state.isOpen}) : this.setState({component: '', isOpen: !this.state.isOpen})}> login </button></div>
            <Grid id="mainScreen">
           
              {this.displayLoginWindow()}
 
            </Grid>    
           <Grid>
            <TopDisplayCase
            trophyDucks = {this.state.topDucks}
            trophyBucks = {this.state.topBucks}
            trophyBass = {this.state.topBass}
            trophyMama = {this.state.bigMama}
            trophyLittleBigFoot = {this.state.bigFoot}
            trophyBigRack = {this.state.bigRackLittleBuck}
            displayProfileView = {(data) => this.displayProfileView(data)}
            leaveProfileView = {() => this.exitProfileView()}
            /> 


               
                <p id="intro" style={{color: "white", overflowY: "scroll", height: "300px", fontSize: "4vw"}}>

                This is a community powered website. Paying out yearly rewards to the hunters who catch the best game isn't possible, without your yearly subscriptions.
                You can view and access the website without subscribing, but you cannot recieve the rewards at end of the year if you win the game, unless you are subscribed.
                100% of all money that comes from the yearly subscription is paid out to winners. Consider it buying your friend a drink, in congratulations to his trophy.
                
                </p>
            
           </Grid>
        </Grid> 
    
        }
    }

 

    async exitProfileView(){
        console.log("exitProfileView() in game.jsx line 433 has been hit, should be running 3 functions.")
        
        this.setState({
            profileView: false
        }, this.componentDidMount())
   
    }
    // You will notice following the path of this function I have a lot of 'await' and it's because my state wasn't changing like it should.
    // Well, i finally got it working, and I dont have time to go back and see if these awaits are really necessary, at this time...
    // it works, and i got a lot of other things to work on. Over 90% positive they're not necessary though, lol.. after I learned about
    // setState({key:value}, runAnotherFunctionAfterSettingState())  trick.
    async displayProfileView(data){
     
        console.log(this.state.profileView)

        await this.setState({
            profileView: !this.state.profileView
        }, await this.getAnotherProfileBass(data))

    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    handlePayment() {
        // do something meaningful, Promises, if/else, whatever, and then
        window.open('https://buy.stripe.com/test_bIYdR7fFXcGR0CI9AB', '_blank');
     }

    

 /// want to put the <p? into an accordian so it takes up less space. 
    render() { 
        return (
 

           <Grid id="backgroundDiv">
            <Grid>
            {this.displayLoggedInDependancyView()}
            
            </Grid>
            
             </Grid>
  

         );
    }




}
 
export default App;