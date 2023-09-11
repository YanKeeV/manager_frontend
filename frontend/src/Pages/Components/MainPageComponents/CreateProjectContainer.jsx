import React,{useState,useEffect} from 'react'
import './CreateProjectContainer.css'
import { useDispatch, useSelector } from 'react-redux';
import { useCreateProjectMutation } from '../../../slices/usersApiSlice';

const CreateProjectContainer = ()=> {


    const [name,setName] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [description,setDescription] = useState('');
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('');


    const [createProject, { isLoading }] = useCreateProjectMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        const res = await createProject({ name, password, description, start_date, end_date, auth:userInfo.token });
        console.log(res)
        } catch (err) {
  //      toast.error(err?.data?.message || err.error);
        console.log(err)
        }
    };

return(
    <form className='CreateProjectContainer' onSubmit={submitHandler}>
        <div className='CenterMainContainer'>
            <h1 style={{fontSize:'36px'}}>Create Project</h1>
            <div className='microInputContainer'>
                <input className='FormInput' onChange={(e)=>setName(e.target.value)}/>
                <span className={name.length>0 ? "floating label dirty" : "floating label"} >Project Name</span>
            </div>
            <div className='microInputContainer'>
                <input className='FormInput' onChange={(e)=>setPassword(e.target.value)}/>
                <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
            </div>
            <div className='microInputContainer'>
                <input className='FormInput' type='date'  style={start_date?{color:'white'}:{color:'transparent'}} onChange={(e)=>setStartDate(e.target.value)}/>
                <span className={start_date.length>0 ? "floating label dirty" : "floating label"} >Start date</span>
            </div>
            <div className='microInputContainer'>
                <input className='FormInput' type='date' style={end_date?{color:'white'}:{color:'transparent'}} value={end_date} onChange={(e)=>setEndDate(e.target.value)}/>
                <span className={end_date.length>0 ? "floating label dirty" : "floating label"} >End date</span>
            </div>
            <div className='microInputContainer'>
                <input className='FormInput' onChange={(e)=>setDescription(e.target.value)}/>
                <span className={description.length>0 ? "floating label dirty" : "floating label"} >Description</span>
            </div>
            <button className='CreateProjectButton' type='submit'>
                    Create
            </button>
        </div>
    </form>
)


}



export default CreateProjectContainer