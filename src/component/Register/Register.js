import React from 'react';

class Register extends React.Component {
    constructor(props)
    {
        super(props);
        this.state ={
            name:'',
            email:'',
            password:''
        }
    }
    onNameChange =(event) =>{
        this.setState({name:event.target.value})
    }
    onEmailChange =(event) =>{
        this.setState({email:event.target.value})
    }
    onPasswordChange =(event) =>{
        this.setState({password:event.target.value})
    }
    onSubmitChange = () =>{
        fetch('https://sheltered-fjord-25542.herokuapp.com/register',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                name:this.state.name,
                email:this.state.email,
                password:this.state.password
            })

        })
        .then(response => response.json())
        .then(user =>{
            if( user.id ){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
      
    }
    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-70-m w-40-ns mw6 center shadow-5">    
                <main className="pa4 black-80">
                    <div className="measure">
                        <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f3" htmlFor="email-address">Name</label>
                            <input 
                                className="pa2 outline-0 ba bw1 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f3" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 outline-0 ba bw1 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw4 lh-copy f3" htmlFor="password">Password</label>
                            <input 
                                className="b outline-0 pa2 ba bw1 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        <div className="">
                            <input 
                                onClick= {this.onSubmitChange}
                                className="db center pointer pa2 mv4 bg-transparent br3 ba bw1 b--black black hover-white hover-bg-black grow outline-0" 
                                type="submit" 
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
 
}

export default Register;