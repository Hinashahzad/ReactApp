import React, {useState} from 'react'
import {SelectField} from '@dhis2/ui-core'  
	
/*
 * Component used to select a set of years by selecting a start year 
 * and an end year.
 */
export const YearSelector = ({from, setFrom, to, setTo}) => {
 //Create an array of the last ten years.
 let year = new Date().getFullYear()
 const [years] = useState(Array.from(new Array(10),(val, index) => (year - index)))
 
 return(
  	  <div>
	   <p>From</p>
       <SelectField 
	    filled
	    required
	    label="From"
	    name="SelectFromYear"
	    value={String(from)}
	    onChange={event => setFrom(event.target.value)}
	   >
	    { years.map(i => (
		  <option value={i} key={i}>
	       {i}
	      </option>
		 ))}
	   </SelectField> 
	   <p>To</p>
       <SelectField 
	    filled
	    required
	    label="To"
	    name="SelectToYear"
	    value={String(to)}
	    onChange={event => setTo(event.target.value)}
	   >
	    { years.map(i => (
		  <option value={i} key={i}>
	       {i}
	      </option>
		 ))}
	   </SelectField>
	  </div>	
 )	
}