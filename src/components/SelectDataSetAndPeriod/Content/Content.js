import React, {useState, useEffect} from 'react'
import {SelectDataSet} from './SelectDataSet/SelectDataSet'
import {SelectInterval} from './SelectInterval/SelectInterval'
import './style.css'	
	
/*
 * This component contains the main contents of the SelectDataSetAndPeriod 
 * component.
 */ 
export const Content = ({selectedFacilityName, selectedFacility}) => {
 const [loading, setLoading] = useState(true)
 const [facility] = useState(selectedFacility)
 const [dataSet, setDataSet] = useState('') //Selected data set
 
return(
 <> 
   <SelectDataSet 
	loading={loading} 
	setLoading={setLoading} 
	dataSet={dataSet} 
	setDataSet={setDataSet}
   /> 
   <SelectInterval
       selectedFacilityName={selectedFacilityName}
	selectedFacility={facility} 
	dataSet={dataSet} 
	loading={loading} 
	setLoading={setLoading}
   />	   
 </>
 )
}