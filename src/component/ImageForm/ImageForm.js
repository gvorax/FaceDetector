import React from 'react';
import './Link.css';

const ImageForm = ({ onInputChange, onButtonSubmit}) => {
    return(
    <div> 
        <p className="pa3">
           
        </p>
        <div className="center">
            <div className="form center pa4 shadow-5 br3">
                <input type="tex" className='f4 pa2 w-70 center' onChange={onInputChange}/>
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}    
                >Detect</button>   
            </div>
            
        </div>
            
    </div>
    )
}

export default ImageForm;



