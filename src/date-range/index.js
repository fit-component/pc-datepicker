import React from 'react'
import { DateRange } from 'react-date-range'
import defaultRanges from './default-ranges'
import classNames from 'classnames'
import './index.scss'

export default class FitDateRange extends React.Component {
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
        const {className, toolbar, onInit, calendars, onChange, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        let customOpts = {}

        if (toolbar) {
            customOpts.ranges = defaultRanges
        }

        return (
            <div {...others} className={classes}>
                <DateRange startDate={this.state.value&&this.state.value.startDate}
                           endDate={this.state.value&&this.state.value.endDate}
                           onInit={onInit.bind(this)}
                           calendars={calendars}
                           onChange={onChange} {...customOpts}/>
            </div>
        )
    }
}

FitDateRange.defaultProps = {
    // @desc 修改时回调
    onChange: ()=> {
    },

    // @desc 日历数量
    calendars: 1,

    // @desc 是否显示左侧工具栏
    toolbar: false,

    // @desc 日期
    value: null,

    // @desc 初始日期
    defaultValue: {
        startDate: (now) => {
            return now.add(0, 'days')
        },
        endDate: (now) => {
            return now.add(0, 'days')
        }
    },

    // @desc 初始化
    onInit: (date)=> {
    }
}