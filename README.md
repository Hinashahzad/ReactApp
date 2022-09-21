## Group 14: Data Report System

This application is a solution to case 1: Data Set Report Browser.
The application is a tool which is used to browse data set reports.

## Functionality

The application has the following functionality:
- The user is able to select a facility to read reports from.
- The user is not able to see or select a facility they do not have access rights to.
- If the user only has access to one facility, they cannot select facility. Instead 
  that one facility is automatically selected.
- The user is able to select a data set to see reports from.
- The user is not able to see or select data sets they do not have access rights to.
- If the user only has access to one data set, they do not get to select a data set. 
  Instead that one data set is selected automatically.
- The user is able to select a period type for the data set reports.
- Once a user has selected a data set report, that data set report is displayed to the user.
- The user can select to get a set of reports of a specific period type. First, the user selects
  period type, then a start and end value for the set. The user will then get all 
  reports of that type within the selected interval. For example, the user selects period type 
  monthly and sets start to be January 2019 and end to be November 2019. The user will then get 
  the monthly report for the selected data set and facility for the following months in order: 
  November 2019, October 2019, September 2019, August 2019. The user will always gets the most 
  recent report first.
- If the user does not select a period type then as a default the will get the monthly reports
  from the last year.
- If the set of reports selected by the user contains more than one report, then the user can
  navigate between the different reports by clicking previous and next.
- The user can send a report to another person via email by clicking the share button.
- The user can search for data sets by name.
- The user interface is responsive and works for different-sized screens.
- The application uses two types of data sets, some that can be fetched as a HTML document,
  and some that can't be fetched as a HTML document. If the user fetches a report from a data
  set that can be fetched as a HTML document, the report is displayed in the application. If
  the data set cannot be fetched as a HTML document, then a link is displayed which links to
  the report data.
  
  ## Implementation
  
  The application is divided into three main components:
  - Main: Used to select organization unit.
  - SelectDataSetAndPeriod: Used to select data set and period type.
  - DisplayReport: Used to read reports.
  
  The application works as a downward communication accumulator, where each component 
  represents a step in the process to get data set reports. First Main gets the id of 
  the selected organization unit, then Window2 gets the id of the data set and 
  calculates the appropriate set of periods (ex. {November 2019, October 2019, 
  September 2019}), and finally Window3 uses all the accumulated data to get the 
  correct data set reports.
  
  
  ## Missing functionality
  
  The fundamental requirements are all covered. However, the period type selection feature
  should ideally be more extensive. The final version allows the user to select period
  types daily, monthly, quarterly, and yearly. Many of the report types from the original
  report browsing system were not included because they were considered to not be usefull
  for the end user. However, there are period types which were not included that are
  usefull, but were cut for time. These period types include weekly and six-monthly.
