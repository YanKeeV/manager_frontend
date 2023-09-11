import React,{useState} from 'react'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import './LoginPage.css'

function LoginPage() {
    const [showRegister,setShowRegister]= useState(false)
    
    return (
        <div className='LoginContainer'>
            <div className='LoginFormContainer' style={showRegister ? {opacity:0,transition:'opacity 1s'} : {opacity:1, transition:'opacity 1.5s'}}>
                <LoginForm registerHandler={setShowRegister} className='LoginForm'/>
            </div>
            <div className='RegisterFormContainer' style={showRegister ? {opacity:1,top:'5%',transition:'top 1.5s'} : {top:'100%',transition:'top 1s'}}>
                <RegisterForm registerHandler={setShowRegister} className='RegisterForm'/>
            </div>
        </div>
    )
}

export default LoginPage
