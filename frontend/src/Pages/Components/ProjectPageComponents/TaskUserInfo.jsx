import React,{useState,useCallback,useEffect} from 'react'
import './TaskUserInfo.css'
import { useDeleteProjectMutation,useGetProjectTasksMutation,useGetProjectUsersMutation,useDeleteUserFromProjectMutation } from '../../../slices/usersApiSlice';
import { setUser } from '../../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';


function TaskUserInfo() {

    const [allTasks,setAllTasks] = useState([])
    const [newTasks,setNewTasks]=useState([]);
    const [progressTasks,setProgressTasks]=useState([]);
    const [checkoutTasks,setCheckoutTasks]=useState([]);
    const [endedTasks,setEndedTasks]=useState([]);
    const [getProjectTasks] = useGetProjectTasksMutation();
    const [getProjectUsers] = useGetProjectUsersMutation();
    const [deleteUserFromProject] = useDeleteUserFromProjectMutation();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);


    const { userInfo } = useSelector((state) => state.auth);
    const { certainUserInfo } = useSelector((state) => state.certainUser);
    const { projectInfo } = useSelector((state) => state.project);


    const [users,setUsers] = useState([])



    const  getTasks= useCallback( async() =>{
        const res = await getProjectTasks({project:projectInfo.id,auth: userInfo.token});
        setAllTasks(res.data.data)
        res.data.data.forEach(task => {
            if(task.status=='N'){
                setNewTasks(current=>[...current,task])
            }
            if(task.status=='P'){
                setProgressTasks(current=>[...current,task])
            }
            if(task.status=='C'){
                setCheckoutTasks(current=>[...current,task])
            }
            if(task.status=='E'){
                setEndedTasks(current=>[...current,task])
            }
        });
    },[getProjectTasks,setNewTasks,setProgressTasks,setCheckoutTasks,setEndedTasks,setAllTasks])


    const  getUsers= useCallback( async() =>{
        const res = await getProjectUsers({project:projectInfo.id,auth: userInfo.token});
        setUsers(res.data)
    },[getProjectUsers,setUsers])



    const deleteUserFromCurrentProject = async(user_id) =>{
        try{
            console.log(user_id)
            let a = JSON.parse(localStorage.getItem('certainUserInfo'))
            const res = await deleteUserFromProject({project:projectInfo.id,  user:a.id, auth:userInfo.token}); 
            getUsers()
            closeModal();
        }catch(err){
            console.log(err)
        }   
    }


    const updateUserRole = (e) =>{
        console.log(e)
    }


    useEffect(() => {
        if (projectInfo) {
            getTasks();
            getUsers();
        }
    }, [getTasks,getUsers,projectInfo]);



    return (
        <div className='PartContainer'>
            <div className='TaskStatisticPart'>
                <p style={{textAlign:'center',fontSize:'36px'}}>Task Statistic</p>
                <div className='TaskStatistic'>
                    <div className='StatisticItem' style={{color:'#FF7A00'}}>
                        <p>New</p>
                        <div className='line' style={{backgroundColor:'#FF7A00'}}></div>
                        <p>{newTasks.length}</p>
                    </div>

                    <div className='StatisticItem' style={{color:'#FAFF00'}}>
                        <p style={{whiteSpace:'nowrap'}}>In progress</p>
                        <div className='line' style={{backgroundColor:'#FAFF00'}}></div>
                        <p>{progressTasks.length}</p>
                    </div>

                    <div className='StatisticItem' style={{color:'#8DFF34'}}>
                        <p>Checkout</p>
                        <div className='line' style={{backgroundColor:'#8DFF34'}}></div>
                        <p>{checkoutTasks.length}</p>
                    </div>

                    <div className='StatisticItem' style={{color:'#00FF66'}}>
                        <p>Finished</p>
                        <div className='line' style={{backgroundColor:'#00FF66'}}></div>
                        <p>{endedTasks.length}</p>
                    </div>

                    <div className='StatisticItem' style={{color:'white',backgroundColor:'#696969',borderRadius:'20px',padding:'0px 50px'}}>
                        <p>All</p>
                        <div className='line' style={{backgroundColor:'white'}}></div>
                        <p>{allTasks.length}</p>
                    </div>
                </div>
            </div>
            <div className='UserManagementPart'>
                <div className='UserContainerWrapper'>
                    {users.map(user=>{
                        return(
                            <div className='UserContainer' key={user.id}>
                            <div className='UserInnerContainer'>
                                <div className='UserTopPart'>
                                    <div style={{width:'150px',height:'150px',borderRadius:'50%',backgroundColor:'white'}}></div>
                                    <div style={{fontSize:'36px', width:'120px',overflowWrap:'break-word'}}>{user.first_name + ' ' + user.last_name }</div>
                                </div>
                                <div className='UserBottomPart'>
                                    <div className='StatusInfo'>{user.status}</div>
                                    <select className='RoleContainer' onChange={(e)=>updateUserRole(e.target.value)}>
                                        <option hidden>{user.project_role=="W"?'Worker':user.project_role=="O"?"Owner":user.project_role=="A"?"Administrator":null}</option>
                                        <option>Owner</option>
                                        <option>Administrator</option>
                                        <option>Worker</option>
                                    </select>
                                    <div className='UserButtonContainer'>
                                        <button className='UserActionButton' style={{border:'3px solid red', color:'red'}} onClick={()=>{dispatch(setUser(user)); openModal()}} disabled={projectInfo.is_finished}>Kick</button>
                                        <Modal
                                        isOpen={open}
                                        className="FormModal"
                                        overlayClassName="Overlay2"
                                        >
                                         <div style={{width:'100vw',height:"100vh",display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>closeModal()}>
                                            <div className='DeleteModal'  onClick={(e)=>e.stopPropagation()}>
                                            <div className='ModalTop'>
                                                <h2 style={{fontSize:'50px'}}>Remove User?</h2>
                                            </div>
                                            <div className='ModalBottom'>
                                                <button className='ModalButton' onClick={()=>closeModal()}>Cancel</button>
                                                <button className='ModalButton' style={{borderColor:'red',color:'red'}} onClick={()=>{deleteUserFromCurrentProject(certainUserInfo.id); closeModal()}}>Remove</button>
                                            </div>
                                            </div>
                                         </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TaskUserInfo
