import React from 'react';
import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle, auth} from '../../firebase/firebase.utils'


class SignIn extends React.Component{
    constructor(props){
         super();
         this.state = {
             email: '',
             password: ''
         }
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const {email, password } = this.state

        try{
            await auth.signInWithEmailAndPassword(email, password);

        }catch(error){
            console.log(error)
        }

        this.setState({email:'',password:''})

    }
    handleChange = (event) => {
         const {value, name} = event.target;
         this.setState({[name]:value})
    }
    render(){
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name='email' value={this.state.email} handleChange={this.handleChange} label='Email'/>
                    <FormInput type="password" name='password' value={this.state.password} handleChange={this.handleChange} label='password'/>
                    <div className='buttons'>
                        <CustomButton type="submit" children= 'Sign in'></CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        {' '}Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}


export default SignIn;