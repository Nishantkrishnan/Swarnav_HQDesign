import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../../containers/Loader/Loader';
import bookFacilitySelector from './BookFacility.selectors';
import { fetchAvailableFacilityDates, fetchAvailableFacilitySlots } from './BookFacility.actions';
// import Button from '../../../components/Button/Button';
import Wrapper from '../../hoc/Wrapper';
import ConfirmBooking from './ConfirmBooking';
import styles from './BookFacility.css';
import{ Grid,Button, withStyles,Card,Typography,Hidden,MenuItem,Select,Input,CardContent, CardMedia,GridList,GridListTile,ListSubheader, CardActions,InputBase} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
const design = theme => ({
  meetingRoomsCard:{
    width: "66%",
    ["@media (max-width:70em)"]: {
     width:'100%'
    },
  }
});
export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(255,0,0,0.7)',

        },

    },
})
class BookFacility extends Component {
  state = {
    date: new Date(),
    open: false,
    selectedDate: new Date("2014-08-18T21:11:54"),
    times: [],
    timeOptions: [
      {
        time: "09:00 - 10:00 AM",
        timeId: "01"
      },
      {
        time: "10:00 - 11:00 AM",
        timeId: "02"
      },
      {
        time: "11:00 - 12:00 PM",
        timeId: "03"
      },
      {
        time: "12:00 - 01:00 PM",
        timeId: "04"
      },
      {
        time: "01:00 - 02:00 PM",
        timeId: "05"
      },
      {
        time: "02:00 - 03:00 PM",
        timeId: "06"
      },
      {
        time: "03:00 - 04:00 PM",
        timeId: "07"
      },
      {
        time: "04:00 - 05:00 PM",
        timeId: "08"
      }
    ]
  };
  handleChangeTime = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  toggleCreatePostDialog = () => {
    const { open } = this.state;
    this.setState({
      ...this.state,
      open: true
    });
  };
  toggleCreatePostDialogClose = () => {
    const { open } = this.state;
    this.setState({
      ...this.state,
      open: false
    });
  };
  state = {
    proceedBooking: false,
  }
  handleBookingClick = () => {
    const proceedBooking = !this.state.proceedBooking;
    this.setState({ proceedBooking });
  }
  handleBookingBack = (e) => {
    this.setState({
      proceedBooking: false
    });
  }
  componentDidMount()
  {
    document.title = "GoodWorks HQ - Facility";
  }
  static propTypes = {
    dispatch: PropTypes.func,
    facilityId: PropTypes.number,
    facilityName: PropTypes.string,
    availableMonths: PropTypes.object,
    availableDays: PropTypes.object,
    availableSlots: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      availableMonths: null,
      availableDays: null,
      availableSlots: null,
      activeClass: {
        month: '',
        day: '',
      },
      selectedSlots: [],
      cnfBooking: false,
    };
  }
  componentDidMount() {
    debugger
    this.props.dispatch(fetchAvailableFacilityDates(this.props.facilityId, this.props.currentLocation.toJS().id));
    document.title = "GoodWorks HQ - Book Facility";
  }
  componentWillReceiveProps(props) {
    debugger
    if (props.availableMonths) {
      this.setState({ availableMonths: props.availableMonths.date });
    }
    if (props.availableDays) {
      this.setState({ availableDays: props.availableDays.date });
    }
    if (props.availableSlots) {
      this.setState({ availableSlots: props.availableSlots.slots });
    }
  }
  handleMonthClick = (year, month) => {
    debugger
    console.log(year,"year")
    console.log(month,"month")
    this.props.dispatch(fetchAvailableFacilityDates(this.props.facilityId, this.props.currentLocation.toJS().id, year, month));
    this.setState({
      activeClass: Object.assign({}, { ...this.state.activeClass }, { month: year + month, day: '' }),
      selectedSlots: [],
      availableDays: null,
      availableSlots: null,
    });
  }
  handleDayClick = (date) => {
    this.props.dispatch(fetchAvailableFacilitySlots(this.props.facilityId, this.props.currentLocation.toJS().id, date));
    this.setState({
      activeClass: Object.assign({}, { ...this.state.activeClass }, { day: date }),
      selectedSlots: [],
      availableSlots: null,
    });
  }
  handleSlotClick = (e, fromTime, toTime) => {
    e.currentTarget.classList.toggle(styles.active);
    const selectedSlot = {
      facility_id: this.props.facilityId,
      from_time: fromTime,
      to_time: toTime,
    };
    const selectedSlots = [...this.state.selectedSlots];
    const keys = Object.keys(selectedSlot);
    if (selectedSlots.some(item => (
      item.from_time === selectedSlot.from_time &&
      item.to_time === selectedSlot.to_time))) {
      // remove element from the array by index by checking all property values are equal.
      selectedSlots.splice(
        // get the index of the element and check all property values are equal.
        selectedSlots.findIndex(obj => keys.every(k => (selectedSlot[k] === obj[k]))), 1);
    } else {
      selectedSlots.push(selectedSlot);
    }
    this.setState({ selectedSlots });
  }
  handleNavChangeClick = () => {
    const cnfBooking = !this.state.cnfBooking;
    this.setState({ cnfBooking });
  }
  render() {
    console.log(this.state,"state")
    if (!this.state.availableMonths) {
      return (<Loader />);
    }
    // if (this.state.cnfBooking) {
    //   return (
    //     <ConfirmBooking
    //       handleChangeClick={this.handleNavChangeClick}
    //       selectedSlots={this.state.selectedSlots}
    //       facilityName={this.props.facilityName}
    //       facilityId={this.props.facilityId}
    //     />
    //   );
    // }
    return (
      <Wrapper>
          <Card  style={{boxShadow:'none'}}>
            <Button  onClick={(e) => this.props.handleBackBtnClick(e) } >
            <i class="material-icons">keyboard_backspace</i>
            </Button>

        {/* <h1>Booking details for {this.props.facilityName}</h1> */}

      {this.state.availableMonths &&
      <div>




        <Card
          style={{
            display: "inline-flex",
            boxShadow: "none",
            background: "#EDEDED",
            height: "15vh"
          }}
        >
          <CardMedia
            style={{
              height: "100%",
              width: "20%",
              paddingLeft: "1%",
              paddingRight: "1%",
              paddingTop: "1%",
              paddingBottom: "1%"
            }}
            component="img"
            image={this.props.facility.images[0].original}
          />

          <Typography style={{ marginTop: "4%", fontSize: "18px" }}>
          {this.props.facility.title}
          </Typography>

        </Card>
        <Typography style={{ fontSize: "14px", marginBottom: "1%" }}>
          Select preferred date & time
        </Typography>
        <Grid container>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={6}
            style={{ background: "", marginLeft: "%" }}
          >
            <Typography
              style={{

                border: "1px solid #DADADA",
                borderRadius: "5px",
                borderRadius: "5px",
                // height:'120%',
                paddingLeft: "2%",
                width: "90%"
              }}
            >
               <MuiThemeProvider theme={customTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}  style={{backgroundColor: "red",}}>



                      <KeyboardDatePicker style={{width:'98%'}}


InputProps={{
disableUnderline: true,
}}
                      variant="inline"

                        value={this.state.date}
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"

                        value={this.state.selectedSlot}
                        // onChange={this.handleMonthClick}
                        onClick={() => { this.handleMonthClick(item.year, item.month) }}
                        // onClick={() => { this.handleDayClick(item.date); }}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />




              </MuiPickersUtilsProvider>
              </MuiThemeProvider>
            </Typography>
          </Grid>
          {this.state.availableMonths &&
          this.state.activeClass.month !== '' &&
          !this.state.availableDays &&
          <Loader />
        }

          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={6}
            style={{ background: "", paddingLeft: "1%" }}
          >
            <Typography
              style={{
                background: "#FFFFFF",
                border: "1px solid #DADADA",
                borderRadius: "5px",
                borderRadius: "5px",
                height: "95%",
                paddingLeft: "2%"
              }}
              value={this.props.someText}
              // onChange={this.handleChangeTime}
            >
              <Grid container>
                <Grid item lg={11} md={11} sm={11} xs={11} style={{ background: "" }}>
                <Select
                      // multiple
                      disableUnderline
                      displayEmpty
                      // value={this.state.activeSlot}
                      // onClick={(e) => {
                      //                   if (!item.booked) {
                      //                     this.handleSlotClick(e, item.from_time, item.to_time);
                      //                    }
                      //                  }}
                      // onChange={(e)=> this.handleSlotClick(e.target.value)}
                      style={{ marginTop: "5%" }}
                      // input={<Input id="select-multiple" />}
                    >
{/*
                     {this.state.availableSlots.map((item) => (
                        <MenuItem   key={item} value={item}>

                        <span>{moment.unix(item.from_time).format('LT')}</span>
                        </MenuItem>
    ))} */}
                    </Select>
                </Grid>
                <Grid
                  item
                  lg={1} md={1} sm={1} xs={1}
                  style={{
                    position: "relative",
                    marginTop: "5%",
                    right: "15px"
                  }}
                >
                  <i class="material-icons" style={{}}>
                    access_time
                  </i>
                </Grid>
              </Grid>
            </Typography>
          </Grid>

        </Grid>
<Typography
          style={{
            fontSize: "14px",
            marginTop: "2%",
            marginBottom: "1%",
            fontFamily: "Roboto Medium"
          }}
        >
          Additional Notes
        </Typography>
        <InputBase
          multiline
          rowsMax="2"
          style={{
            background: "",
            border: "1px solid #DADADA",
            borderRadius: "5px",
            width: "100%",
            height: ""
          }}
        >
          {" "}
        </InputBase>
        <Button
          style={{
            background: "#E74A3F",
            border: "1px solid #DADADA",
            borderRadius: "31px",
            borderRadius: "31px",
            display: "flex",
            marginTop: "2%",
            paddingLeft: "4%",
            paddingRight: "4%",
            color: "white",
            fontSize: "14px",
            textTransform: "none"
          }}

          onClick={() => { this.handleNavChangeClick(); }}
        >
          Confirm Booking
        </Button>



        </div>
       }

    </Card>
    </Wrapper>
)
}
}
      // <Wrapper>
      //   <div className="row">
      //     <div className="col-md-12">
      //       <Button className={styles.backBtn} text="Back" onClick={(e) => this.props.handleBookingBack(e) } />
      //     </div>
      //   </div>
      //   <h1>Booking details for {this.props.facilityName}</h1>
      //   {this.state.availableMonths &&
      //     <div>
      //       <div className={styles.selHeading}>What Month?</div>
      //       <div>
      //         {this.state.availableMonths.map((item) => {
      //           return (
      //             <div className={styles.monthPanel} key={item.year + item.month}>
      //               <Link
      //                 to="#"
      //                 className={classNames(
      //                   styles.selectionPanel,
      //                   { [styles.active]: this.state.activeClass.month === item.year + item.month },
      //                 )}
      //                 onClick={() => { this.handleMonthClick(item.year, item.month); }}
      //               >
      //                 {moment(item.month, 'MM').format('MMMM')}
      //                 <span>{item.year}</span>
      //               </Link>
      //             </div>
      //           );
      //         })}
      //       </div>
      //     </div>
      //   }
      //   {this.state.availableMonths &&
      //     this.state.activeClass.month !== '' &&
      //     !this.state.availableDays &&
      //     <Loader />
      //   }
      //   {this.state.availableDays &&
      //     <div>
      //       <div className={styles.selHeading}>What Day?</div>
      //       <div>
      //         {this.state.availableDays.map((item) => {
      //           return (
      //             <div className={styles.daysPanel} key={item.date}>
      //               <Link
      //                 to="#"
      //                 className={classNames(
      //                   styles.selectionPanel,
      //                   { [styles.active]: this.state.activeClass.day === item.date },
      //                 )}
      //                 onClick={() => { this.handleDayClick(item.date); }}
      //               >
      //                 <span>{item.week_day}</span>
      //                 {`${item.day} ${item.month}`}
      //               </Link>
      //             </div>
      //           );
      //         })}
      //       </div>
      //     </div>
      //   }
      //   {this.state.availableMonths &&
      //     this.state.availableDays &&
      //     this.state.activeClass.day !== '' &&
      //     !this.state.availableSlots &&
      //     <Loader />
      //   }
      //   {this.state.availableSlots &&
      //     <div>
      //       <div className={styles.selHeading}>What Time?</div>
      //       <div>
      //         {this.state.availableSlots.map((item) => {
      //           return (
      //             <div className={styles.slotsPanel} key={item.from_time + item.to_time}>
      //               <Link
      //                 to="#"
      //                 className={classNames(
      //                   styles.selectionPanel,
      //                   { [styles.booked]: item.booked },
      //                   {
      //                     [styles.active]: this.state.selectedSlots.some(slot => (
      //                       slot.from_time === item.from_time && slot.to_time === item.to_time)),
      //                   },
      //                 )}
      //                 onClick={(e) => {
      //                   if (!item.booked) {
      //                     this.handleSlotClick(e, item.from_time, item.to_time);
      //                   }
      //                 }}
      //               >
      //                 <span>{moment.unix(item.from_time).format('LT')}</span>
      //                 <div>to</div>
      //                 <span>{moment.unix(item.to_time).format('LT')}</span>
      //               </Link>
      //             </div>
      //           );
      //         })}
      //       </div>
      //     </div>
      //   }
      //   {this.state.selectedSlots.length > 0 &&
      //     <div className={classNames(styles.confBtn, 'col-md-12 col-xs-12')}>
      //       <Button
      //         className="btn btn-lg btn-success btn-block"
      //         text="Continue"
      //         onClick={() => { this.handleNavChangeClick(); }}
      //       />
      //     </div>
      //   }
      // </Wrapper>

export const mapStateToProps = state => bookFacilitySelector(state);
export default connect(mapStateToProps)(withStyles(design)(BookFacility))
