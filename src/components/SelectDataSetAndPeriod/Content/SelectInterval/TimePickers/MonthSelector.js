import React from 'react'
import DatePicker from 'react-datepicker'
import './datepicker-css/react-datepicker.css'
		
/*
 * Component is used to select a set of months by selecting
 * a start month and an end month.
 */
export const MonthSelector = ({from, setFrom, to, setTo}) => {
	return(
	  <div>
	   <p>From:</p> 
	   <DatePicker 
		withPortal
	    selected={from}
		maxDate={to}
	    onChange={date => setFrom(date)}
		dateFormat="MM/yyyy"
		showMonthYearPicker
	   />
       <p>To:</p>
	   <DatePicker 
		withPortal
	    selected={to} 
	    onChange={date => setTo(date)}
	    minDate={from}
		dateFormat="MM/yyyy"
		showMonthYearPicker
	   />
	  </div>	
	)
}