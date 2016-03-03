import React from 'react'
import { Calendar } from 'react-date-range'

export default class FitCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || this.props.defaultValue
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    render() {
        return (
            <Calendar date={this.state.value}
                      onChange={this.props.onChange.bind(this)}/>
        )
    }
}

FitCalendar.defaultProps = {
    // @desc 修改的回调
    onChange: (date)=> {
    },

    // @desc 日期
    value: null,

    // @desc 初始日期
    defaultValue: (now) => {
        return now.add(0, 'days')
    }
}