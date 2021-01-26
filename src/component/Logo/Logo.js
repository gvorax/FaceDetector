import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return(
    <div className="mt0 ma4 "> 
        <Tilt className="Tilt shadow-2 br3" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa4"> <img src={brain} alt="logo" style={{width:'100px'}}/> </div>
        </Tilt>
    </div>
    )
}

export default Logo;