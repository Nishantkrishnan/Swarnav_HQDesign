import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';

class DatePicker extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.offClickHandler = this.offClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.offClickHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.offClickHandler, false);
  }

  offClickHandler(event) {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.props.onOutSideClick();
    }
  }

  render() {
    const { className, month, disabledDays, onDayClick } = this.props;
    return (
      <DayPicker
        className={className}
        month={new Date(month.getFullYear(), month.getMonth(), month.getDate())}
        disabledDays={[...disabledDays]}
        onDayClick={(day, disabled) => { onDayClick(day, disabled); }}
      />
    );
  }
}

export default DatePicker;
