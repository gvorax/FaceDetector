import React from 'react';

class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange =(event) =>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange =(event) =>{
        this.setState({signInPassword:event.target.value})
    }
    onSubmitChange = () =>{
        fetch('https://sheltered-fjord-25542.herokuapp.com/signin',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })

        })
        .then(response => response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
      
    }
    render()
    {
        const {onRouteChange} = this.props
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m mw6 center shadow-5">    
                <main className="pa4 black-80">
                    <div className="measure">
                        <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f3" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 outline-0 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw4 lh-copy f3" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                className="b outline-0 pa2 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                            />
                        </div>
                        <div className="">
                            <input
                                style={{border:'2px solid black',}} 
                                onClick= {this.onSubmitChange}
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
 
}

export default SignIn;