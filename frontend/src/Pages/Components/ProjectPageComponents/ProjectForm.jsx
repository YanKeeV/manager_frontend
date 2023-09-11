import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateProjectMutation } from '../../../slices/usersApiSlice';
import { setProject } from '../../../slices/projectsSlice';
import './ProjectForm.css'
import {ToastContainer,toast} from 'react-toastify'
function ProjectForm({close}) {

    const [name,setName] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [description,setDescription] = useState('');
    const [status,setStatus] = useState('');
    const [end_date,setEndDate] = useState('');
    const dispatch = useDispatch();

    const [updateProject, { isLoading }] = useUpdateProjectMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.project);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        const res = await updateProject({pk:projectInfo.id, name:name, password:password, description:description, status:status, end_date:end_date, auth:userInfo.token });
        dispatch(setProject(res.data.data[0]))
        close();
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        console.log(err)
        }
    };



    return (
        <form className='EditModalContainer' onSubmit={submitHandler}  onClick={(e)=>e.stopPropagation()}>
        <div className='EditModalCenterMainContainer'>
            <h1 style={{fontSize:'36px'}}>Edit Project</h1>
            <div className='microInputContainer'>
                <input className='FormInput' onChange={(e)=>setName(e.target.value)}/>
                <span className={name.length>0 ? "floating label dirty" : "floating label"} >Project Name</span>
            </div>
            <div className='microInputContainer'>
                <input className='FormInput' onChange={(e)=>setPassword(e.target.value)}/>
                <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
            </div>
            <div className='microInputContainer'>
                <input className='FormInput' onChange={(e)=>setStatus(e.target.value)}/>
                <span className={status.length>0 ? "floating label dirty" : "floating label"} >Status</span>
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
                    Edit
            </button>
        </div>
    </form>
    )
}

export default ProjectForm
