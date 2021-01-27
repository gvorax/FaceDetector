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
  apiKey:'a214d33f97c2483f9447aa912793d5c9' 
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
      input:'',
      imageUrl:'',
      box:{ }
    }
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
    app.models.predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input
        )
        .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));  
 };


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
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
  
}

export default App;
