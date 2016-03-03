'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDateRange = require('react-date-range');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FitCalendar = function (_React$Component) {
    _inherits(FitCalendar, _React$Component);

    function FitCalendar(props) {
        _classCallCheck(this, FitCalendar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FitCalendar).call(this, props));

        _this.state = {
            value: _this.props.value || _this.props.defaultValue
        };
        return _this;
    }

    _createClass(FitCalendar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_reactDateRange.Calendar, { date: this.state.value,
                onChange: this.props.onChange.bind(this) });
        }
    }]);

    return FitCalendar;
}(_react2.default.Component);

exports.default = FitCalendar;


FitCalendar.defaultProps = {
    // @desc 修改的回调
    onChange: function onChange(date) {},

    // @desc 日期
    value: null,

    // @desc 初始日期
    defaultValue: function defaultValue(now) {
        return now.add(0, 'days');
    }
};