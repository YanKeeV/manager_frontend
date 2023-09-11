import React,{useState,useEffect,useCallback} from 'react'
import './ProfileContainer.css'
import { logout } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import { useGetTasksForUserMutation,useGetCurrentUserMutation } from '../../../slices/usersApiSlice';
import EditProfileForm from './EditProfileForm';

const ProfileContainer = ()=> {
    const { userInfo } = useSelector((state) => state.auth);
    const [getTasksForUser, { isLoading }] = useGetTasksForUserMutation();
    const [getCurrentUser] = useGetCurrentUserMutation();
    const [availibleTasks,setTasks]=useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentUser,setCurrentUser]=useState({})

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);


    const logout1 =()=>{
        dispatch(logout())
        navigate('/login');
    }


    const  getTasks= useCallback( async() =>{
        console.log('asd+ ',userInfo)
        const res = await getTasksForUser({auth: userInfo.token});
        console.log(res)
        setTasks(res.data.data)
    },[getTasksForUser])

    const  getCurrentUserInfo= useCallback( async() =>{
        console.log(userInfo.token)
        const res = await getCurrentUser({auth: userInfo.token});
        setCurrentUser(res.data.data[0])
    },[getCurrentUser,setCurrentUser])

    useEffect(() => {

        if(userInfo){
            getCurrentUserInfo();
            getTasks();
        }else{
            console.log('kek')
            navigate('/login')
        }
    }, [getTasks,getCurrentUserInfo]);

return(
    <form className='ProfileContainer'> 
        <div>
            <img src='../../../editIcon.png' className='editProfileImage' onClick={openModal}/>
            <Modal
            isOpen={open}
            className="FormModal"
            overlayClassName="Overlay"
            >
                <EditProfileForm token={userInfo.token} kek={getCurrentUserInfo} close={closeModal}/>
            </Modal>
            <h1>{currentUser.first_name+' '+currentUser.last_name}</h1>
            <p className='ProfileUserInfo'>@ulitka</p>
            <p className='ProfileUserInfo'>{currentUser.email}</p>
        </div>
        <div className='LogOutButton' onClick={()=>logout1()}>
                Log out
        </div>
        <div className='GridTable'>
            <div className='GridHeader' style={{marginTop:'10px',marginLeft:'20px',fontSize:'36px', borderRight:'4px solid black', borderTopLeftRadius:'3px',borderTopRightRadius:'2px', borderBottom:'4px solid black'}}>Name</div>
            <div className='GridHeader' style={{marginTop:'10px',marginRight:'20px',fontSize:'36px',borderBottom:'4px solid black'}}>Status</div>
            <div style={{borderRight:'4px solid black'}}>
            {availibleTasks.map((task)=>{
                    return(
                        <h1 style={{fontSize:'32px', textAlign:'center'}} key={task.id}>{task.name}</h1>
                    )
                })}
            </div>
        </div>
    </form>
)


}



export default ProfileContainer