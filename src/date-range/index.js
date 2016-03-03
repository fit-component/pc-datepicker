import React from 'react'
import { DateRange } from 'react-date-range'
import defaultRanges from './default-ranges'
import './index.scss'

export default class FitDateRange extends React.Component {
    render() {
        let customOpts = {}

        if (this.props.toolbar) {
            customOpts.ranges = defaultRanges
        }

        return (
            <div className="_namespace">
                <DateRange calendars={this.props.calendars}
                           startDate={this.props.startDate}
                           endDate={this.props.endDate}
                           onChange={this.props.onChange.bind(this)} {...customOpts}/>
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

    // @desc 开始日期
    startDate: ()=> {
    },

    // @desc 结束日期
    endDate: ()=> {
    }
}