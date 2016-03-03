import React from 'react'
import { DateRange } from 'react-date-range'
import defaultRanges from './default-ranges'
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
        let customOpts = {}

        if (this.props.toolbar) {
            customOpts.ranges = defaultRanges
        }

        return (
            <div className="_namespace">
                <DateRange startDate={this.state.value&&this.state.value.startDate}
                           endDate={this.state.value&&this.state.value.endDate}
                           onInit={this.props.onInit.bind(this)}
                           calendars={this.props.calendars}
                           onChange={this.props.onChange} {...customOpts}/>
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