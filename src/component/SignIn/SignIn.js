import React from 'react';

const SignIn = ({ onRouteChange }) => {
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m mw6 center shadow-5">    
            <main className="pa4 black-80">
                <div className="measure">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f3" htmlFor="email-address">Email</label>
                        <input className="pa2 outline-0 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw4 lh-copy f3" htmlFor="password">Password</label>
                        <input className="b outline-0 pa2 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    <div className="">
                        <input
                            style={{border:'2px solid black',}} 
                            onClick= {()=> onRouteChange('home')}
                            className="db center pointer pa2 mv4 bg-transparent br3 ba bw1 b--black black hover-white hover-bg-black grow outline-0" 
                            type="submit" 
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick= {()=> onRouteChange('register')} className="f4 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default SignIn;