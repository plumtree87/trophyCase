
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import Login from './Login/login';
import Register from './Login/register';
import TopDisplayCase from './Trophies/topTrophies'
import LoggedInView from './LoggedInView/loggedInView'



class App extends Component {
    state = { 
        component: '',
        users: [],
        currentUser: '',
        isOpen: false,
        ducks: [],
        bucks: [],
        deer: [],
        bigMama: [],
        bigRackLittleBuck: [],
        bigFoot: [],
        topBucks: [],
        topDucks: [],
        topDeer: [],
        user: {},
        status: '',
        jwt: 0,
        usersBucks: [],
        usersDucks: [],
        usersBass: [],
        currentUser: '',




    }
    componentDidMount(){
        
           this.getTopDucks();

        
           this.getTopBass();
           this.getTopBucks();
           //

        
       

        
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
  
        let sorted = data.sort(function(a, b){return b.weight-a.weight});
   
        return sorted;
    }
    sortWeightAscending(data){

        let sorted = data.sort(function(a, b){return a.weight-b.weight});
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
        console.log(data, "POST DUCKS DATA")
        let response = await axios.post('http://127.0.0.1:8000/api/ducks/', data, {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        console.log(response, "postDucks, repsonse")
        this.getUsersDucks();

    }

    async getUsersDucks(){
        let response = await axios.get('http://127.0.0.1:8000/api/usersDucks/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.setState({
            usersDucks: response.data
        })

    }

    async putDuck(data, pk){
    
        let response = await axios.put(`http://127.0.0.1:8000/api/usersDucks/${pk}`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.getUsersDucks();
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

        this.setState({
            bucks: response.data
        })
        let descendingOrder = this.sortWeightDescending(response.data)
        let dOrder = this.sortWeightDescending(this.state.bucks)
    
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


    async postBucks(data){
    
        let response = await axios.post(`http://127.0.0.1:8000/api/bucks/`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt}} )
     
    }
    
    async putBuck(data, pk){
    
        let response = await axios.put(`http://127.0.0.1:8000/api/bucks/${pk}`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.getUsersBucks();
    }

    async getUsersBucks(){
        let response = await axios.get('http://127.0.0.1:8000/api/usersBucks/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.setState({
            usersBucks: response.data
        })
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
 
        let response = await axios.post('http://127.0.0.1:8000/bass/', data, {headers: {Authorization: 'Bearer ' + this.state.jwt}})
  
    }

    async getUsersBass(){
        let response = await axios.get('http://127.0.0.1:8000/api/usersBass/', {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.setState({
            usersBass: response.data
        })
    }

    async putBass(data, pk){
    
        let response = await axios.put(`http://127.0.0.1:8000/api/usersBass/${pk}`, data,  {headers: {Authorization: 'Bearer ' + this.state.jwt}})
        this.getUsersBass();
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
            />
       
            
                <p id="intro" style={{color: "white", overflowY: "scroll", height: "300px", fontSize: "4vw"}}>This application is community driven. Without you, the reward systems are not possible. Just like people pay to go to an Oprah TV show, and had a chance to win a car.
                You have a chance to win $$$ by displaying your game trophies on this website show. The monthly subscription allows you access to participate in those rewards. 
                The more people who use this app, the greater the rewards possible. You're paying for the service to display your trophies, the rewards are just a bonus.
                If you're the kind of guy who would buy a scratch to win card at the gas station, and the type to hunt. There's a lot of similarities between this and gambling.
                You pay for the subscription, and you have a chance each season to win $$ based on the size of the pool, which is proportionate to the number of users willing to subscribe.
                Yes, this sounds like gambling, but no it isn't. You're paying to display your trophies on the website. This is like Oprah... You have a chance to win a new car. If you pay
                for a ticket at my show. I make this loophole, for the convictions against gambling. If you look at it in the right light, technically, you're paying for a service, image hosting,
                plus the hours it took me to build this, and the hours it will take me updating it. You're paying for the entertainment to show off your trophies.
                 Thanks for subscribing! Good luck winning the rewards! Do you work for free at your job? Neither do I. So, technically, if you pay for the service, then 
                all the money is mine to do with it as I please. If i want to give it away to people who kill the biggest buck on this website, it's mine to do with as I please. 
                So, are you going to judge me for being generous? Also, 100% of all subscriptions paid are put into the pool. I make absolutely no profit from your subscriptions themselves. 
                I actually invest the money for the year, earn interest, and withdraw the funds at the end of each year to pay out the full amount earned from subscriptions. I profit from interest.
                 So, it's a win win for everyone. Also, I'm going to post a vote, allowing the community to vote. If you trust me to invest
                in crypto currency, USDT and USDC with yall's subcription. I can do that, and not only pay out the full amount recieved, but also interest. So, We can do basically anything
                on here that the community votes to do. Probably people like "Crypto? doesn't that go up and down a lot?" Anyways, we'll let the community votes speak. Also, eventually I will
                build a merchandise page, which has links to amazon products. If you buy your cofee mug, gun holster, bear spray, fishing rod, whatever it is from those links, that money also
                will go to increases the size of the pools.  So buying products from my page, will increase the rewards I can pay out. Win Win. P.S. You have have paid your yearly subscription,
                in order to vote. Votes will be used to create new games, according to the rules the community would like to see. We can have a reddit page to discuss options for new game rules.
                But, it's not like I'm going to pay out rewards to users of the application, if the using the application generates no profit. It's only possible if it does. So, please subcribe,
                because 100% of income from subscriptions is returned in community reward programs! We can also vote on the cost of the annual subscription. Will take a 2/3rd majority to win to change it. Right now, it's 1$ per year.
                But let's say we all share this app with our buddies, the more people you can motivate to display their trohpies here, the more generous I can be. 
                </p>

            </Grid>
        </Grid> 
    
        }
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