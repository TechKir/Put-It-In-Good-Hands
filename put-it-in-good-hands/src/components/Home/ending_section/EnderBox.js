import React from 'react';
import ThingsImg2 from './ThingsImg2';
import ContactForm from './ContactForm';


export default (props) =>{
    return (
        <div >
            <ThingsImg2/>
            <ContactForm correctPosition={props.correctPosition} correctPosition2={props.correctPosition2}/>
        </div>
    )
}