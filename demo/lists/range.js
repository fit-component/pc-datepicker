import React from 'react'
import { DateRange } from 'fit-datepicker'

const defaultValue = {
    startDate: (now) => {
        return now.add(-2, 'days')
    },
    endDate: (now) => {
        return now.add(7, 'days')
    }
}

export default class Demo extends React.Component {
    handleChange(date) {
        console.log(date.startDate.format('YYYY MM DD'), date.endDate.format('YYYY MM DD'))
    }

    defaultValue() {

    }

    render() {
        return (
            <div style={{display:'flex'}}>
                <DateRange onChange={this.handleChange.bind(this)}/>
                <DateRange value={defaultValue}/>
            </div>
        )
    }
}