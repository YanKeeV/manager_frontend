import React,{useState,useEffect} from 'react'
import './LoginForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
const LoginForm = ({registerHandler})=> {
    const [username,setEmail] = useState('') ;
    const [password,setPassword] = useState('') ;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
        navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('in ' + username + ' in ' + password)
        const res = await login({ username, password });
        console.log(res)
            if(res.data){
            dispatch(setCredentials({ ...res.data }));
            navigate('/');
            }
        } catch (err) {
  //      toast.error(err?.data?.message || err.error);
        console.log(err)
        }
    };

    return (
        <form className='LoginForm' onSubmit={submitHandler}>
                <div className='LoginTopContainer'>
                    <div className='FormElementsContainer'>
                        <p className='Naming'>CyberWeb Solutions</p>
                        <div className='InputContainer'>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setEmail(e.target.value)}/>
                                <span className={username.length>0 ? "floating label dirty" : "floating label"} >Email</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setPassword(e.target.value)} />
                                <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
                            </div>
                        </div>
                        <button className='LoginButton' type='submit'>Login</button>
                    </div>
                </div>
                <div className='LoginBottomContainer' onClick={()=>registerHandler(true)}>
                    Register
                </div>
        </form>
    )
}

export default LoginForm
