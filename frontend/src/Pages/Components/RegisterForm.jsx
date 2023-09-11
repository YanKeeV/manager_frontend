import React,{useState,useEffect} from 'react'
import './RegisterForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';



function RegisterForm({registerHandler}) {
    const [name,setName] = useState('') ;
    const [surname,setSurname] = useState('') ;
    const [login,setLogin] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [email,setEmail] = useState('') ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);


    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
          try {
            console.log('in')
            const res = await register({email, first_name:name, last_name:surname, password });
            dispatch(setCredentials({ ...res }));
            navigate('/');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
      };


    return (
        <form className='RegisterForm' onSubmit={submitHandler}>
            <div className='RegisterFormTopContainer'>
                <div className='RegisterFormElementsContainer'>
                        <p className='Naming'>Register</p>
                        <div className='RegisterInputContainer'>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setName(e.target.value)} />
                            <span className={name.length>0 ? "floating label dirty" : "floating label"} >Name</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setSurname(e.target.value)} />
                            <span className={surname.length>0 ? "floating label dirty" : "floating label"} >Surname</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setLogin(e.target.value)} />
                            <span className={login.length>0 ? "floating label dirty" : "floating label"} >Login</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setPassword(e.target.value)} />
                            <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
                          </div>  
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setEmail(e.target.value)} />
                            <span className={email.length>0 ? "floating label dirty" : "floating label"} >Email</span>
                          </div>
                        </div>
                        <button className='LoginButton'>Register</button>
                </div>
            </div>
            <div className='RegisterFormBottomContainer' onClick={()=>registerHandler(false)}>
                Return
            </div>
        </form>
    )
}

export default RegisterForm
