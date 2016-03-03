import React from 'react'
import ReactDOM from 'react-dom'
import Calendar from '../calendar'
import DateRange from '../date-range'
import TimePicker from 'fit-timepicker'
import Input from 'fit-input'
import $ from 'jquery'
import classNames from 'classnames'
import parseInput from '../lib/parse-input'
import './index.scss'

export default class DateInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCalendar: false,
            position: 'bottom',
            formatString: '',
            date: '',
            startDate: '',
            endDate: '',
            value: this.props.value || this.props.defaultValue
        }

        this.handleDocumentClick = (event)=> {
            if (!$.contains(this.$dom[0], event.target)) {
                this.setState({
                    showCalendar: false
                })
            }
        }
    }

    componentWillMount() {
        if (this.state.value) {
            let value = ''
            if (this.props.type === 'calendar') {
                let date = parseInput(this.state.value)
                if (this.props.showTime) {
                    value = date.format('YYYY-MM-DD HH:mm:ss')
                } else {
                    value = date.format('YYYY-MM-DD')
                }
            } else {
                let stateDate = parseInput(this.state.value.startDate)
                let endDate = parseInput(this.state.value.endDate)
                if (this.props.showTime) {
                    value = stateDate.format('YYYY-MM-DD HH:mm:ss') + ' - ' + endDate.format('YYYY-MM-DD HH:mm:ss')
                } else {
                    value = stateDate.format('YYYY-MM-DD HH:mm:ss') + ' - ' + endDate.format('YYYY-MM-DD HH:mm:ss')
                }
            }

            this.setState({
                formatString: value
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        $(document).on('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        $(document).off('click', this.handleDocumentClick)
    }

    handleFocus() {
        let position = 'bottom'
        if (this.$dom.offset().top > 360) {
            position = 'top'
        }

        this.setState({
            showCalendar: true,
            position: position
        })
    }

    // 清空日历
    handleIconClick() {
        this.inputInstance.clear()
        this.props.onChange(this.state.date)

        this.setState({
            formatString: '',
            startDate: null,
            endDate: null
        })
    }

    // 单个日历日期修改
    handleCalendarChange(date) {
        let format
        let newDate = date.clone()
        if (this.props.showTime) {
            if (this.dateTimepickerMoment) {
                newDate.hour(this.dateTimepickerMoment.hour())
                newDate.minute(this.dateTimepickerMoment.minute())
                newDate.second(this.dateTimepickerMoment.second())
            }

            this.props.onChange(newDate)
            format = newDate.format('YYYY-MM-DD HH:mm:ss')
        } else {
            this.props.onChange(newDate)
            format = newDate.format('YYYY-MM-DD')
        }

        this.calendarMoment = date

        this.setState({
            date: format,
            formatString: format,
            value: newDate
        })
    }

    // 范围日历修改日期
    handleDateRangeChange(date) {
        let format
        let formatString
        let start = date.startDate.clone()
        let end = date.endDate.clone()

        if (this.props.showTime) {
            if (this.startDateTimepickerMoment) {
                start.hour(this.startDateTimepickerMoment.hour())
                start.minute(this.startDateTimepickerMoment.minute())
                start.second(this.startDateTimepickerMoment.second())
            }

            if (this.endDateTimepickerMoment) {
                end.hour(this.endDateTimepickerMoment.hour())
                end.minute(this.endDateTimepickerMoment.minute())
                end.second(this.endDateTimepickerMoment.second())
            }

            this.props.onChange({
                startDate: start,
                endDate: end
            })

            format = {
                start: start,
                end: end
            }
            formatString = start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss')
        } else {
            this.props.onChange(date)
            format = {
                start: date.startDate,
                end: date.endDate
            }
            formatString = format.start.format('YYYY-MM-DD') + ' - ' + format.end.format('YYYY-MM-DD')
        }

        this.dateRangeMoment = date

        //console.log(start, end)
        this.setState({
            startDate: format.start,
            endDate: format.end,
            formatString: formatString,
            value: {
                startDate: start || null,
                endDate: end || null
            }
        })
    }

    handleTimepicker(type, moment) {
        this[type + 'TimepickerMoment'] = moment
        if (type === 'date' && this.calendarMoment) {
            this.handleCalendarChange(this.calendarMoment)
        } else if (this.dateRangeMoment) {
            this.handleDateRangeChange(this.dateRangeMoment)
        }
    }

    render() {
        let calendarContainerClass = classNames({
            'calendar-container': true,
            [this.state.position]: true,
            'show-time': this.props.showTime,
            'show': this.state.showCalendar,
            'hide': !this.state.showCalendar
        })

        let CalendarComponent = (
            <Calendar value={this.state.value}
                      onChange={this.handleCalendarChange.bind(this)} {...this.props.calendarOpts}/>
        )

        if (this.props.type === 'dateRange') {
            CalendarComponent = (
                <DateRange onChange={this.handleDateRangeChange.bind(this)}
                           value={this.state.value}
                           calendars="2"
                           toolbar {...this.props.calendarOpts}/>
            )
        }

        let TimePickerComponent = null
        if (this.props.showTime) {
            if (this.props.type !== 'dateRange') {
                TimePickerComponent = (
                    <TimePicker input={{styles:{input:{borderLeft:'none',borderTop:'none',borderRight:'none'}}}}
                                onChange={this.handleTimepicker.bind(this,'date')}/>
                )
            } else {
                TimePickerComponent = (
                    <div style={{display:'flex'}}>
                        <TimePicker onChange={this.handleTimepicker.bind(this,'startDate')}
                                    style={{flexGrow:1}}
                                    input={{styles:{input:{borderLeft:'none',borderTop:'none',borderRight:'none'}}}}/>
                        <TimePicker onChange={this.handleTimepicker.bind(this,'endDate')}
                                    style={{flexGrow:1}}
                                    input={{styles:{input:{borderRight:'none',borderTop:'none'}}}}/>
                    </div>
                )
            }
        }

        return (
            <div className="_namespace"
                 style={this.props.style}>
                <Input onFocus={this.handleFocus.bind(this)}
                    {...this.props.input}
                       value={this.state.formatString}
                       placeholder={this.props.type==='dateRange'?'开始日期 ~ 结束日期':null}
                       width={this.props.width||350}
                       icon="calendar"
                       handleIconClick={this.handleIconClick.bind(this)}
                       ref={(ref) => {
                           this.inputInstance = ref
                       }}
                       style={{width:this.props.width}}/>

                {this.state.showCalendar ?
                    <div className={calendarContainerClass}>
                        {TimePickerComponent ? TimePickerComponent : null}
                        {CalendarComponent}
                    </div> : null}
            </div>
        )
    }
}

DateInput.defaultProps = {
    // @desc 修改回调
    onChange: ()=> {
    },

    // @desc 日历参数,参考 react-date-range
    calendarOpts: {},

    // @desc 日期类型,分为单日历和范围日历
    // @enum calendar dateRange
    type: 'calendar',

    // @desc 是否精确到时分秒
    showTime: false,

    // @desc 日期
    value: null,

    // @desc 初始日期
    defaultValue: null
}