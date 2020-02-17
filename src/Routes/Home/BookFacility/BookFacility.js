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
// import Select from "react-select";
import { Grid, Button, withStyles, Card, Typography, Select, Hidden, MenuItem, Input, CardContent, CardMedia, GridList, GridListTile, ListSubheader, CardActions, InputBase, FormControl } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";
import { createBookFacility, showLoader } from './BookFacility.actions';
//import { Multiselect } from 'multiselect-react-dropdown';
const design = theme => ({
    meetingRoomsCard: {
        width: "66%",
        ["@media (max-width:70em)"]: {
            width: '100%'
        },
    },
    warning: {

        fontFamily: 'Roboto Medium',
        fontSize: '12px',

    },

    warningStar: {
        marginTop: '2%',
        fontSize: '12px',
        color: 'red',
        display: "inline-flex",
        marginBottom: "2%"

    },
    timerGrid:{
        background: "#FFFFFF",
                                     border: "1px solid #DADADA",
                                        borderRadius: "5px",
                                        borderRadius: "5px",
                                        height: "100%",
                                        paddingTop: "5%",
                                        paddingLeft:'4%',
                                        paddingRight:'2%',
                                        ["@media (max-width:70em)"]: {
                                            paddingTop: "9%",
                                        },
    }

});
export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(255,0,0,0.7)',
        },
    },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(value, that) {
    return {
        fontWeight:
            that.state.value.indexOf(value) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}
class BookFacility extends Component {
    state = {
        date: new Date(),
        selectedDate: new Date().date,
        note: '',
        open: false,
        selectedDate: new Date("2014-08-18T21:11:54"),
        times: [],
        tempObject:{},
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
            availableSlots: [],
            activeClass: {
                month: '',
                day: '',
            },
            selectedSlots: [],
            cnfBooking: false,
            selectedOptions: [],
            selectedValue: [],
            slots: [],
            tempObject:{}




        };
    }
    componentDidMount() {
        this.props.dispatch(fetchAvailableFacilityDates(this.props.facilityId, this.props.currentLocation.toJS().id));
        document.title = "GoodWorks HQ - Book Facility";
    }
    componentWillReceiveProps(props) {

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
    handleMonthClick = () => {

        var year = new Date().getFullYear()
        var month = new Date().getMonth() + 1
        this.props.dispatch(fetchAvailableFacilityDates(this.props.facilityId, this.props.currentLocation.toJS().id, year, month));
        this.setState({
            activeClass: Object.assign({}, { ...this.state.activeClass }, { month: year + month, day: '' }),
            selectedSlots: [],
            availableDays: null,
            availableSlots: null,

        });
    }
    handleDayClick = (date) => {

        var updatedDate = ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear();
        this.props.dispatch(fetchAvailableFacilitySlots(this.props.facilityId, this.props.currentLocation.toJS().id, updatedDate));
        this.setState({
            activeClass: Object.assign({}, { ...this.state.activeClass }, { day: updatedDate }),
            selectedSlots: [],
            availableSlots: null,
            selectedDate: date
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
    // handleNavChangeClick = () => {
    //   const cnfBooking = !this.state.cnfBooking;
    //   this.setState({ cnfBooking });
    // }
    handleConfBooking = (selectedSlots, note) => {
debugger
        console.log(selectedSlots, note, "fffffff")
        const reqBody = {
            facility_id: this.props.facilityId,
            note: note,
            slots: selectedSlots,
        };
        this.props.dispatch(createBookFacility(reqBody));
        this.props.dispatch(showLoader(true));
    }

    handleSelect = (obj) => {
        debugger

        // var p = moment('2020-02-12T11:01:21+05:30').valueOf();
        console.log('obj', obj);
        let selectedSlots = [];
        obj.forEach((o, index) => {

          let r=this.getObjectFromStr(o);
            r.facility_id = this.props.facilityId;
            selectedSlots.push(r);
        })



        this.setState({ selectedValue: selectedSlots });
    }


getObjectFromStr=(str)=>{
    debugger
return this.state.tempObject[str]

}
getStrFromObject=(obj)=>{
debugger
if(this.state.tempObject[`${obj.from_time}`]){

}else{
  let {tempObject}=this.state;

tempObject[`${obj.from_time}`]=obj;

this.setState({tempObject})
}
return `${obj.from_time}`;

}

disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

    render() {

        const { classes } = this.props
        // const { selectedDate } = this.state;
        let { selectedDate, selectedValue } = this.state;
        const { handleSelect } = this;
        console.log(this.state, "state")
        let today = new Date()
        selectedValue=selectedValue.map(ele=>this.getStrFromObject(ele))
        let selectedOptions = [];
        // let epocKey=[];

        console.log(selectedOptions, "selectedOptions")
        {
            this.state.availableSlots && this.state.availableSlots.map(item => {
                let key = moment.unix(item.from_time).format('LT') + " to " + moment.unix(item.to_time).format('LT');
                let epocKey = { from_time: item.from_time, to_time: item.to_time };
                selectedOptions.push({ value: epocKey, label: key })

            })
        }
        if (!this.state.availableMonths) {
            return (<Loader />);
        }
        if (this.state.cnfBooking) {
            return (
                <ConfirmBooking
                    handleChangeClick={this.handleNavChangeClick}
                    selectedSlots={this.state.selectedSlots}
                    facilityName={this.props.facilityName}
                    facilityId={this.props.facilityId}
                />
            );
        }
        return (
            <Wrapper>
                <Card style={{ boxShadow: 'none', paddingBottom: '2%', background: '', marginLeft: '%', marginRight: "1.5%", marginTop: '2%', marginBottom: "2%" }}>
                    <Button style={{ position: 'relative', right: "20px", background: '' }} onClick={(e) => this.props.handleBackBtnClick(e)} >
                        <i class="material-icons" style={{ fontSize: '24px' }}>keyboard_backspace</i>
                    </Button>

                    {<Typography style={{
                        fontFamily: "Roboto Medium",
                        fontSize: "16px",
                        color: "#030303",
                        // letterSpacing: "-0.15px",

                        paddingTop: "1%",
                        paddingBottom: "2%"

                    }}>Meeting Rooms</Typography>


                    }

                    <Grid className={classes.warningStar}>
                        <Typography>* </Typography>
                        <span></span>
                        <Typography className={classes.warning}> Only 4 hours of complimentary facility booking is available per organisation each month.Any bookings beyond 4 hours will be chargeable on monthly basis.
</Typography></Grid>
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
                            <Typography style={{ marginTop: "6%", fontSize: "18px", fontFamily: 'Roboto Medium', marginLeft: "2%", marginBottom: '1%' }}>
                                {this.props.facility.title}
                            </Typography>
                        </Card>
                        <Typography style={{ fontSize: "14px", marginBottom: "1%", marginTop: '2%' }} onClick={this.handleMonthClick}>
                            Select preferred date & time
        </Typography>
                        <Grid container>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                                style={{
                                    border: "1px solid #DADADA",
                                    borderRadius: "5px",
                                    borderRadius: "5px",
                                    // height:'120%',
                                    paddingLeft: "2%",
                                    // marginBottom:'10%',
                                    // width: "90%"
                                }}
                            >
                                {/* <Typography

                > */}
                                <MuiThemeProvider theme={customTheme}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker style={{ width: '100%',paddingBottom:'2%'  }}
                                           minDate={today}
                                           shouldDisableDate={this.disableWeekends}
                                           InputProps={{
                                                disableUnderline: true,
                                                style: { fontSize: 14 },
                                                fontFamily: 'Roboto Regular'

                                            }}
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            value={selectedDate}
                                            onChange={this.handleDayClick}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </MuiThemeProvider>
                                {/* </Typography> */}
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
                                   className={classes.timerGrid}
                                    // value={this.props.someText}
                                // onChange={this.handleChangeTime}
                                >
                                    <Grid container style={{ display: "inline-flex"}}>
                                        <Grid item lg={11} md={11} sm={11} xs={10} style={{}}>
                                            {this.state.availableSlots &&
                                            <FormControl>
                                                <Select style={{fontSize:"14px",fontFamily: 'Roboto Regular'}}
                                                  multiple
                      disableUnderline
                      displayEmpty
                                                    value={selectedValue}
                                                    onChange={e => handleSelect(e.target.value)}
                                                    input={<Input id="select-multiple" />}


                                                >
                                                    {selectedOptions.map(option => (

                                                        <MenuItem key={option.value} value={this.getStrFromObject(option.value)} style={{fontSize:'14px',fontFamily:'Roboto Regular'}}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                </FormControl>
                                            }
                                        </Grid>
                                        <Grid
                                            item
                                            lg={1} md={1} sm={1} xs={2}
                                           style={{background:'',display:'flex',alignItems:"center",justifyContent:"center",paddingBottom:'2%'}}
                                        >
                                            <i class="material-icons"  style={{fontSize:"14px",}}>
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
                        <Grid style={{
                            background: "",
                            border: "1px solid #DADADA",
                            borderRadius: "5px",
                            width: "100%",
                            height: "70px",
                            paddingLeft: '2%',
                            paddingRight: '2%',
                            paddingTop: '0.5%',
                            paddingBottom: '1%',
                            overflow: "hidden"

                        }}>
                            <InputBase
                                multiline
                                rowsMax="4"
                                style={{
                                    width: "100%",
                                    fontFamily: 'Roboto Regular',
                                    fontSize: '14px',
                                }}
                                value={this.state.note}
                                onChange={(e) => { this.setState({ note: e.target.value }); }}
                            >
                                {" "}
                            </InputBase>
                        </Grid>

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
                            onClick={() => this.handleConfBooking(this.state.selectedValue, this.state.note)}
                        >
                            Confirm Booking
        </Button>
                    </div>
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








   // let selectedSlot={
        //     facility_id: this.props.facilityId,
        //     from_time: ob,
        //     to_time: o

        // }

        // selectedSlots.push(selectedSlot)
        // Object.keys(obj).map((o,index)=>{
        //     console.log("o:",o);
        //     return(
        //         obj[index]["facility_id"].push(this.props.facilityId)
        //     )
        // })
