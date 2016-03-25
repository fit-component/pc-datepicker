import React from 'react'
import { DateInput } from 'fit-datepicker'

const defaultValue = {
    startDate: (now) => {
        return now.add(-2, 'days')
    },
    endDate: (now) => {
        return now.add(7, 'days')
    }
}

export default class Demo extends React.Component {
    render() {
        return (
            <div style={{display:'flex'}}>
                <DateInput defaultValue={now => { return now.add(2, 'days')}}/>
                <DateInput type="dateRange" defaultValue={defaultValue}/>
            </div>
        )
    }
}