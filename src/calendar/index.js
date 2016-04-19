import React from 'react'
import classNames from 'classnames'
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
        const {className, onInit, onChange, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        return (
            <Calendar {...others} className={classes}
                                  date={this.state.value}
                                  onInit={onInit.bind(this)}
                                  onChange={onChange.bind(this)}/>
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
    },

    // @desc 初始化
    onInit: (date)=> {
    }
}