import PropTypes from "prop-types";
import classNames from "classnames";
import { Tabs, Tab, Col, Row, Button } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "../../../containers/Loader/Loader";
import NoDataAvailable from "../../../containers/NoDataAvailable/NoDataAvailable";
import myActivitySelector from "./MyActivity.selectors";
import {
  fetchMyActivity,
  cancelServiceRequest,
  cancelFacilityBooking,
  cancelTicket
} from "./MyActivity.actions";
import styles from "./MyActivity.css";
import * as myActivityConstant from "./MyActivityConstants";
import { blockLocationAndOpen } from "../Locations/Locations.actions";

import { Grid, Card, Typography, Divider } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
const design = theme => ({
  MyActivityCrad: {
    width: '66%',
    marginLeft: '1%',
    ["@media (max-width:48em)"]: {
      width: '100%'
    },
  },
  BookedFacilitiesCard: {
    boxShadow: "none",
    width: "%",
    background: "",
    marginTop: "2%",
    marginLeft: "3%",
    ["@media (min-width:200px) and (max-width:1280px)"]: {
      width: "%",
      marginLeft: "0%",
    }
  },
  rightGrid: {
    marginLeft: "4%",
    marginTop: "1%",
    ["@media (min-width:200px) and (max-width:1280px)"]: {
      marginLeft: "1%"
    }
  },
  postDate: {
    fontSize: "14px",
    fontFamily: 'Roboto Regular',
    position: "relative",
    right: " 20px",

    ["@media (max-width:400px)"]: {
      fontSize: "14px"
    }
  }
});
class MyActivity extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    myActivity: PropTypes.object,
    match: PropTypes.object
  };
  static defaultProps = {
    dispatch: f => f,
    myActivity: null
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: props.match.params.type,
      services: {},
      myActivity: props.myActivity
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.cancelServiceRequest = this.cancelServiceRequest.bind(this);
    this.cancelFacilityBooking = this.cancelFacilityBooking.bind(this);
    this.ticketExpandClose = this.ticketExpandClose.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMyActivity(this.props.match.params.type));
    document.title = "GoodWorks HQ - My Bookings";
    this.props.dispatch(blockLocationAndOpen(true));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ myActivity: nextProps.myActivity });
  }

  destroySession = () => {
    localStorage.clear();
  };

  handleSelect(key) {
    this.setState({ key });
    this.props.dispatch(fetchMyActivity(key));
  }

  ticketExpandClose = facilityBookingNumber => {
    const facilityBookingIndex = this.state.myActivity.facilities.findIndex(
      facility => {
        return facility.facility_booking_number === facilityBookingNumber;
      }
    );
    this.state.myActivity.facilities[facilityBookingIndex].isOpen = !this.state
      .myActivity.facilities[facilityBookingIndex].isOpen;
    this.setState({});
  };

  cancelServiceRequest(id) {
    this.dialog.show({
      body: "Are you sure?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          this.props.dispatch(cancelServiceRequest(id));
        })
      ]
    });
  }

  cancelFacilityBooking(bookingId) {
    this.dialog.show({
      body: "Are you sure?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          this.props.dispatch(cancelFacilityBooking(bookingId));
        })
      ]
    });
  }

  cancelTicketBooking(bookingId) {
    this.dialog.show({
      body:
        "Are you sure you want to cancel all bookings associated to this ticket?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          this.props.dispatch(cancelTicket(bookingId));
        })
      ]
    });
  }

  render() {
    const { classes } = this.props;
    console.log("service_dadeeee", this.state);
    if (this.state.myActivity === null) {
      return (
        <div>
          {" "}
          <Loader />{" "}
        </div>
      );
    }

    return (
      <Grid>
        <Card className={classes.MyActivityCrad} >
          <Typography
            style={{
              fontFamily: "Roboto Medium",
              marginLeft: "2%",
              marginTop: "3%",
              marginBottom: "3%",
              fontSize: "18px"
            }}
          >
            My Bookings
          </Typography>

          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="my-activity"
          // className={styles.myActivityTab}
          >
            <Tab eventKey="services" title="Services">
              {/* <ul className={styles.reqNoList}> */}
              {this.state.myActivity.services.length > 0 ?
                this.state.myActivity.services.map(service => {
                  return (

                    <Grid key={service.service_request_number}>
                      <Card style={{ boxShadow: "none" }}>
                        <Grid container>
                          <Grid
                            item
                            lg={3}
                            md={3}
                            sm={3}
                            xs={5}
                            style={{
                              marginLeft: "4%",
                              marginTop: "%",
                              background: ""
                            }}
                          >
                            <Typography
                              style={{
                                marginLeft: "15%",
                                marginTop: "3%",
                                fontFamily: "Roboto Regular",
                                fontSize: "13px"
                              }}
                            >
                              REQUEST NO:
                                </Typography>
                            <Card
                              style={{
                                marginLeft: "%",
                                width: "%",
                                marginTop: "6%",
                                marginRight: "%",
                                border: "1px solid #DADADA"
                              }}
                            >
                              <Typography
                                style={{
                                  marginTop: "8%",
                                  marginBottom: "4%",
                                  textAlign: "center",
                                  fontFamily: "Roboto Medium",
                                  fontSize: "18px"
                                }}
                              >
                                {" "}
                                {service.service_request_number}
                              </Typography>
                              <Card
                                style={{
                                  background: "#616161",
                                  color: "white",
                                  marginTop: "10%"
                                }}
                              >
                                {" "}
                                <Typography
                                  style={{
                                    textAlign: "center",
                                    marginTop: "2%",
                                    marginBottom: "2%",
                                    fontFamily: "Roboto Medium",
                                    fontSize: "16px"
                                  }}
                                >
                                  {" "}
                                  {service.current_state}
                                </Typography>
                              </Card>
                            </Card>
                          </Grid>
                          <Grid
                            item
                            lg={8}
                            md={8}
                            sm={8}
                            xs={6}
                            style={{ background: "", marginLeft: "2%" }}
                          >
                            <Typography
                              style={{
                                marginLeft: "%",
                                marginTop: "2%",
                                fontFamily: "Roboto Medium",
                                fontSize: "18px"
                              }}
                            >
                              {service.service.title}
                            </Typography>
                            <Grid container>
                              <Grid
                                item
                                lg={2}
                                md={2}
                                sm={2}
                                xs={5}
                                style={{ background: "" }}
                              >
                                <Typography
                                  style={{
                                    marginLeft: "%",
                                    fontSize: "12px",
                                    fontFamily: "Roboto Medium",
                                    marginTop: "1%",
                                    marginBottom: "1%",
                                    color: "#bdbdbd"
                                  }}
                                >
                                  Posted For:
                                    </Typography>
                              </Grid>

                              <Grid
                                item
                                lg={10}
                                md={10}
                                sm={10}
                                xs={7}
                                style={{ background: "" }}
                              >
                                <Typography
                                  style={{
                                    marginLeft: "0%",
                                    fontSize: "14px",
                                    fontFamily: "Roboto Medium",
                                    marginTop: "%",
                                    marginBottom: "1%"
                                  }}
                                >
                                  {moment(
                                    service.preferred_time,
                                    "X"
                                  ).format("ll")}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container>
                              <Grid item lg={2} md={2} sm={2} xs={5}>
                                <Typography
                                  style={{
                                    marginLeft: "%",
                                    fontSize: "14px",
                                    fontFamily: "Roboto Medium",
                                    marginTop: "1%",
                                    marginBottom: "1%",
                                    color: "#bdbdbd"
                                  }}
                                >
                                  Location:
                                    </Typography>
                              </Grid>

                              <Grid item lg={10} md={10} sm={10} xs={7}>
                                <Typography
                                  style={{
                                    marginLeft: "0%",
                                    fontSize: "14px",
                                    fontFamily: "Roboto Medium",
                                    marginTop: "%",
                                    marginBottom: "1%"
                                  }}
                                >
                                  {service.location}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Typography
                              style={{
                                marginLeft: "%",
                                marginTop: "2%",
                                fontFamily: "Roboto Medium",
                                fontSize: "14px",
                                color: "red"
                              }}
                            >
                              Request as Urgent
                                </Typography>

                            {service.current_state ===
                              myActivityConstant.INPROGRESS && (
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    this.cancelServiceRequest(service.id)
                                  }
                                  style={{
                                    marginLeft: "%",
                                    background: "#E74A3F",
                                    display: "flex",
                                    marginTop: "1%",
                                    marginBottom: "1%",
                                    color: "white",
                                    height: "20%",
                                    width: "20%"
                                  }}
                                >
                                  CANCEL
                                  </Button>
                              )}
                          </Grid>
                        </Grid>
                      </Card>
                      <Divider
                        style={{
                          marginTop: "4%",
                          marginBottom: "2%",
                          marginLeft: "3%",
                          marginRight: "3%"
                        }}
                      />
                    </Grid>

                  );
                })
                :
                <NoDataAvailable
                  msg={myActivityConstant.NO_SERVICE_BOOKING_FOUND}
                />
              }

            </Tab>


            <Tab eventKey="facilities" title="Facilities">
              {/* <ul className={styles.reqNoList}> */}
              {this.state.myActivity.facilities.length > 0 ?
                this.state.myActivity.facilities.map(facilityBooking => {
                  console.log(facilityBooking, "bbb");
                  return (
                    // facilityBooking.booked_facilities.map(booked_facilitiess=>{
                    //   return(

                    <Grid key={facilityBooking.facility_booking_number} >
                      <Card className={classes.BookedFacilitiesCard} >
                        <Grid container>
                          <Grid item lg={4} md={4} sm={4} xs={4} style={{ background: '' }}>
                            <Card
                              style={{
                                marginLeft: "4%",
                                marginTop: "2%",
                                marginBottom: "6%",
                                border: "1px solid #DADADA",
                                background:'',
                                boxShadow:'none'

                              }}
                            >
                              <Typography
                                style={{
                                  marginTop: "15%",
                                  marginBottom: "4%",
                                  textAlign: "center",
                                  fontFamily: 'Roboto Medium',
                                  fontSize: '16px'
                                }}
                              >
                                {facilityBooking.facility_booking_number}
                              </Typography>
                              <Card
                                style={{
                                  // background: "#616161",
                                  color: "white",
                                  marginTop: "12%"
                                }}
                              >
                                <Typography
                                  style={{
                                    textAlign: "center",
                                    marginTop: "2%",
                                    marginBottom: '2%',
                                    fontFamily: 'Roboto Medium',
                                    fontSize: '16px'
                                  }}
                                >
                                  {" "}
                                  {/* {booked_facilitiess.status} */}
                                </Typography>
                              </Card>
                            </Card>
                          </Grid>
                          < Grid
                            item
                            lg={6}
                            md={6}
                            sm={6}
                            xs={6}
                            className={classes.rightGrid}
                            style={{ background: '' }}
                          >
                            <Typography style={{ fontFamily: 'Roboto Medium', fontSize: '14px' }}>
                              {facilityBooking.facility.title}
                            </Typography>
                            < Grid container >
                              <Grid
                                item
                                lg={4}
                                md={3}
                                sm={3}
                                xs={6}
                                style={{ background: "" }}
                              >
                                <Typography
                                  style={{
                                    marginLeft: "%",
                                    marginTop: "%",
                                    marginBottom: "%",
                                    color: "#bdbdbd",
                                    fontFamily: 'Roboto Regular',
                                    fontSize: '14px'
                                  }}
                                >
                                  Posted In:
                                      </Typography>
                              </Grid>
                              <Grid
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                                style={{ background: "" }}
                              >
                                <Typography className={classes.postDate}>
                                  {moment(facilityBooking.created_at, "X").format(
                                    "ll"
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Typography style={{ marginLeft: "%", fontFamily: 'Roboto Regular', fontSize: '12px' }}>
                              {`${moment(facilityBooking.created_at, "X").format(
                                "LT"
                              )}`}
                            </Typography>
                            <Typography style={{ fontFamily: 'Roboto Medium', fontSize: '14px' }}>
                              {facilityBooking.location}
                            </Typography>

                            {facilityBooking.cancellable && (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  this.cancelTicketBooking(
                                    facilityBooking.facility_booking_number
                                  )
                                }
                                style={{
                                  marginLeft: "%",
                                  background: "#E74A3F",
                                  marginTop: "1%",
                                  marginBottom:'2%',
                                  color: "white",
                                  height: "auto",
                                  width: "auto"
                                }}
                              >
                                CANCEL
                                    </Button>
                            )}
                          </Grid>
                          <Grid item lg={1} md={1} sm={1} xs={1} style={{ paddingTop: "3%", background: "", textAlign: "end" }}>
                            <div

                              title={`${facilityBooking.isOpen ? 'Hide' : 'Show'} booking details.`}
                            >
                              {
                                facilityBooking.isOpen ?
                                  <div
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => { this.ticketExpandClose(facilityBooking.facility_booking_number); }}
                                  >
                                    <i className="glyphicon glyphicon-triangle-bottom" />
                                  </div>
                                  :
                                  <div
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => { this.ticketExpandClose(facilityBooking.facility_booking_number); }}
                                  >
                                    <i className="glyphicon glyphicon-triangle-right" />
                                  </div>
                              }
                            </div>
                            <div className="clearfix" />
                          </Grid>
                        </Grid>
                      </Card>
                      <Divider></Divider>


                      {
                        facilityBooking.isOpen &&
                        <div
                          style={{

                            background: '#f7f7f7'

                          }}>
                          {
                            facilityBooking.booked_facilities.map((booking) => {
                              return (
                                <div key={booking.booking_number}>


                                  <Grid container style={{ paddingLeft: '2%' }}>
                                    <Grid item lg={4} md={4} sm={4} xs={5}>
                                      <Card
                                        style={{
                                          marginLeft: "15%",
                                          marginTop: "5%",
                                          marginBottom: '5%',
                                          border: "1px solid #DADADA",
                                          background: '#f7f7f7'

                                        }}
                                      >
                                        <Typography
                                          style={{
                                            marginTop: "8%",
                                            marginBottom: "4%",
                                            textAlign: "center",
                                            fontFamily: 'Roboto Medium',
                                            fontSize: '16px'
                                          }}
                                        >
                                          {booking.booking_number}
                                        </Typography>
                                        <Card
                                          style={{
                                            background: "#616161",
                                            color: "white",
                                            marginTop: "10%"
                                          }}
                                        >
                                          <Typography
                                            style={{
                                              textAlign: "center",
                                              marginTop: "2%",
                                              marginBottom: '2%',
                                              fontFamily: 'Roboto Medium',
                                              fontSize: '16px'
                                            }}
                                          >
                                            {" "}
                                            {booking.status}
                                          </Typography>
                                        </Card>
                                      </Card>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      md={7}
                                      sm={7}
                                      xs={6}
                                      className={classes.rightGrid}
                                      style={{}}
                                    >
                                      <Typography style={{ fontFamily: 'Roboto Medium', fontSize: '14px' }}>
                                        {booking.title}
                                      </Typography>
                                      <Grid container>
                                        <Grid
                                          item
                                          lg={4}
                                          md={3}
                                          sm={3}
                                          xs={6}
                                          style={{ background: "" }}
                                        >
                                          <Typography
                                            style={{
                                              marginLeft: "%",
                                              marginTop: "%",
                                              marginBottom: "%",
                                              color: "#bdbdbd",
                                              fontFamily: 'Roboto Regular',
                                              fontSize: '14px'
                                            }}
                                          >
                                            Posted For:
                                      </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          lg={6}
                                          md={6}
                                          sm={6}
                                          xs={6}
                                          style={{ background: "" }}
                                        >
                                          <Typography className={classes.postDate}>
                                            {moment(booking.from_time, 'X').format('ll')}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Typography style={{ marginLeft: "%", fontFamily: 'Roboto Regular', fontSize: '12px' }}>
                                        {`${moment(booking.from_time, 'X').format('LT')} To ${moment(booking.to_time, 'X').format('LT')}`}
                                      </Typography>
                                      <Typography style={{ fontFamily: 'Roboto Medium', fontSize: '14px' }}>
                                        {facilityBooking.location}
                                      </Typography>

                                      {booking.status === myActivityConstant.UPCOMING && (
                                        <Button
                                          variant="contained"
                                          onClick={() => this.cancelFacilityBooking(booking.booking_number)}
                                          style={{
                                            marginLeft: "%",
                                            background: "#E74A3F",
                                            marginTop: "1%",
                                            color: "white",
                                            height: "auto",
                                            width: "auto"
                                          }}
                                        >
                                          CANCEL
                                    </Button>
                                      )}
                                    </Grid>
                                   
                                  </Grid>
<Divider ></Divider>
                                </div>
                                
                              );
                            })
                          }
                        </div>
                      }

                    </Grid>

                  )
                })
                :
                <NoDataAvailable
                  msg={myActivityConstant.NO_FACILITY_BOOKING_FOUND}
                />
              }
              {/* </ul> */}
            </Tab>
          </Tabs>
          <Dialog
            ref={el => {
              this.dialog = el;
            }}
          />
        </Card>
      </Grid>
    );
  }
}
export const mapStateToProps = state => myActivitySelector(state);
export default connect(mapStateToProps)(withStyles(design)(MyActivity));