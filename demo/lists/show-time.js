import React from 'react'
import { DateInput } from 'fit-datepicker'
import Button from 'fit-button'

export default class Demo extends React.Component {
    handleCalendarChange(date) {

    }

    handleDateRangeChange(date) {

    }

    render() {
        return (
            <div style={{display:'flex'}}>
                <DateInput type="calendar"
                           showTime
                           onChange={this.handleCalendarChange.bind(this)}/>
                <DateInput style={{marginLeft:10}}
                           type="dateRange"
                           width="400"
                           showTime
                           onChange={this.handleDateRangeChange.bind(this)}/>
            </div>
        )
    }
}