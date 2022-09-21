import React, {useState, useEffect} from 'react'
import {YearSelector} from './TimePickers/YearSelector'
import {MonthSelector} from './TimePickers/MonthSelector'
import {DateSelector} from './TimePickers/DateSelector'
import {QuarterSelector} from './TimePickers/QuarterSelector'
import {InputField, Button, Card, SelectField, Radio, CircularLoader, Checkbox, Help, Chip} from '@dhis2/ui-core'
import {DisplayReport} from '../../../DisplayReport/DisplayReport.js'

import reactRouterDom from 'react-router-dom'
const {HashRouter, Route, Link, withRouter} = reactRouterDom;
	
/*
 * This component is used to select period type and the start and end of the
 * time interval. Time interval is the time period which the user wants 
 * reports from.
 */
export const SelectInterval = withRouter(({selectedFacilityName, selectedFacility, dataSet, loading, setLoading, history}) => {
  //True means showing the component used to display reports.
  const [openReports, setOpenReports] = useState(false)
  //True indicates that selected time interval is invalid.
  const [error, setError] = useState(false)	
  //States used to open helpers to guide user.
  const [defaultButtonHelp, setDefaultButtonHelp] = useState(false)
  const [intervalButtonHelp, setIntervalButtonHelp] = useState(false)	
  //Selected facility	
  const [facility] = useState(selectedFacility)	
  //States related to selecting time interval.
  const [periodType, setPeriodType] = useState('')
  const [to, setTo] = useState(new Date())
  const [from, setFrom] = useState(new Date())
  const [times, setTimes] = useState(null)
	const [clicked, setClick] = useState(null)
  //Indicates if user wants to use data for selected unit only.	
  const [selectedOnly, setSelectedOnly] = useState(false)
	
/*
 * Method creates an array containing the necessary time data to
 * fetch a set of reports from a specified time interval.
 */
 const createInterval = () => { 
  setLoading(true)
  let temp = []	
		 
  //If the user selects period type yearly.
  if (periodType == "3") {
  	let fromYear = from
	let toYear = to
	try {fromYear = fromYear.getFullYear()} catch(err) {}
	try {toYear = toYear.getFullYear()} catch(err) {}
	if (fromYear > toYear) {
		setError(true)
	} else {
		setError(false)
	    for (let y = fromYear; y <= toYear; y++) {
		     temp.push(String(y))
	    }
	}
  } else {
	  
    if (from.getTime() > to.getTime()) {
	 	setError(true)
	} else {
     setError(false)
     let fromDate = from.getDate()
     let fromMonth = from.getMonth() + 1
     let fromYear = from.getFullYear()
     let toDate = to.getDate()
     let toMonth = to.getMonth() + 1
     let toYear = to.getFullYear()	 	
     //If selected period type is daily, monthly or default...
     if (periodType == "0" || periodType == "1" || periodType == '') {
	    //If the user does not pick an interval, then as a default
        //they will be shown the monthly reports from the last 12 months.
	    if (periodType == '') fromYear = fromYear - 1
        //For each year.
        for (let y = fromYear; y <= toYear; y++) {
	        let t = 0
	        if (y == toYear) t = toMonth
	        else t = 12
	        //For each month within the year.
	        while (fromMonth <= t) {	
	   		       //If user selected report type daily...
			       if (periodType == "0") {	
			          //Find the number of days in a month.
				      let d = 0
				      if (fromMonth == t) d = toDate
				      else {
				          if (fromMonth == 2) d = 29 //February
				          else if (fromMonth % 2 == 0 && fromMonth < 8) d = 30
				          else if (fromMonth & 2 != 0 && fromMonth > 7) d = 30
				          else d = 31	
				      }
				      while (fromDate <= d) {
					         //Get the correct String format for fetching.
						     //String is then added to time interval array.
					         let stringMonth = ""
					         let stringDate = ""
					         if (fromMonth < 10) stringMonth = "0" + String(fromMonth)
					         else stringMonth = String(fromMonth)
					         if (fromDate < 10) stringDate = "0" + String(fromDate)
					         else stringDate = String(fromDate)
					         temp.push(String(y) + stringMonth + stringDate)
					         fromDate++
					         if (fromDate > d) {
						         fromDate = 1
						         break
					         }
				      }
			     //If user selected monthly or default period type.	
			     } else {
				   //String is added to time interval array.
			       if (fromMonth < 10) temp.push(String(y) + "0" + String(fromMonth))
			       else temp.push(String(y) + String(fromMonth))
                 }
			     fromMonth++
			     if (fromMonth > 12) {
			 	     fromMonth = 1
				     break
			     }
		  }
	  }
   } 
   //If user selects period type quarterly...
   if (periodType == "2") {
	 for (let y = fromYear; y <= toYear; y++) {
		 let t = 0
		 if (y == toYear) t = toMonth
		 else t = 12
		 while (fromMonth <= t) {
			if (fromMonth == 1) temp.push(String(y) + "Q1")
			else if (fromMonth == 4) temp.push(String(y) + "Q2")
			else if (fromMonth == 7) temp.push(String(y) + "Q3")
			else temp.push(String(y) + "Q4")
				
			fromMonth = fromMonth + 3
			if (fromMonth > 12) {
				fromMonth = 1
				break	
		    }
	   }
     }
    }
   }
  }
   temp.reverse()
	 setLoading(false)
	 return temp
  }

	useEffect(() => {
		if(times) {

			history.push({
				pathname: '/displayreport',
				props: {
					selectedFacility: facility,
					dataSet: dataSet,
					timeInterval: times,
					selectedUnitOnly: selectedOnly,
                    selectedFacilityName: selectedFacilityName
				}
			})
		}
		},[times]);

	const handleClick = (e) =>{
		e.preventDefault();
		setTimes(createInterval());
	}
 return(
    <div className="box"> 
	 <Card className="default-browsing selection-card">
	  <Button 
	   primary 
	   disabled={dataSet == ''}
	   onClick={(e) => {
		         setPeriodType('')

		   handleClick(e)
	           }}
	  >
	   Get monthly forms
	  </Button>
	  <Chip
	   selected={defaultButtonHelp}
	   onClick={() => setDefaultButtonHelp(!defaultButtonHelp)}
	  >?</Chip>
	  { defaultButtonHelp && 
		 <Help>This button will get you the<br/> 
		       monthly form foreach month in<br/> 
			   the last 12 months.
		 </Help> 
	   }
	 </Card>	
	 <div>
	  OR
	 </div>
     <Card className="selection-card interval-browsing">
	  <p>Select period type</p>
	  <SelectField 
	   filled
	   required
	   value={String(periodType)}
	   label="Time interval"
	   name="SelectTime"
	   onChange={event => setPeriodType(event.target.value)}
	  >
	   <option value="0">
		Daily
	   </option>
	   <option value="1">
		Monthly
	   </option>
	   <option value="2">
	    Quarterly
	   </option>
	   <option value="3">
	    Yearly
	   </option>
	  </SelectField>
	   
	  { periodType == "0" ? 
        <DateSelector from={from} setFrom={setFrom} to={to} setTo={setTo}/>
		: <div></div>
	  }  
	  { periodType == "1" ? 
        <MonthSelector from={from} setFrom={setFrom} to={to} setTo={setTo}/> 
	    : <div></div>
	  }
	  { periodType == "2" ?
        <QuarterSelector from={from} setFrom={setFrom} to={to} setTo={setTo}/>
	    : <div></div>
	  }
	  { periodType == "3" ? 
        <YearSelector from={from} setFrom={setFrom} to={to} setTo={setTo}/>
	    : <div></div>
	  }
	   	   
	  <Checkbox
	   label="Use data for selected facility only"
	   name="selectedUnitOnly"
	   value="selectedUnitOnly"
	   onChange={() => setSelectedOnly(!selectedOnly)}
	   checked={selectedOnly}
	  />
	  <Button 
	   primary 
	   disabled={(dataSet == '' || periodType == '')}
	   onClick={(e) => handleClick(e)}
	   >
	   Get forms
	  </Button>
	  <Chip
	   selected={intervalButtonHelp}
	   onClick={() => setIntervalButtonHelp(!intervalButtonHelp)}
	  >?</Chip>
	  { intervalButtonHelp ? 
		 <Help>To click this button, you need to first<br/> 
			   select a period type. If you want more<br/>
			   than one form, change the values of the<br/> 
               dates From and To. This will get you all<br/> 
			   the forms of your selected period type<br/> 
			   which were submitted between these<br/>
			   two dates.
		 </Help> 
		: <div></div> }
	  {error ? <Help error>From cannot be later than To.</Help> : <div></div>}
	 </Card>
	</div> 	
 )
})