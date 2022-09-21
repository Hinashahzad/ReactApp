import React from 'react'
import {Content} from './Content/Content'
import {Button} from '@dhis2/ui-core'
import './style.css'

/*
 * Component is used to select data set and period type for
 * the reports.
 */
export const SelectDataSetAndPeriod = (props) => {
	
/*
 * Method directs the user back to the Main component.
 */
 const back = () => {
 	props.history.push({
		pathname: '/'
	})
 }
 if(props.history.location.id===undefined){
     props.history.replace({
         pathname: '/'
     })
 }
	
 return (
  <div className="content">
   <h1>{props.match ? props.match.params.id : props.displayName}</h1>
   <h2>
    <Button onClick={back}>back</Button>&emsp;Select Forms
   </h2>
   <Content selectedFacilityName={props.match.params.id} selectedFacility={props.history.location.id}/>
  </div>
 )
}