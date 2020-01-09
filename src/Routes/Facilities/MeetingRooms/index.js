import React from "react";
import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  Grid,
  TextField,
  Form,
  Button,
  MenuItem,
  InputBase,
  Input,
  Select,
  Switch
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Booked from "../../../component/Booked";
const styles = theme => ({

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
			// light:  'rgba(255, 255, 255, 0.5)',
			// dark:  'rgba(255, 255, 255, 0.5)',
		},
		// secondary: {
		// 	main: 'rgba(255, 255, 255, 0.5)',
		// },
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
class MeetingRoom extends React.Component {
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
  render() {
    const { classes } = this.props;
    const { timeOptions } = this.state;
    const { handleChangeTime, handleChange } = this;
    console.log(this.state.date ,'kkk')
    return (
      <Card className={classes.meetingRoomsCard}
       
      >
        <Button style={{ marginTop: "2%" }} onClick = {() => {this.props.history.push("facilities")}}>
          {" "}
          <i class="material-icons">keyboard_backspace</i>
        </Button>
        <CardContent style={{ background: "" }}>
          <Typography style={{ fontSize: "18px", marginBottom: "2%" }}>
            Facilities/Meeting rooms
          </Typography>
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
              image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/7/original/IMG_2143.jpg"
            />
            {/* </CardMedia> */}

            <Typography style={{ marginTop: "4%", fontSize: "18px" }}>
              8 Seater Meeting Room - II Floor
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
        // inputVariant="outlined"
                        // inputVariant='outlined'
                          // disableToolbar
                          // variant="inline"
                          value={this.state.date}
                          format="dd MMMM yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          // label="Date picker inline"
                          value={this.state.selectedDate}
                          onChange={this.handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      
                  
                    
                  
                </MuiPickersUtilsProvider>
                </MuiThemeProvider>
              </Typography>
            </Grid>
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
                onChange={this.handleChangeTime}
              >
                <Grid container>
                  <Grid item lg={11} md={11} sm={11} xs={11} style={{ background: "" }}>
                    <Select
                      multiple
                      disableUnderline
                      displayEmpty
                      value={this.state.times}
                      onChange={this.handleChangeTime("times")}
                      style={{ marginTop: "5%" }}
                      input={<Input id="select-multiple" />}
                    >
                      {/* <MenuItem
                    value=""

                  > 12:00 PM</MenuItem> */}
                      {timeOptions.map(option => (
                        <MenuItem key={option.time} value={option.time}>
                          {/* {" "} */}
                          {option.time}
                        </MenuItem>
                      ))}
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
            // onClick ={() => {this.props.history.push("/booked")}}
            onClick={() => {
              this.toggleCreatePostDialog();
            }}
          >
            Confirm Booking
          </Button>
          <Booked
            open={this.state.open}
            toggleCreatePostDialogClose={this.toggleCreatePostDialogClose}
          />
        </CardContent>
      </Card>
    );
  }
}
MeetingRoom.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MeetingRoom);
