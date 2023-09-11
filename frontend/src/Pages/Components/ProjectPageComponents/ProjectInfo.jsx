import React, { useEffect,useCallback, useState } from 'react'
import './ProjectInfo.css'
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteProjectMutation,useGetProjectTasksMutation } from '../../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ProjectForm from './ProjectForm';

Modal.setAppElement('#root');

function ProjectInfo() {

    
    const { projectInfo } = useSelector((state) => state.project);
    const { userInfo } = useSelector((state) => state.auth);

    const [deleteProject, { isLoading }] = useDeleteProjectMutation();
    

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const [show, setShow] = useState(false);
    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);



    const deleteCurrentProject = async() =>{
        try{
            const res = await(deleteProject({project:projectInfo.id, auth:userInfo.token})); 
            navigate('/');
        }catch(err){
            console.log(err)
        }   
    }




    return (
        <div className='PartContainer'>
            <div className='InfoLeftPart'>
                <div className='LeftContentContainer'>
                    <div className='LeftContentContainerTop'>
                        Overview
                        <a style={{overflowWrap:'break-word',fontSize:'24px'}}>{projectInfo.description}</a>
                    </div>
                    <div className='LeftContentContainerBottom'>
                        <button className='ProjectFunctionButton' style={{border:'3px solid black',color:'white'}} onClick={()=>showForm()} disabled={projectInfo.is_finished}>Edit Project</button>
                        <Modal
                            isOpen={show}
                            className="FormModal"
                            overlayClassName="Overlay"
                        >
                            <div style={{width:'100vw',height:"100vh",display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>hideForm()}>
                                <ProjectForm close={hideForm}/>
                            </div>
                        </Modal>
                        <button className='ProjectFunctionButton' style={{border:'3px solid red',color:'red'}} onClick={()=>openModal()} disabled={projectInfo.is_finished}>Delete Project</button>
                        <Modal
                            isOpen={open}
                            className="FormModal"
                            overlayClassName="Overlay"
                        >
                            <div style={{width:'100vw',height:"100vh",display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>closeModal()}>
                            <div className='DeleteModal'  onClick={(e)=>e.stopPropagation()}>
                                <div className='ModalTop'>
                                    <h2 style={{fontSize:'50px'}}>Delete Project?</h2>
                                </div>
                                <div className='ModalBottom'>
                                    <button className='ModalButton' onClick={()=>closeModal()}>Cancel</button>
                                    <button className='ModalButton' style={{borderColor:'red',color:'red'}} onClick={()=>deleteCurrentProject()}>Delete</button>
                                </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className='InfoRightPart'>
                <div className='RightContentContainer'>
                    <div className='RightContentContainerTop'>
                    </div>
                    <div className='RightContentContainerBottom'>
                        <button className='FinishProjectButton' disabled={projectInfo.is_finished}>Finish project</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo
