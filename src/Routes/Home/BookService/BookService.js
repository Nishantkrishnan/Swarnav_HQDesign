import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUploader from '../../../components/ImageUpload/ImageUpload';
import { Loader } from '../../../containers/Loader/Loader';
import bookServiceSelector from './BookService.selectors';
import {
  serviceRequestPreferences,
  createServiceBooking,
  showLoader,
} from './BookService.actions';
// import Button from '../../../components/Button/Button';
import Wrapper from '../../hoc/Wrapper';
import styles from './BookService.css';
// import BookedDialog from "../../../../components/BookedDialog"
import{ Grid,Button, Switch,withStyles,Card,Typography,Hidden,MenuItem,Select,Input,CardContent, CardMedia,GridList,GridListTile,ListSubheader, CardActions,InputBase} from "@material-ui/core";
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
                                        paddingRight:'5%',
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
const AntSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 24,
    padding: 2
    // display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    marginTop: "1%",
    width: 20,
    height: 20,
    boxShadow: "none"
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    // borderRadius: 16 / 2,
    borderRadius: "31px",
    borderRadius: "31px",
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch);
class BookService extends Component {
  state = {
    availableDays: null,
    availableSlots: null,
    // activeDay: '',
    activeSlot: '',
    urgent: false,
    displayLoader: false,
    description: '',
    pictures: [],
    emptyDesc: false,
    // date: new Date(),
    open: false,date: new Date(),
    activeDay:new Date().date,
    urgent:false
  };
  handleChangeTime = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked,urgent: !state.urgent });
  // };
  toggleCommentDialogOpen = () => {
    this.setState(state => ({ urgent: !state.urgent }))
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
    serviceTypeId: PropTypes.number,
    serviceId: PropTypes.number,
    serviceName: PropTypes.string,
    serviceRequestPreference: PropTypes.object,
    handleBackBtnClick: PropTypes.func,
    showLoader: PropTypes.bool,
  };
  static defaultProps = {
    dispatch: f => f,
  };
  componentDidMount() {
   
    this.props.dispatch(serviceRequestPreferences(this.props.serviceId, this.props.currentLocation.toJS().id));
    document.title = "GoodWorks HQ - Book Service";
  }
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.serviceRequestPreference) {
      const serviceRequestPreference = nextProps.serviceRequestPreference;
      if (!this.state.availableDays) {
        this.setState({
          ...this.state,
          availableDays: serviceRequestPreference.dates,
        // activeDay: serviceRequestPreference.dates[0].date,
        });
      }
      this.setState({ availableSlots: serviceRequestPreference.times, displayLoader: false });
    }
  }
  onDrop = (pictures) => {
    this.setState({ pictures });
  }
  handleDayClick = (date) => {
   
    console.log(date,"date")
    this.props.dispatch(serviceRequestPreferences(this.props.serviceId, this.props.currentLocation.toJS().id,date));
    this.setState({
      ...this.state,
      activeDay: date,
      selectedSlots: [],
      displayLoader: true,
    });
  }
  handleSlotClick = (slot) => {
    this.setState({ activeSlot: slot });
  }
  handleContinueBtnClick = () => {
    if (this.state.description.trim() === '') {
      this.setState({ emptyDesc: true });
      return;
    }
    const reqBody = new FormData();
    this.state.pictures.forEach((picture) => {
      reqBody.append('image[]', picture, picture.name);
    });
    reqBody.append('description_of_problem', this.state.description);
    reqBody.append('preferred_time',  this.state.urgent ? '' : this.state.activeSlot);
    reqBody.append('urgent', this.state.urgent);
    this.props.dispatch(showLoader(true));
    this.props.dispatch(createServiceBooking(reqBody, this.props.serviceId, this.props.serviceId));
  }
  disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }
  render() {
   
    const {classes}=this.props
    const{serviceId,serviceTypeId} =this.props
    console.log(serviceId,"serviceId")
    console.log(serviceTypeId,"serviceTypeId")
    const {activeDay}=this.state
    console.log(this.handleDayClick,"select Date")
    console.log(this.handleChangeTime,"change Time")
    console.log(this.state,"state")
    console.log(activeDay,"activeDay")
    let today = new Date()
    if (!this.state.availableDays) {
      return <Loader />;
    }
    return (
      <Wrapper>
        <Card  style={{boxShadow: 'none' ,paddingBottom:'2%',background:'',marginLeft:'1%',marginRight:"1%",marginTop:'1%',marginBottom:"2%"}}>
        <Button   style={{position: "relative",
    right: "20px"}}  onClick={() => { this.props.handleBackBtnClick()}} >
              <i class="material-icons">keyboard_backspace</i>
              </Button>
          {/* <CardContent style={{ background:'blue'}}> */}
          <Typography
            style={{
              fontSize: "16px",
            marginTop:"1%"
,              fontFamily: "Roboto Medium"
            }}
          >
            {this.props.serviceName}
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              marginBottom: "1%",
              marginTop: "4%",
              fontFamily: "Roboto "
            }}
          >
            Select preferred date & time to avail this service
          </Typography>
          {this.state.availableDays && !this.state.urgent &&
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
                  paddingLeft: "3.5%",
                  // width: "90%"
                  background:""
                }}
              >
                 <MuiThemeProvider theme={customTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                        <KeyboardDatePicker style={{width: '100%' ,paddingBottom:"2%",fontFamily:'Roboto Regular'}}
                        minDate={today}
                        shouldDisableDate={this.disableWeekends}
 InputProps={{
  disableUnderline: true,
  style: {fontSize: 14},
  fontFamily:'Roboto Regular'

}}
                        variant="inline"
                          // value={this.state.date}
                           format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          value={activeDay}
                          onChange={ this.handleDayClick }
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                </MuiPickersUtilsProvider>
                </MuiThemeProvider>
              </Typography>
            </Grid>
            { this.state.availableDays &&
              this.state.activeDay !== '' &&
              this.state.displayLoader &&
              <Loader />
            }
            {this.state.availableSlots &&
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
                value={this.props.someText}
                onChange={this.handleChangeTime}
              >
                <Grid container style={{display:"inline-flex"}}>
                  <Grid item lg={11} md={11} sm={11} xs={11} >
                  <Select
                      // multiple
                      disableUnderline
                      displayEmpty
                      value={this.state.activeSlot}
                      onChange={(e)=> this.handleSlotClick(e.target.value)}
                      style={{ fontSize:'14px',fontFamily:'Roboto Regular'}}
                      // input={<Input id="select-multiple" />}
                    >
                     {this.state.availableSlots.map((item) =>  (
                        <MenuItem   key={item} value={item} style={{fontSize:'14px',fontFamily:'Roboto Regular'}}>
                        <span>{moment.unix(item).format('LT')}</span>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid
                    item
                    lg={1} md={1} sm={1} xs={1}
                    style={{background:'',display:'flex',alignItems:"center",justifyContent:"center",paddingBottom:'2%'}}

                  >
                    <i class="material-icons"  style={{fontSize:'14px'}}>
                      access_time
                    </i>
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
  }
          </Grid>
  }
<Grid
            style={{
              display: "inline-flex",
              boxShadow: "none",
              marginTop: "2%",
              marginBottom: "2%",
              color: "grey"
            }}
          >
            <AntSwitch
              // checked={this.state.checkedC}
              onChange={this.toggleCommentDialogOpen}
              // value="checkedC"
              fontSize="55px"
            />
            <Typography
              style={{ marginTop: "2%", marginLeft: "6%", fontSize: "14px" }}
            >
              Urgent
            </Typography>
          </Grid>
<Typography
            style={{
              fontSize: "14px",
              marginTop: "2%",
              marginBottom: "1%",
              fontFamily: "Roboto "
            }}
          >
            Describe your request
          </Typography>
          {this.state.emptyDesc && <p style={{ color: 'red' }}>Please describe your request here.</p>}
          <Grid style={{
              background: "",
              border: "1px solid #DADADA",
              borderRadius: "5px",
              width: "100%",
              height: "70px",
              paddingLeft:'2%',
              paddingRight:'2%',
              paddingTop:'0.5%',
              cursor: 'pointer',
              overflow:"hidden"
            }}>
          <InputBase
            multiline
            rowsMax="4"
            style={{
             width:"100%",
             fontFamily:'Roboto Regular',
             fontSize:'14px',
            }}
            onChange={e => this.setState({ description: e.target.value, emptyDesc: false })}
         ></InputBase>
</Grid>
           <Typography
            style={{
              marginTop: "3%",
              marginBottom: "1%",
              fontFamily: "Roboto Regular",
              fontSize: "14px"
            }}
          >
            Max image size: 10MB, Max images: 5
          </Typography>
          <Grid style={{ textTransform: "none",
                background: "lightGray",
                borderRadius: "5px",
                borderRadius: "5px",
                height: "6%",
                boxShadow: "none",
                display: "inline-flex",
                paddingLeft: "1%",
                paddingRight: "2%",
                paddingTop: "1%",
                paddingBottom: "1%"}}>
          {/* <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        /> */}
        <label htmlFor="contained-button-file">
            <Button
              style={{
              }}
            >
              <i class="material-icons" style={{}}>
                attach_file
              </i>
              <Typography style={{ fontFamily: "Roboto Regular",fontSize:'12px' }}>
                Attach Picture (jpg, jpeg, png)
              </Typography>
            </Button>
            </label>
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
            onClick={() => { this.handleContinueBtnClick(); }}
          >
            Confirm Booking
          </Button>
          {/* </CardContent> */}
          </Card>
          {this.props.showLoader && <Loader />}
      </Wrapper>
    );
  }
}
export const mapStateToProps = state => bookServiceSelector(state);
export default connect(mapStateToProps)(withStyles(design)(BookService))
