import React, { Component } from 'react'
import './App.css';
import Navigation from './component/Navigation/Navigation';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Logo from './component/Logo/Logo';
import ImageForm from './component/ImageForm/ImageForm';
import Rank from './component/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey:'16c2c89d879649aabc59e9d42d9c2697' 
})
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

class App extends Component {
  constructor(){
    super();
    this.state={
      input:''
    }
  }
  onInputChange = (event)=>{
    console.log(event.target.value);
  }
  onButtonSubmit=() =>{
    console.log('Click');
    app.models.predict("a403429f2ddf4b49b307b318f00e528b","https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg").then(
      function(response) {
        // do something with responseconsole.log(response);
        console.log(response)
        },
        function(err) {}
    );
  }


  render(){
    return (
      <div className="App">
        <Particles className="particless" params={Particless} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition/>
      </div>
    );
  }
  
}

export default App;
