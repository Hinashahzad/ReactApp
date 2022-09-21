import React, {useEffect, useState} from 'react'
import {useDataQuery, useDataMutation} from '@dhis2/app-runtime'
import {Node, InputField} from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { SelectDataSetAndPeriod } from './SelectDataSetAndPeriod/SelectDataSetAndPeriod'
import './App.css'
import reactRouterDom from 'react-router-dom'
import { organisationUnits} from './Main/Main'
import {DisplayReport} from './DisplayReport/DisplayReport'



const baseUrl = 'http://localhost:3000'

const {HashRouter, Route} = reactRouterDom;
const App = () => {
    return(
    <HashRouter>
        <Route exact path="/" component={organisationUnits} />
        <Route exact path="/dataset/:id" render={(props) => <SelectDataSetAndPeriod {...props}/>}/>
        <Route exact path="/displayreport" render={(props) => <DisplayReport {...props}/>}/>

    </HashRouter>)
}


export default App;