import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserProfileMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';



function EditProfileForm({token,kek,close}) {
    const [name,setName] = useState('') ;
    const [surname,setSurname] = useState('') ;
    const [status,setStatus] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [email,setEmail] = useState('') ;
 //   const [userInfo,setUserInfo]=useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();


    const submitHandler = async (e) => {
        e.preventDefault();
          try {
            const res = await updateProfile({first_name:name, last_name:surname, password:password, status:status, auth:token });
            dispatch(setCredentials({ ...res }));
            kek()
            close()
          } catch (err) {
            console.log(err)
          }
      };



    return (
        <form className='EditProfileForm' style={{backgroundColor:'#464646', width:'500px', height:'700px',borderRadius:'40px'}} onSubmit={submitHandler}>
            <div className='EditProfileFormContainer'>
                <div className='RegisterFormElementsContainer'>
                        <p className='Naming'>Edit User</p>
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
                            <input className='FormInput' onChange={(e)=>setStatus(e.target.value)} />
                            <span className={status.length>0 ? "floating label dirty" : "floating label"} >Status</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setPassword(e.target.value)} />
                            <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
                          </div>  
                        </div>
                        <button className='LoginButton' type='submit'>Edit</button>
                </div>
            </div>
        </form>
    )
}

export default EditProfileForm
