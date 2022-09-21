import React, {useState, useEffect} from 'react'
import {Modal, ButtonStrip, Button, InputField, Card, ScreenCover, CircularLoader, Help} from '@dhis2/ui-core'
import {Form} from './Form/Form'
import './DisplayReport.css'

import reactRouterDom from 'react-router-dom'
const {HashRouter, Route, Link, withRouter} = reactRouterDom;
/**
 * Method sets the base url used for fetching reports.
 */
 const get = async endpoint => {
    return (await fetch(`${baseUrl}${endpoint}`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "text/html"
        }
    })).text()
}
 
//Base url used when fetching reports.
const baseUrl = "https://course.dhis2.org/dhis/api/"


	 
	 //setOpenReports, dataSet, selectedFacility, selectedUnitOnly, timeInterval, onCancel
	 
/*
 * This component is used to display data set reports.
 */
export const DisplayReport = withRouter((props) => {
	if(!props.location.props || props.location.props === undefined){
		props.history.replace({
			pathname: '/'
		})
	}

	if(props.location.props !== undefined) {
		const [dataset] = useState(props.location.props.dataSet)
		const [facility] = useState(props.location.props.selectedFacility)
		const [selectedOnly] = useState(props.location.props.selectedUnitOnly)
		const [interval] = useState(props.location.props.timeInterval)
		const [facilityName] = useState(props.location.props.selectedFacilityName)
		//Current is the current position in the interval array.
		const [loading, setLoading] = useState(true)
		const [reportHTML, setReportHTML] = useState("") //Report
		const [openShare, setOpenShare] = useState(false)
		const [current, setCurrent] = useState(0)
		const [canBeDisplayed, setCanBeDisplayed] = useState(true)
		const [error, setError] = useState(false)
		const [url, setUrl] = useState('')

		/**
		 * Method fetches a data set report from the API.
		 */
		const getData = async () => {
			setLoading(true)
			let url = `dataSetReport/custom?ds=${dataset}&pe=${interval[current]}&ou=${facility}&selectedUnitOnly=${selectedOnly}`
			let response = ''
			try {
				response = await get(url)
			} catch (e) {
				setError(true)
			}
			if (response.includes(409) && response.includes("ERROR")) {
				setCanBeDisplayed(false)
				setUrl(`dataSetReport?ds=${dataset}&pe=${interval[current]}&ou=${facility}&selectedUnitOnly=${selectedOnly}`)
			} else {
				setCanBeDisplayed(true)
				setUrl(url)
			}
			setReportHTML(response)
			setLoading(false)
		}

		/**
		 * When the user clicks the previous button, the value of the state current is
		 * updated, which directs the user to the previous report.
		 */
		const previous = () => {
			if (current > 0) setCurrent(current - 1)
		}

		/**
		 * When the user clicks the next button, the value of the state current is
		 * updated, which directs the user to the next report.
		 */
		const next = () => {
			if (current < interval.length - 1) setCurrent(current + 1)
		}

		/*
         * Whenever the value of the state current changes, a new report is fetched.
         */
		useEffect(() => {
			getData()
		}, [current])

		const handleBack = (e) => {
			e.preventDefault();
			props.history.replace({
				pathname: '/dataset/' + facilityName,
				id: facility
			})
		}
		return (
			<div className="section">
				<ButtonStrip>
					<Button className="previous"
							onClick={previous}
							disabled={current == 0}
					>Previous</Button>
					<h2>Report {current + 1} of {interval.length}</h2>
					<Button className="next"
							onClick={next}
							disabled={current + 1 == interval.length}
					>Next</Button>
				</ButtonStrip>
				<div className="report">
					{error && (<Help error>Couldn't get report. Please check your internet connection.</Help>)}
					{loading ? <CircularLoader/> : (
						canBeDisplayed ?
							<span className="reportSpan" dangerouslySetInnerHTML={{__html: reportHTML}}></span>
							: <a href={`${baseUrl}${url}`} target="_blank">Read report</a>
					)}
				</div>
				<div>
						{openShare && (<Form url={url}/>)}
					<div className={"displayButtons"}>
					<Button className="pretty-button" onClick={() => setOpenShare(!openShare)}
							primary> Share </Button>
					<Button className="pretty-button" onClick={(e) => handleBack(e)}> Back</Button>
					</div>
				</div>
			</div>
		)
	}else{
		return <>Loading</>
	}
})