import React from 'react'
import './MainPage.css'
import Header from './Components/Header'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './accordion.css'
import AccordionListItem from './Components/AccordionListItem';
function MainPage() {
    return (
        <div className='MainPageContainer'>
            <Header />
            <div className='createPart' style={{fontSize:'36px'}}>
                <p style={{width:'60%'}}><span style={{fontWeight:'bolder'}}>+</span>Task name</p>
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
                    <AccordionListItem/>
                    <AccordionListItem/>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading style={{color:'#FAFF00'}}>
                    <AccordionItemButton>
                        In progress
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading style={{color:'#8DFF34'}}>
                    <AccordionItemButton>
                        Checkout
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading style={{color:'#00FF66'}}>
                    <AccordionItemButton>
                        Finished
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        </div>
    )
}

export default MainPage
