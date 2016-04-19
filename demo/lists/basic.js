import React from 'react'
import Calendar from 'fit-datepicker'

export default class Demo extends React.Component {
    handleChange(date) {
        console.log(date.format('YYYY MM DD'))
    }

    render() {
        return (
            <div style={{display:'flex'}}>
                <Calendar onChange={this.handleChange.bind(this)}/>
                <Calendar value={now => { return now.add(2, 'days')}}/>
            </div>
        )
    }
}