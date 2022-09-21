import React, {useState, useEffect} from 'react'
import {InputField, Card, Radio, CircularLoader, Help} from '@dhis2/ui-core'
import {useDataQuery} from '@dhis2/app-runtime'
import './style.css'

/*
 * Query used to fetch all data sets.
 */
const getAllDataSets = {
	datasets: {
		resource: 'dataSets/',
		params: {
			fields: 'id, displayName',
		}
	}
}
	
/*
 * Query used to fetch the user's data sets.
 */
const getUsersDatasetsQuery = {
 me: {
 	resource: 'me',
	params: {
	 fields: 'dataSets'
	}
 }
}


/*
 * Component used to select a data set.
 */
export const SelectDataSet = ({loading, setLoading, dataSet, setDataSet}) => {		
 const {data: datasets, error} = useDataQuery(getAllDataSets) //Fetch all data sets.	
 const {data, error: fail} = useDataQuery(getUsersDatasetsQuery) //Fetch user's data sets.
 const [searchWord, setSearchWord] = useState(null) //Search term for searching datasets.	
 const [allSets, setAllSets] = useState([]) //All available data sets.
 const [selectedSets, setSelectedSets] = useState([]) //Data sets currently being displayed.
		
 /**
  * Method finds all data sets whose name start with the given search word.
  */
 const search = (txt) => {
  setLoading(true)
  setSearchWord(txt)
  let temp = []
  for (let i = 0; i < allSets.length; i++) {
   if (allSets[i].displayName.toLowerCase().startsWith(txt.toLowerCase())) {
   	   temp.push(allSets[i])
      }
  } 
  setSelectedSets(temp)
  setLoading(false)
 }
 
 /*
  * When the user's data sets have been fetched the state selectedSets is updated.
  */
 useEffect(() => {
 if (data) {
	 setSelectedSets(data.me.dataSets)
	 //If both data and datasets have been fetched, go through
	 //every element in data to find the corrsponding element in datasets.
	 //This is necessary to find the display name for the user's data sets.
     if (datasets) {
        let temp = []
        for (let i = 0; i < data.me.dataSets.length; i++) { 
	        for (let s = 0; s < allSets.length; s++) {
		         if (data.me.dataSets[i] == allSets[s].id) {
		 	         temp.push(allSets[s])
		         }
	        }
        }
        setAllSets(temp)
        setSelectedSets(temp)
		//If the user only has one dataset then it is selected automatically.
		if (temp.length == 1) setDataSet(temp[0].id)
        setLoading(false)
   }
 }
}, [data])	
	
/*
 * When all datasets have been fetched, state allSets is updated.
 */	
useEffect(() => {
 if (datasets) {
	 setAllSets(datasets.datasets.dataSets)
	 //If both data and datasets have been fetched, go through
	 //every element in data to find the corrsponding element in datasets.
	 //This is necessary to find the display name for the user's data sets.
     if (data) {
        let temp = []
        for (let i = 0; i < selectedSets.length; i++) { 
	        for (let s = 0; s < datasets.datasets.dataSets.length; s++) {
		         if (selectedSets[i] == datasets.datasets.dataSets[s].id) {
		 	         temp.push(datasets.datasets.dataSets[s])
		         }
	        }
        }
        setAllSets(temp)
        setSelectedSets(temp)
		//If the user only has one dataset then it is selected automatically.
		if (temp.length == 1) setDataSet(temp[0].id)
        setLoading(false)
   }
 }
}, [datasets])
		
 return(
	 <div className="box">
      <Card className="selection-card"> 
       {(error | fail) ? <Help error>Could not find datasets. Please check your internet connection</Help>: <div></div>}
	   <div className="sets"> 
        {loading ? <CircularLoader/> : (selectedSets.map( i => (
	     <Radio
	      key={i.id}
	      label={String(i.displayName)}
	      name={String(i.displayName)}
	      value={String(selectedSets.displayName)}
	      onChange={() => {setDataSet(i.id)}}
		  checked={dataSet == i.id}
	     />	
	    )))
	   }
	  </div>		
      <InputField
	   placeholder="Search..."
	   value={searchWord}
	   name="search-field"
	   label="Search"
	   onChange={function (evt) {search(evt.target.value)}}
	  />
     </Card>
    </div>		
 )
}