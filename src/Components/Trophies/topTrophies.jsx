import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import ModalButton from '../CreateFlashCard/modalButton'


const Flash = (props) => {

   const [isFront, setSide] = useState(false);


   useEffect(() =>{
       console.log('Use Effect running')
   });


   function callTwoFunctions(){
       setSide(!isFront)
    //    if(isFront === true){
    //        document.getElementById('flashCard').style.backgroundColor = 'yellow';
    //    }
    //    if(isFront === false){
    //        document.getElementById('flashCard').style.backgroundColor = 'brown';
    //    }
    // meh, this didn't work..
    }

    return (
       
        <Card id='flashCard' onClick={() => callTwoFunctions()}>
     
   
       
       <div id='cardCounter'>{props.countCards}</div>
     
      
     
    
        
        <div>
        <button>Edit</button>
        </div>
        <div>
            
            <button>Delete</button>
        </div>
        </Card>
      
  

    );
}

export default Flash;