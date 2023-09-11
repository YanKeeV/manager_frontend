import React from 'react'
import './Header.css'

function AccordionListItem() {
    return (
        <div style={{display:'flex', backgroundColor:'#696969', marginTop:'10px',marginRight:'10px', borderRadius:'20px', paddingLeft:'30px'}}>
           <div style={{width:'60%'}}>TEST</div>
           <div style={{width:'13%',display:'flex',justifyContent:'center'}}>1</div>
           <div style={{width:'13%',display:'flex',justifyContent:'center'}}>CLOWN</div>
           <div style={{width:'13%',display:'flex',justifyContent:'center'}}>23.08.2023</div>
        </div>
    )
}

export default AccordionListItem
