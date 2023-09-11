import React from 'react'
import './MainPage.css'
import CreateProjectContainer from './Components/MainPageComponents/CreateProjectContainer'
import MiddleContainer from './Components/MainPageComponents/MiddleContainer'
import ProfileContainer from './Components/MainPageComponents/ProfileContainer'
function MainPage() {
    return (
        <div className='MainPageContainer'>
            <CreateProjectContainer />
            <MiddleContainer />
            <ProfileContainer />
        </div>
    )
}

export default MainPage
