import React, { useState } from 'react'
import './ProjectPage.css'
import Header from './Components/Header'
import ProjectInfo from './Components/ProjectPageComponents/ProjectInfo'
import TaskUserInfo from './Components/ProjectPageComponents/TaskUserInfo'
import TaskPage from './TaskPage'
function ProjectPage() {
    const [showTasks,setShowTasks] = useState(false)
    return (
        <div className='ProjectContainer'>    
        {showTasks ?  <TaskPage turnTasks={setShowTasks} taskStatus={showTasks}/> : ( 
        <div className='ProjectPageContainer'>
            <Header turnTasks={setShowTasks} taskStatus={showTasks}/>
            <div className='ProjectPageTop'>
                <ProjectInfo />
            </div>
            <div className='ProjectPageBottom'>
                <TaskUserInfo />
            </div>
        </div>)}
        </div>
    )
}

export default ProjectPage
