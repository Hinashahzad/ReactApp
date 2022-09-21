import React from 'react'
import DatePicker from 'react-datepicker'
import './datepicker-css/react-datepicker.css'
	
/*
 * Component is used to select a set of dates by selecting
 * a start date and an end date.
 */
export const DateSelector = ({from, setFrom, to, setTo}) => {
	return(
	  <div>
	   <p>From:</p> 
	   <DatePicker
		withPortal
		dateFormat="d/MM/yyyy"
	    selected={from} 
	    onChange={date => setFrom(date)}
		maxDate={to}
	   />
       <p>To:</p>
	   <DatePicker
		withPortal
		dateFormat="d/MM/yyyy"
	    selected={to} 
	    onChange={date => setTo(date)}
	    minDate={from}
	   />		
	  </div>	
	)
}