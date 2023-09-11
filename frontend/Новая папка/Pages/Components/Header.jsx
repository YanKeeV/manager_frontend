import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className='Header'>
            <div className='HeaderLeft'>
                <p>Task manager project</p>
                <div className='CentralContainer'>
                    <p>In progress</p>
                </div>
                <p>Main</p>
                <p style={{marginLeft:'30px'}}>Tasks</p>
            </div>
            <div className='HeaderRight'>
                <button className='ReturnButton'>Return</button>
            </div>
        </div>
    )
}

export default Header
