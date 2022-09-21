import React from 'react'
import DatePicker from 'react-datepicker'
import './datepicker-css/react-datepicker.css'

/*
 * Component is used to select a set of quarters by selecting
 * a start quarter and an end quarter.
 * A quarter is 1/4 of a year.
 */
export const QuarterSelector = ({from, setFrom, to, setTo}) => {
	return(
	  <div>
	   <p>From:</p>
	   <DatePicker
		withPortal
	    selected={from}
	    onChange={date => setFrom(date)}
	    dateFormat="yyyy, QQQ"
	    showQuarterYearPicker
		maxDate={to}
	   />
	   <p>To:</p>
	   <DatePicker
		withPortal
	    selected={to}
	    onChange={date => setTo(date)}
	    dateFormat="yyyy, QQQ"
	    showQuarterYearPicker
	    minDate={from}
	   />
	  </div>
	)
}