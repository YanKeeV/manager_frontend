import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router'
import {useSelector } from 'react-redux';
function Header({turnTasks,taskStatus}) {
    const navigate = useNavigate();
    const { projectInfo } = useSelector((state) => state.project);
    return (
        <div className='Header'>
            <div className='HeaderLeft'>
                <p>{projectInfo.name}</p>
                <div className='CentralContainer'>
                    <p>{projectInfo.status}</p>
                </div>
                <p style={taskStatus ? null:{borderBottom:'3px solid #00FF66'}}  onClick={()=>turnTasks(false)}>Main</p>
                <p style={taskStatus ? {marginLeft:'30px', borderBottom:'3px solid #00FF66'}:{marginLeft:'30px'}} onClick={()=>turnTasks(true)}>Tasks</p>
            </div>
            <div className='HeaderRight'>
                <button className='ReturnButton' onClick={()=>navigate('/')}>Return</button>
            </div>
        </div>
    )
}

export default Header
