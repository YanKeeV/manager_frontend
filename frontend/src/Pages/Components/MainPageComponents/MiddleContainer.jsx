import React,{useState,useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetAvailibleProjectsMutation, useJoinProjectMutation } from '../../../slices/usersApiSlice';
import { setProject } from '../../../slices/projectsSlice';
import {Link} from 'react-router-dom'
import './MiddleContainer.css'
const MiddleContainer = ()=> {

    const { userInfo } = useSelector((state) => state.auth);

    const [projectName,setProjectName]=useState('');
    const [projectPassword,setProjectPassword]=useState('');
    const [availibleProjects,setAvailibleProjects]=useState([]);
    const [projectArchive,setProjectArchive] = useState([]);

    const [showArchive,setShowArchive]=useState(false);

    const dispatch = useDispatch();

    const [getAvailibleProjects, { isLoading }] = useGetAvailibleProjectsMutation();
    const [joinProject] = useJoinProjectMutation();


    const  getProjects= useCallback( async() =>{
        console.log('qe'+userInfo)
        const res = await getAvailibleProjects({auth: userInfo.token});
        let a = []
        let b = []
        res.data.data.forEach(project => {
            if(project.is_finished == false){
                a.push(project)
            }else{
                b.push(project)
            }
        });
        setAvailibleProjects(a)
        setProjectArchive(b)
    },[getAvailibleProjects,setAvailibleProjects])

    useEffect(() => {
        if (userInfo) {
        getProjects()
        }
    }, [getProjects]);


    const joinProjectHandler = useCallback(async (e)=>{
        e.preventDefault();
        try{
            console.log('123' + projectName + ' ' + projectPassword)
            const res = await joinProject({name:projectName,password:projectPassword,auth:userInfo.token});
            console.log(res)
            setAvailibleProjects([...availibleProjects,res.data[0]])
        }
        catch(err){
            console.log(err)
        }
    },[setAvailibleProjects, projectName,projectPassword,availibleProjects])

    


return(
    <div className='MiddleContainer'>
        <form className='InnerContainer' onSubmit={joinProjectHandler}>
            <h1 style={{fontSize:'36px'}}>Join project</h1>
            <div className='JoinInputContainer'>
                <div className='microInputContainer'>
                    <input className='FormInput' name="projectName" onChange={(e)=>{setProjectName(e.target.value)}} value={projectName} required/>
                    <span className={projectName.length>0 ? "floating label dirty" : "floating label"} >Project Name</span>
                </div>
                <div className='microInputContainer'>
                    <input className='FormInput' onChange={(e)=>setProjectPassword(e.target.value)} required/>
                    <span className={projectPassword.length>0 ? "floating label dirty" : "floating label"} >Project password</span>
                </div>
            </div>
            <button className='CreateProjectButton' type='submit'>
                    Join
            </button>
        </form>
        <div className='InnerContainer'>
            <h1 style={{fontSize:'36px',height:'10%'}} onClick={()=>setShowArchive(!showArchive)}>Availible projects</h1>
            <div className='AvailibleProjectUpperContainer' style={availibleProjects.length>3?{overflowY:'scroll'}:null}>
            {!showArchive?
            (availibleProjects.map((project)=>{
                return(
                <div className='AvailibleProjectContainer' key={project.id}>
                    <h1 style={{fontSize:'36px',marginLeft:'20px'}}>{project.name}</h1>
                    <div className='AvailibleProjectIconContainer'>
                        <Link to={`/project/${project.name}`} onClick={()=>dispatch(setProject(project))} ><img src='https://cdn.discordapp.com/attachments/1014171486329778219/1138150807536144405/image.png' style={{width:'50px',height:'50px'}}/></Link>
                    </div>
                </div>
                )
            })): 
            (projectArchive.map((project)=>{
                return(
                <div className='AvailibleProjectContainer' key={project.id}>
                    <h1 style={{fontSize:'36px',marginLeft:'20px'}}>{project.name}</h1>
                    <div className='AvailibleProjectIconContainer'>
                        <Link to={`/project/${project.name}`} onClick={()=>dispatch(setProject(project))} ><img src='https://cdn.discordapp.com/attachments/1014171486329778219/1138150807536144405/image.png' style={{width:'50px',height:'50px'}}/></Link>
                    </div>
                </div>
                )
            }))}
            </div>
        </div>

    </div>
)


}



export default MiddleContainer