import React,{useState,useEffect,useCallback} from 'react'
import './TaskPage.css'
import Header from './Components/Header'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './accordion.css'
import { useGetProjectTasksMutation,useDeleteTaskMutation,useCreateTaskMutation,useUpdateTaskMutation,useGetProjectUsersMutation,useAddTaskExecutorMutation } from '../slices/usersApiSlice';
import { useDispatch,useSelector } from 'react-redux';
import { setTask } from '../slices/taskSlice';
import Modal from 'react-modal';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function TaskPage({turnTasks,taskStatus}) {
    const [users,setUsers] = useState([]);
    //tasks
    const [newTasks,setNewTasks]=useState([]);
    const [progressTasks,setProgressTasks]=useState([]);
    const [checkoutTasks,setCheckoutTasks]=useState([]);
    const [endedTasks,setEndedTasks]=useState([]);
    //create task
    const [task_name,setTaskName] = useState('') ;
    const [task_start_date,setTaskStartDate] = useState('') ;
    const [task_end_date,setTaskEndDate] = useState('');
    const [task_description,setTaskDescription] = useState('');
    const [task_priority,setTaskPriority] = useState('');
    const [task_group,setTaskGroup]=useState('');
    //edit task
    const [edit_task_name,setEditTaskName] = useState('') ;
    const [edit_task_start_date,setEditTaskStartDate] = useState('') ;
    const [edit_task_end_date,setEditTaskEndDate] = useState('');
    const [edit_task_description,setEditTaskDescription] = useState('');
    const [edit_task_priority,setEditTaskPriority] = useState('');
    const [edit_task_group,setEditTaskGroup]=useState('');
    //Mutations
    const [getProjectTasks] = useGetProjectTasksMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const [getProjectUsers] = useGetProjectUsersMutation(); 
    const [addExecutor] = useAddTaskExecutorMutation();

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.project);
    const { taskInfo } = useSelector((state) => state.task);
    //modal visibility
    const [open,setOpen] = useState(false)
    const [show,setShow]=useState(false)
    const [show1,setShow1]=useState(false)

    const notify = (message)=>{
        toast.success(message)
    }

    const  getTasks= useCallback( async() =>{
        try{
        const res = await getProjectTasks({project:projectInfo.id,auth: userInfo.token});
        let n = [];
        setNewTasks([])
        let p = [];
        setProgressTasks([])
        let c = [];
        setCheckoutTasks([])
        let e = [];
        setEndedTasks([])
        console.log(res.data.data)
        res.data.data.forEach(task => {
            console.log(task)
            if(task.status=='N'){
                n.push(task)
                console.log('N')
                setNewTasks(n)
                console.log(n)
            }
            if(task.status=='P'){
                p.push(task)
                console.log('p')
                setProgressTasks(p)
                console.log(p)
            }
            if(task.status=='C'){
                c.push(task)
                console.log('C')
                setCheckoutTasks(c)
                console.log(c)
            }
            if(task.status=='E'){
                e.push(task);
                console.log('E')
                setEndedTasks(e)
                console.log(e)
            }
        });}
        catch(err){
            toast.error('Something went wrong...')
        }
    },[getProjectTasks,setNewTasks,setProgressTasks,setCheckoutTasks,setEndedTasks])

    const deleteTaskFromProject=useCallback(async(task_id)=>{
        try{
            const res = await deleteTask({task_id:task_id,auth:userInfo.token})
            getTasks()
            setOpen(false)
            notify('Deleted succesfully')
        }catch(err){
            toast.error('Something went wrong...')
        }
    },[deleteTask,getTasks])


    const addSubmitHandler = useCallback(async(e) =>{
        try{
            e.preventDefault();
            const res = await createTask({auth:userInfo.token, name:task_name,description:task_description,start_date:task_start_date,end_date:task_end_date,priority:task_priority,group:task_group,project:projectInfo.id})
            getTasks()
            setShow(false)
            notify('Added succesfully')
            console.log(res)
        }catch(err){
            toast.error('Something went wrong...')
        }
    },[createTask,getTasks])


    const updateSubmitHander = useCallback(async(e) =>{
        try{
            e.preventDefault();
            const res = await updateTask({auth:userInfo.token, name:edit_task_name,description:edit_task_description,start_date:edit_task_start_date,end_date:edit_task_end_date,priority:edit_task_priority,group:edit_task_group,pk:taskInfo.task.id})
            getTasks()
            setShow1(false)
            notify('Updated succesfully')
            setEditTaskDescription('');
            setEditTaskEndDate('')
            setEditTaskGroup('')
            setEditTaskName('')
            setEditTaskPriority('')
            setEditTaskStartDate('')
        }catch(err){
            toast.error('Something went wrong...')
        }
    },[updateTask,getTasks,edit_task_description,edit_task_end_date,edit_task_group,edit_task_name,edit_task_priority,edit_task_start_date])

    const  getUsers= useCallback( async() =>{
        try{
        const res = await getProjectUsers({project:projectInfo.id,auth: userInfo.token});
        setUsers(res.data)
        }catch(err)
        {
            toast.error('Something went wrong...')
        }
    },[getProjectUsers,setUsers])


    const addTaskExecutor = useCallback((value)=>{
        try{
            const res = addExecutor({email:value,auth:userInfo.token,task_id:taskInfo.task.id})
            console.log(res)
            getTasks();
            notify('Executor Added succesfully')
        }catch(err){
            toast.error('Something went wrong...')
        }
    },[getTasks,addExecutor])

    useEffect(() => {
            if(projectInfo){
            getTasks();
            getUsers();
            }
    }, [getTasks,getUsers]);

    return (
        <div className='TaskPageContainer'>
            <Header turnTasks={turnTasks} taskStatus={taskStatus} />
            <div className='createPart' style={{fontSize:'36px'}}>
                <p style={{width:'60%'}}><span style={{fontWeight:'bolder',marginLeft:'20px'}} onClick={()=>setShow(true)}>+</span>Task name</p>
                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>Priority</p>
                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>Executor</p>
                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>Deadline</p>
            </div>
            <Accordion>
            <AccordionItem >
                <AccordionItemHeading style={{color:'#FF7A00'}}>
                    <AccordionItemButton>
                        New
                    </AccordionItemButton>
                </AccordionItemHeading>
                
                <AccordionItemPanel>
                <Accordion>
                    {newTasks.map((task)=>(
                        <AccordionItem key={task.id}>
                        <AccordionItemHeading onClick={()=>dispatch(setTask({task}))}>
                            <AccordionItemButton className='test' onClick={()=>dispatch(setTask({task}))}>
                            <div style={{fontSize:'36px',display:'flex',alignItems:'center'}}>
                                <p style={{width:'60%'}}><span style={{fontWeight:'bolder',marginLeft:'15px'}}>+</span>{task.name}</p>
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{task.priority}</p>
                                {task.user ? (
                                <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                    <option style={{backgroundColor:'#696969',border:'none'}} hidden>{task.user}</option>
                                    {users.map((user)=>(
                                        <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                    ))}
                                </select>
                                ) : (
                                    <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                        <option style={{backgroundColor:'#696969',border:'none'}} hidden>Add executor</option>
                                        {users.map((user)=>(
                                            <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                        ))}
                                    </select>
                                )}
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{new Date(task.end_date).toLocaleDateString("en-GB")}</p>
                            </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                            <AccordionItemPanel style={{borderTop:'3px solid black',paddingTop:'20px',background:'#696969',width:'96.5vw',marginBottom: '15px',marginLeft: '15px',height:'150px'}}>
                            <div style={{fontSize:'36px',display:'flex', maxHeight:'200px',justifyContent:'space-between'}}>
                                    <div className='TaskDescription' style={{width:'50%',overflowY:'scroll',overflowX:'hidden',  margin:'0px 10px 20px 10px',fontSize:'24px',height:'120px',wordBreak:'break-word'}}>
                                        {task.description}
                                    </div>
                                    <div style={{width:'45%', display:'flex',flexDirection:'column'}}>
                                        <div style={{height:'50%',display:'flex',justifyContent:'space-between',marginRight:'25px'}}>
                                            <div>Group: {task.group}  </div>
                                            <div>Started at: {new Date(task.start_date).toLocaleDateString("en-GB")}</div>
                                        </div>
                                        <div style={{display:'flex',height:'50%',justifyContent: 'space-evenly'}}>
                                            <button className='TaskButton' onClick={()=>setShow1(true)}>Edit</button>
                                            <button className='TaskButton' style={{color:'red',borderColor:'red',marginRight:'15px'}} onClick={()=>{setOpen(true)}}>Delete</button>
                                            <Modal
                                                isOpen={open}
                                                className="Modal"
                                                overlayClassName="Overlay"
                                            >
                                                    <div className='ModalTop'>
                                                        <h2 style={{fontSize:'50px'}}>Delete Task?</h2>
                                                    </div>
                                                    <div className='ModalBottom'>
                                                        <button className='ModalButton' onClick={()=>setOpen(false)}>Cancel</button>
                                                        <button className='ModalButton' style={{borderColor:'red',color:'red'}} onClick={()=>deleteTaskFromProject(taskInfo.task.id)}>Delete</button>
                                                    </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading style={{color:'#FAFF00'}}>
                    <AccordionItemButton>
                        In progress
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <Accordion>
                {progressTasks.map((task)=>(
                        <AccordionItem key={task.id}>
                        <AccordionItemHeading onClick={()=>dispatch(setTask({task}))}>
                            <AccordionItemButton className='test' onClick={()=>dispatch(setTask({task}))}>
                            <div style={{fontSize:'36px',display:'flex',alignItems:'center'}}>
                                <p style={{width:'60%'}}><span style={{fontWeight:'bolder',marginLeft:'15px'}}>+</span>{task.name}</p>
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{task.priority}</p>
                                {task.user ? (
                                <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                    <option style={{backgroundColor:'#696969',border:'none'}} hidden>{task.user}</option>
                                    {users.map((user)=>(
                                        <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                    ))}
                                </select>
                                ) : (
                                    <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                        <option style={{backgroundColor:'#696969',border:'none'}} hidden>Add executor</option>
                                        {users.map((user)=>(
                                            <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                        ))}
                                    </select>
                                )}
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{new Date(task.end_date).toLocaleDateString("en-GB")}</p>
                            </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                            <AccordionItemPanel style={{borderTop:'3px solid black',paddingTop:'20px',background:'#696969',width:'96.5vw',marginBottom: '15px',marginLeft: '15px',height:'150px'}}>
                            <div style={{fontSize:'36px',display:'flex', maxHeight:'200px',justifyContent:'space-between'}}>
                                    <div className='TaskDescription' style={{width:'50%',overflowY:'scroll',overflowX:'hidden',  margin:'0px 10px 20px 10px',fontSize:'24px',height:'120px',wordBreak:'break-word'}}>
                                        {task.description}
                                    </div>
                                    <div style={{width:'45%', display:'flex',flexDirection:'column'}}>
                                        <div style={{height:'50%',display:'flex',justifyContent:'space-between',marginRight:'25px'}}>
                                            <div>Group: {task.group}  </div>
                                            <div>Started at: {new Date(task.start_date).toLocaleDateString("en-GB")}</div>
                                        </div>
                                        <div style={{display:'flex',height:'50%',justifyContent: 'space-evenly'}}>
                                            <button className='TaskButton' onClick={()=>setShow1(true)}>Edit</button>
                                            <button className='TaskButton' style={{color:'red',borderColor:'red',marginRight:'15px'}} onClick={()=>{setOpen(true)}}>Delete</button>
                                            <Modal
                                                isOpen={open}
                                                className="Modal"
                                                overlayClassName="Overlay"
                                            >
                                                    <div className='ModalTop'>
                                                        <h2 style={{fontSize:'50px'}}>Delete Task?</h2>
                                                    </div>
                                                    <div className='ModalBottom'>
                                                        <button className='ModalButton' onClick={()=>setOpen(false)}>Cancel</button>
                                                        <button className='ModalButton' style={{borderColor:'red',color:'red'}} onClick={()=>deleteTaskFromProject(taskInfo.task.id)}>Delete</button>
                                                    </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading style={{color:'#8DFF34'}}>
                    <AccordionItemButton>
                        Checkout
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <Accordion>
                {checkoutTasks.map((task)=>(
                        <AccordionItem key={task.id}>
                        <AccordionItemHeading onClick={()=>dispatch(setTask({task}))}>
                            <AccordionItemButton className='test' onClick={()=>dispatch(setTask({task}))}>
                            <div style={{fontSize:'36px',display:'flex',alignItems:'center'}}>
                                <p style={{width:'60%'}}><span style={{fontWeight:'bolder',marginLeft:'15px'}}>+</span>{task.name}</p>
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{task.priority}</p>
                                {task.user ? (
                                <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                    <option style={{backgroundColor:'#696969',border:'none'}} hidden>{task.user}</option>
                                    {users.map((user)=>(
                                        <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                    ))}
                                </select>
                                ) : (
                                    <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                        <option style={{backgroundColor:'#696969',border:'none'}} hidden>Add executor</option>
                                        {users.map((user)=>(
                                            <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                        ))}
                                    </select>
                                )}
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{new Date(task.end_date).toLocaleDateString("en-GB")}</p>
                            </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                            <AccordionItemPanel style={{borderTop:'3px solid black',paddingTop:'20px',background:'#696969',width:'96.5vw',marginBottom: '15px',marginLeft: '15px',height:'150px'}}>
                            <div style={{fontSize:'36px',display:'flex', maxHeight:'200px',justifyContent:'space-between'}}>
                                    <div className='TaskDescription' style={{width:'50%',overflowY:'scroll',overflowX:'hidden',  margin:'0px 10px 20px 10px',fontSize:'24px',height:'120px',wordBreak:'break-word'}}>
                                        {task.description}
                                    </div>
                                    <div style={{width:'45%', display:'flex',flexDirection:'column'}}>
                                        <div style={{height:'50%',display:'flex',justifyContent:'space-between',marginRight:'25px'}}>
                                            <div>Group: {task.group}  </div>
                                            <div>Started at: {new Date(task.start_date).toLocaleDateString("en-GB")}</div>
                                        </div>
                                        <div style={{display:'flex',height:'50%',justifyContent: 'space-evenly'}}>
                                            <button className='TaskButton' onClick={()=>setShow1(true)}>Edit</button>
                                            <button className='TaskButton' style={{color:'red',borderColor:'red',marginRight:'15px'}} onClick={()=>{setOpen(true)}}>Delete</button>
                                            <Modal
                                                isOpen={open}
                                                className="Modal"
                                                overlayClassName="Overlay"
                                            >
                                                    <div className='ModalTop'>
                                                        <h2 style={{fontSize:'50px'}}>Delete Task?</h2>
                                                    </div>
                                                    <div className='ModalBottom'>
                                                        <button className='ModalButton' onClick={()=>setOpen(false)}>Cancel</button>
                                                        <button className='ModalButton' style={{borderColor:'red',color:'red'}} onClick={()=>deleteTaskFromProject(taskInfo.task.id)}>Delete</button>
                                                    </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading style={{color:'#00FF66'}}>
                    <AccordionItemButton>
                        Finished
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <Accordion>
                {endedTasks.map((task)=>(
                        <AccordionItem key={task.id}>
                        <AccordionItemHeading onClick={()=>dispatch(setTask({task}))}>
                            <AccordionItemButton className='test' onClick={()=>dispatch(setTask({task}))}>
                            <div style={{fontSize:'36px',display:'flex',alignItems:'center'}}>
                                <p style={{width:'60%'}}><span style={{fontWeight:'bolder',marginLeft:'15px'}}>+</span>{task.name}</p>
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{task.priority}</p>
                                {task.user ? (
                                <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                    <option style={{backgroundColor:'#696969',border:'none'}} hidden>{task.user}</option>
                                    {users.map((user)=>(
                                        <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                    ))}
                                </select>
                                ) : (
                                    <select className='ExecutorSelect' onClick={(e)=>e.stopPropagation()} onChange={(e)=>addTaskExecutor(e.target.value)}>
                                        <option style={{backgroundColor:'#696969',border:'none'}} hidden>Add executor</option>
                                        {users.map((user)=>(
                                            <option style={{backgroundColor:'#696969',border:'none'}} key={user.id}>{user.email}</option>
                                        ))}
                                    </select>
                                )}
                                <p style={{width:'13%',display:'flex',justifyContent:'center'}}>{new Date(task.end_date).toLocaleDateString("en-GB")}</p>
                            </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                            <AccordionItemPanel style={{borderTop:'3px solid black',paddingTop:'20px',background:'#696969',width:'96.5vw',marginBottom: '15px',marginLeft: '15px',height:'150px'}}>
                            <div style={{fontSize:'36px',display:'flex', maxHeight:'200px',justifyContent:'space-between'}}>
                                    <div className='TaskDescription' style={{width:'50%',overflowY:'scroll',overflowX:'hidden',  margin:'0px 10px 20px 10px',fontSize:'24px',height:'120px',wordBreak:'break-word'}}>
                                        {task.description}
                                    </div>
                                    <div style={{width:'45%', display:'flex',flexDirection:'column'}}>
                                        <div style={{height:'50%',display:'flex',justifyContent:'space-between',marginRight:'25px'}}>
                                            <div>Group: {task.group}  </div>
                                            <div>Started at: {new Date(task.start_date).toLocaleDateString("en-GB")}</div>
                                        </div>
                                        <div style={{display:'flex',height:'50%',justifyContent: 'space-evenly'}}>
                                            <button className='TaskButton' onClick={()=>setShow1(true)}>Edit</button>
                                            <button className='TaskButton' style={{color:'red',borderColor:'red',marginRight:'15px'}} onClick={()=>{setOpen(true)}}>Delete</button>
                                            <Modal
                                                isOpen={open}
                                                className="Modal"
                                                overlayClassName="Overlay"
                                            >
                                                    <div className='ModalTop'>
                                                        <h2 style={{fontSize:'50px'}}>Delete Task?</h2>
                                                    </div>
                                                    <div className='ModalBottom'>
                                                        <button className='ModalButton' onClick={()=>setOpen(false)}>Cancel</button>
                                                        <button className='ModalButton' style={{borderColor:'red',color:'red'}} onClick={()=>deleteTaskFromProject(taskInfo.task.id)}>Delete</button>
                                                    </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        />
        <Modal
        isOpen={show}
        className="FormModal"
        overlayClassName="Overlay"
        >
        <div style={{width:'100vw',height:"100vh",display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>setShow(false)}>
            <form className='EditModalContainer' onSubmit={addSubmitHandler}  onClick={(e)=>e.stopPropagation()}>
                <div className='EditModalCenterMainContainer'>
                    <h1 style={{fontSize:'36px'}}>Create Task</h1>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setTaskName(e.target.value)}/>
                        <span className={task_name.length>0 ? "floating label dirty" : "floating label"} >Task Name</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setTaskDescription(e.target.value)}/>
                        <span className={task_description.length>0 ? "floating label dirty" : "floating label"} >Task description</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setTaskPriority(e.target.value)}/>
                        <span className={task_priority.length>0 ? "floating label dirty" : "floating label"} >Priority</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' type='date' style={task_start_date?{color:'white'}:{color:'transparent'}} value={task_start_date} onChange={(e)=>setTaskStartDate(e.target.value)}/>
                        <span className={task_start_date.length>0 ? "floating label dirty" : "floating label"} >Start date</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' type='date' style={task_end_date?{color:'white'}:{color:'transparent'}} value={task_end_date} onChange={(e)=>setTaskEndDate(e.target.value)}/>
                        <span className={task_end_date.length>0 ? "floating label dirty" : "floating label"} >End date</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setTaskGroup(e.target.value)}/>
                        <span className={task_group.length>0 ? "floating label dirty" : "floating label"} >Group</span>
                    </div>
                    <button className='CreateProjectButton' type='submit'>
                            Create
                    </button>
                </div>
            </form>
        </div>
        </Modal>
        <Modal
        isOpen={show1}
        className="FormModal"
        overlayClassName="Overlay"
        >
        <div style={{width:'100vw',height:"100vh",display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>setShow1(false)}>
            <form className='EditModalContainer' onSubmit={updateSubmitHander}  onClick={(e)=>e.stopPropagation()}>
                <div className='EditModalCenterMainContainer'>
                    <h1 style={{fontSize:'36px'}}>Edit Task</h1>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setEditTaskName(e.target.value)}/>
                        <span className={edit_task_name.length>0 ? "floating label dirty" : "floating label"} >Task Name</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setEditTaskDescription(e.target.value)}/>
                        <span className={edit_task_description.length>0 ? "floating label dirty" : "floating label"} >Task description</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setEditTaskPriority(e.target.value)}/>
                        <span className={edit_task_priority.length>0 ? "floating label dirty" : "floating label"} >Priority</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' type='date' style={edit_task_start_date?{color:'white'}:{color:'transparent'}} value={task_start_date} onChange={(e)=>setEditTaskStartDate(e.target.value)}/>
                        <span className={edit_task_start_date.length>0 ? "floating label dirty" : "floating label"} >Start date</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' type='date' style={edit_task_end_date?{color:'white'}:{color:'transparent'}} value={task_end_date} onChange={(e)=>setEditTaskEndDate(e.target.value)}/>
                        <span className={edit_task_end_date.length>0 ? "floating label dirty" : "floating label"} >End date</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' onChange={(e)=>setEditTaskGroup(e.target.value)}/>
                        <span className={edit_task_group.length>0 ? "floating label dirty" : "floating label"} >Group</span>
                    </div>
                    <button className='CreateProjectButton' type='submit'>
                            Edit
                    </button>
                </div>
            </form>
        </div>
        </Modal>
        </div>
    )
}

export default TaskPage
