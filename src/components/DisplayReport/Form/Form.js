import React, {useState, useEffect} from 'react'
import {useDataMutation} from '@dhis2/app-runtime'
import {InputField, Button} from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import {AlertBar} from '@dhis2/ui-core/build/cjs/AlertBar'
import '../DisplayReport.css'

/* 
 * Data mutation creates a mutation used to share a data set report 
 * through email. The email is sent to the recipient selected by the user.
 * The message contains the url to a data set report.
 */ 
const sendEmailMutation = {
    resource: 'email/notification',
    params: ({recipients, message, subject}) => ({
        recipients: recipients,
        message: message,
        subject: subject,
    }),
    type: 'create',
}

/*
 * This component is a form for sending an email containing a given data set report.
 */
export const Form = ({url}) => {
 const [email, setEmail] = useState(''); //Email address
 const [message, setMessage]=useState('') //Url address of data set report
 const [subject, setSubject] = useState('Data Set Report'); //Subject for email message

/* 
 * The component states are assigned to the DataMutation sendEmailMutation.
 */ 
 const [mutate] = useDataMutation(sendEmailMutation, {
        variables: {
            recipients: `${email}`,
            message: `${message}`,
            subject: `${subject}`,
        },
    })
		
/** 
 * Method validates the submited email address and sends an email
 * if the address is valid.
 */ 
 const validateEmail = (email) => {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if(!pattern.test(email)){
     alert('Invalid Email Address.');
     setEmail('');
  } else {
     setMessage(`https://course.dhis2.org/dhis/api/${url}`);
     mutate();
     alert('Report has been sent.');
     setEmail('');
  }
 }
	
/**
 * When the user clicks the Share report button, this method checks if they 
 * have supplied an email address. If not the user is asked to supply one. If
 * they have supplied an email, then the method sends the email to be validated.
 */	
 const handleSubmit = (e) => {
  if(email == "") {
     alert('Please enter an email address');
  } else validateEmail(email);   
 }
 
 return(
  <>
   <div className="section">
    <AlertBar className="alertbar" duration={0} icon permanent >   
     <input className="input" type="text" 
	  placeholder="Enter email address" 
	  value={email} 
	  name="email" 
	  onChange={(event) => setEmail(event.target.value)}>
	 </input>
     <br></br>
     <Button onClick={handleSubmit} primary>Send</Button>
    </AlertBar>
   </div>
  </> 
 ) 
}