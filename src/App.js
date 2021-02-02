import React, { Component } from 'react'
import './App.css';
import Navigation from './component/Navigation/Navigation';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/Register';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Logo from './component/Logo/Logo';
import ImageForm from './component/ImageForm/ImageForm';
import Rank from './component/Rank/Rank';
import Particles from 'react-particles-js';

const Particless ={
    particles: {
      number:{
        value: 150,
        density:{
          enable:true,
          value_area: 800
        },
        shape: {
          character: {
            fill: false,
            font: "Verdana",
            style: "",
            value: "*****",
            weight: "400"
          }
        }      
      },
      stroke: { color: "#000000", width: 1 },
      size: { value: 3  },
      retina_detect: true
    }
}
const initialState = {
  input:'',
  imageUrl:'',
  box:{ },
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialState
  }

  loadUser = (data) =>{
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    })
  }
  calculateFaceLocation = (data) =>{
     const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow:height - (clarifyFace.bottom_row *height)
     }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }


  onInputChange = (event)=>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit=() =>{
    this.setState({imageUrl:this.state.input});
    fetch('http://localhost:3000/imageUrl',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
          input:this.state.input
        })
      })
      .then(response=>response.json())
        .then(response =>{
          if(response)
          {
            fetch('http://localhost:3000/image',{
              method:'put',
              headers:{'Content-type':'application/json'},
              body:JSON.stringify({
                id:this.state.user.id
              })
            })
            .then(response=>response.json())
            .then(count=>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));  
 };

 onRouteChange = (route) =>{
   if (route === 'signout') {
     this.setState(initialState)
   }else if(route === 'home'){
     this.setState({isSignedIn:true})
   }
   this.setState({ route:route })
 }


  render(){
    const {isSignedIn,box,imageUrl,route} = this.state;
    return (
      <div className="App">
        <Particles className="particless" params={Particless} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin' || route === 'signout'
              ?<SignIn  loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
        } 
      </div>
    );
  }
  
}

export default App;
