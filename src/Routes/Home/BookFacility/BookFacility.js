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
import Select from "react-select";
import ConfirmBooking from './ConfirmBooking';
import styles from './BookFacility.css';
import { Grid, Button, withStyles, Card, Typography, Hidden, MenuItem, Input, CardContent, CardMedia, GridList, GridListTile, ListSubheader, CardActions, InputBase } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { createBookFacility, showLoader } from './BookFacility.actions';
const design = theme => ({
  meetingRoomsCard: {
    width: "66%",
    ["@media (max-width:70em)"]: {
      width: '100%'
    },
  },
  dateFont:{
    fontSize:"50px",background:"red"
  },
  resize:{
    fontSize:50
  },
  warning:{
    
    fontFamily:'Roboto Medium',
    fontSize:'12px',

  },

  warningStar:{
    marginTop:'2%',
    fontSize:'12px',
    color:'red',
    display:"inline-flex",
    marginBottom:"2%"
   
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
  // state = {
  //   date: new Date(),
  //   // selectedDate: new Date().date,
  //   note:'',
  //   open: false,
  //   slots:[],
  //   // selectedDate: new Date("2014-08-18T21:11:54"),

  // };
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
      selectedOptions:[],
      selectedValue:"",
      cnfBooking: false,
      // selectedDate:"",
      slots:[]

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

    var year= new Date().getFullYear()
    var month = new Date().getMonth()+1
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
    + ('0' + (date.getMonth()+1)).slice(-2) + '/'
    + date.getFullYear();
    this.props.dispatch(fetchAvailableFacilitySlots(this.props.facilityId, this.props.currentLocation.toJS().id, updatedDate));
    this.setState({
      activeClass: Object.assign({}, { ...this.state.activeClass }, { day: updatedDate }),
      selectedSlots: [],
      availableSlots: null,
      selectedDate:date
    });
  }
  handleSlotClick = (e, fromTime, toTime) => {
    console.log(e,"e")
    console.log(fromTime,"fromTime")
    console.log(toTime,"toTime")
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
console.log(selectedSlots,"selectedSlots")

      selectedSlots.splice(
        // get the index of the element and check all property values are equal.
        selectedSlots.findIndex(obj => keys.every(k => (selectedSlot[k] === obj[k]))), 1);
    } else {
      selectedSlots.push(selectedSlot);
    }
// let fromTim=[fromTime]
console.log(selectedSlots,"selectedSlots")

    this.setState({ selectedSlots,
     });
  }
  // handleNavChangeClick = () => {
  //   const cnfBooking = !this.state.cnfBooking;
  //   this.setState({ cnfBooking });
  // }
  handleConfBooking = (selectedSlots, note) => {

    console.log(selectedSlots, note,"fffffff")
    const reqBody = {
      facility_id: this.props.facilityId,
      note: note,
      slots: selectedSlots,
    };
    this.props.dispatch(createBookFacility(reqBody));
    this.props.dispatch(showLoader(true));
  }
  handleSelect = (obj) => {
 console.log('selected value', obj);
  this.setState({selectedValue:{value:obj,label:obj}});
  }
  render() {
    debugger
    const {classes}=this.props
    const { selectedDate, selectedValue =""  } = this.state;
    const  { handleSelect } = this;
    console.log(this.state, "state")
    let  selectedOptions = [];
    {this.state.availableSlots && this.state.availableSlots.map( item => {
      let key = moment.unix(item.from_time).format('LT') + " to " + moment.unix(item.to_time).format('LT');
      selectedOptions.push({value:key, label: key})
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
        <Card style={{ boxShadow: 'none' ,paddingBottom:'2%',background:'',marginLeft:'%',marginRight:"1.5%",marginTop:'2%',marginBottom:"2%"}}>
          <Button   style={{position:'relative', right:"20px",background:''}}  onClick={(e) => this.props.handleBackBtnClick(e)} >
            <i class="material-icons" style={{fontSize:'24px'}}>keyboard_backspace</i>
          </Button>

          { <Typography style={{  fontFamily: "Roboto Medium",
            fontSize: "16px",
            color: "#030303",
            // letterSpacing: "-0.15px",

            paddingTop: "1%",
            paddingBottom:"%"

          }}>Meeting Rooms</Typography>


           }
           <Grid  className={classes.warningStar}>          
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
              <Typography style={{ marginTop: "6%", fontSize: "18px",fontFamily:'Roboto Medium', marginLeft:"2%",marginBottom:'1%' }}>
                {this.props.facility.title}
              </Typography>
            </Card>
            <Typography style={{ fontSize: "14px", marginBottom: "1%", marginTop:'2%' }} onClick={ this.handleMonthClick}>
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
                  width: "90%"
                }}
              >
                {/* <Typography

                > */}
                  <MuiThemeProvider theme={customTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ backgroundColor: "" }}>
                      <KeyboardDatePicker style={{ width: '100%' ,marginBottom:"4.5%",fontSize:'18px',fontFamily:'Roboto Regular'}}
                        InputProps={{
                          disableUnderline: true,
                          style: {fontSize: 14},
                          fontFamily:'Roboto Regular'
                          // classes: {
                          //   input: classes.resize,
                          // },
                        }}
                        variant="inline"
                        format="dd/MM/yyyy"
                        fontSize="18px"
                        margin="normal"
                        id="date-picker-inline"
                        value={selectedDate}
                        onChange={this.handleDayClick}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                       
                      >
                        </KeyboardDatePicker>
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
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #DADADA",
                    borderRadius: "5px",
                    borderRadius: "5px",
                    height: "100%",
                    paddingLeft: "2%"
                  }}
                  value={this.props.someText}
                // onChange={this.handleChangeTime}
                >
                  <Grid container style={{display:"inline-flex",background:'',marginTop:"4.5%"}}>
                    <Grid item lg={11} md={11} sm={11} xs={11} style={{ background: "",paddingLeft:"2%"  }}>
                    {this.state.availableSlots &&

                    <Select
                    disableUnderline

                      placeholder="Selected options"
                      value={selectedValue}
                      options={selectedOptions}
                      onChange={obj => handleSelect(obj.value)}
                      InputProps={{
                        disableUnderline: true,
                        style: {fontFamily:'Roboto Regular'}
                        // classes: {
                        //   input: classes.resize,
                        // },
                      }}

                    />

                    
                //       <Select
                //         multiple
                //         disableUnderline
                //         displayEmpty
                //         value={this.state.selectedSlots}
                //         input={<Input id="select-multiple" />}
                //         style={{fontSize:'14px',background:""}}
                //         // className={classNames(
                //         //   styles.selectionPanel,
                //         //   // { [styles.booked]: e.booked },
                //         //   {
                //         //     [styles.active]: this.state.selectedSlots.some(slot => (
                //         //       slot.from_time === e.target.value[0].split("+")[0] && slot.to_time === e.target.value[0].split("+")[1])),
                //         //   },
                //         // )}
                //         onChange={(e)=>{

                //             this.handleSlotClick(e,e.target.value[0].split("+")[0],e.target.value[0].split("+")[1])

                //         }}


                //       // input={<Input id="select-multiple" />}
                //       >
                //          {this.state.availableSlots.map((item) =>{
                // // let slot = {"name":item.from_time+item.to_time, "value": item.from_time+"+"+item.to_time }
                //          return(
                //           <MenuItem  style={{fontSize:'14px',fontFamily:'Roboto Regular'}}
                //           key={item.from_time + item.to_time} value={item.from_time+"+"+item.to_time}
                //          >
                //             <span>{moment.unix(item.from_time).format('LT')}</span>
                //             <div>to</div>
                //       <span>{moment.unix(item.to_time).format('LT')}</span>
                //           </MenuItem>
                //         )})}
                //       </Select>
  }
                    </Grid>
                    <Grid
                      item
                      lg={1} md={1} sm={1} xs={1}
                      style={{
                        position: "relative",
                      marginTop: "2%",
                        right: "1px",
                        width:'10px'
                      }}
                    >
                      <i class="material-icons" style={{fontSize:'14px'}}>
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
                marginBottom: "2%",
                fontFamily: "Roboto "
              }}
            >
              Additional Notes
        </Typography>
        <Grid  style={{
                  background: "",
                  border: "1px solid #DADADA",
                  borderRadius: "5px",
                  width: "100%",
                  height: "70px",
                  paddingLeft:'2%',
                  paddingRight:'2%',
                  paddingTop:'0.5%',
                  paddingBottom:'1%',
                  overflow:"hidden"

              }}>
               <InputBase
              multiline
              rowsMax="4"
               style={{width:"100%",
               fontFamily:'Roboto Regular',
                  fontSize:'14px',}}
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
                marginTop: "3%",
                paddingLeft: "4%",
                paddingRight: "4%",
                color: "white",
                fontSize: "14px",
                textTransform: "none"
              }}
              onClick={() =>  this.handleConfBooking(this.state.selectedSlots, this.state.note)}
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
