import React, { useState, useEffect} from 'react'
import { useDataQuery} from '@dhis2/app-runtime'
import { Button, Modal, SelectField, Chip } from '@dhis2/ui-core'
import './Main.css'
import reactRouterDom from 'react-router-dom'
import {TreeDisplay} from './TreeDisplay/TreeDisplay' 
const { withRouter } = reactRouterDom;



const userQuery = {
    organisationUnits: {
        "resource": "me",
        "params": {
          "fields": "organisationUnits[id,displayName]"
        }
    }       
}

let facilitiesQuery = {
    organisationUnits: {
        resource: 'organisationUnits/',
        id: ({ id }) => id,
        params: {
            fields: 'id,displayName,level,children[id,displayName, level,children[id, displayName, level, children[id, displayName, level]]]'
        }
    }
}


/*
 * Handles which facility is selected and navigation to next window.
 */
const SelectedOrgUnits = withRouter((props) => {
    const [items2, setItems2] = useState({
        user: props.data
    })

    let { user } = items2
    let selectedId = null;
    let selectedName = null;

    function handleChange(e, name) {
        selectedId = e;
        selectedName = name;
    }

    const handleClick = (e) => {
        e.preventDefault();
        let name = selectedName ? selectedName : user.displayName;
        let id = selectedId ? selectedId : user.id;
        props.history.push({
            pathname: '/dataset/' + name,
            id: id
        })
    }

    return (
        <>
            {items2 &&
                <TreeDisplay handleChange={handleChange} key={user.id} data={user} beOpen={true} />
            }

            <Button primary
                className="next-button"
                type="button"
                onClick={handleClick}>Next</Button>
        </>
    )
});


/*
 * Fetches the tree data and sends it as props to child components.
 * Also handles case where user only has access to one facility.
 */
const GetOrgUnitsOnSelect = withRouter(( props ) => {
    JSON.stringify(props.OrgUnit)
    const { refetch, error, loading, data } = useDataQuery(facilitiesQuery, {
        variables: {
            id: props.OrgUnit
        }
    });

    useEffect(()=>{
        refetch({id: props.OrgUnit}
        )
    },[props.OrgUnit])
    

    if (loading) {
        return <><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></>
    }

    if (error) {
        return <span> Error </span>
    }

    //Checks if user has access to more than one facility.
    if (data) {
        if (data.organisationUnits.children) {
            if (data.organisationUnits.children.length > 0) {
                return (
                    <>
                        <h3 className={"item-paragraph"}>Select facility to read reports from</h3>
                        <SelectedOrgUnits data={data.organisationUnits} />
                    </>
                )
            }else{
                props.history.push({
                    pathname: '/dataset/'+data.organisationUnits.displayName,
                    id: data.organisationUnits.id
                })
                return <>""</>
            }
        }else{
            props.history.push({
                pathname: '/dataset/'+data.organisationUnits.displayName,
                id: data.organisationUnits.id
            })
            return <>""</>

        }


    }
})

const HelpModal = ({ toggle }) => {
    return (
        <>
            <Modal open small>
                <Modal.Title>
                    Using dataset reports
                </Modal.Title>
                <Modal.Content>
                    <p>
                        Dataset reports are printer friendly views of the data entry screen filled with either raw or aggregated data.
                        These are only available for data sets that have custom data entry forms and not for default or section forms.
                    </p>
                    <p>
                        You can access data set reports from the Report menu under Services.
                    </p>
                    <p>
                        <b>A Criteria window will appear where you fill in the details for your report:</b>
                    </p>
                    <p>
                        <b>Dataset:</b> The data set you want to display.
                    </p>
                    <p>
                        <b>Reporting period:</b> The actual period you want data for. This can be aggregated as well as raw periods.
                        This means that you can ask for a quarterly or annual report even though the data set is collected monthly.
                        A data set's period type (collection frequency) is defined in data set maintenance.
                        First select the period type (Monthly, Quarterly, Yearly etc.)
                        in the drop down next to Prev and Next buttons, and then select one of the available periods from the dropdown list below.
                        Use Prev and Next to jump one year back or forward.
                    </p>
                        <b>Use data for selected unit only:</b> Use this option if you want a report for an orgunit that has children, but only want the data collected directly for this unit and not the data collected by its children.
                        If you want a typical aggregated report for an orgunit you do not want to tick this option.
                    <p>
                        <b>Reporting Organisation unit:</b> Here you select the orgunit you want the report for.
                        This can be at any level in the hierarchy as the data will be aggregated up to this level automatically (if you do not tick the option above).
                    </p>
                    <p>
                        When you are done filling in the report criteria you click on "Generate". The report will appear in html view in a printer-friendly format.
                        Use print and save as functions in the browser to print or save (as html) the report.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={e => toggle()}
                        primary
                        type="button"
                    >
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}


/*
 * Fetches the user data to be able to display the right tree for the user.
 */
export const organisationUnits = () => {
    const [modalShow, setModalShow] = useState(false)
    const { loading, error, data } = useDataQuery(userQuery)
    const [ facility, setFacility] = useState("");

    const toggleModal = () => {
        setModalShow(!modalShow)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setModalShow(true)
    }
    if (loading) return <span> Loading </span>
    if (error) return <span> Error </span>
    if (data) {
        let selector = data.organisationUnits.organisationUnits.map((orgUnit) => (
            <option key={orgUnit.id} value={orgUnit.id}>{orgUnit.displayName}</option>
            ));

        return (<div className={"container"}>
            <h1>Data Set Report</h1>
            <div className={"chip"}>
            {modalShow && <HelpModal toggle={toggleModal} />}
            <Chip
                selected={modalShow}
                onClick={handleClick}
            >?</Chip>
            </div>
            <SelectField
                name={"Default"}
                label={"Organisation Units"}
                value={String(facility)}
                onChange={(e) => setFacility(e.target.value)}
            >
                {selector}
            </SelectField>
            {facility!== "" ? <GetOrgUnitsOnSelect OrgUnit={facility} beOpen={true}/> : <h3>Select Organisation Unit from dropdown menu</h3>}
        </div>)
    }
}