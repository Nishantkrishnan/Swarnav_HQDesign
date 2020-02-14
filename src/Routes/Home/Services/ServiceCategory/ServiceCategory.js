import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookService from '../../BookService/BookService';
// import Button from '../../../../components/Button/Button';
import { checkServiceRequestCondition } from '../Services.actions';
import servicesSelector from '../Services.selectors';
import styles from '../Services.css';
import{ Grid,Button, withStyles,Card,Typography,Hidden,MenuItem,Select,CardContent, CardMedia,GridList,GridListTile,ListSubheader, CardActions} from "@material-ui/core";

const design = theme => ({
  cardServices:{
    width: "66%",
    paddingLeft: "1%",
     paddingRight: "1%",
      boxShadow:'none',
     ["@media (max-width:48em)"]: {
      width: "98%",
    }},
    cubeCards: {
      width: '32% ! important',
      background: "#EDEDED",
      // borderRadius: "7px",
      // borderRadius: "7px",
      borderRadius: "7px 7px 0 0",
      boxShadow:'none',
      height:'100%',
      ["@media (max-width:48em)"]: {
        height: "100%",
      },
    },
    innerCubeCards: {

      borderRadius: "7px 7px 0 0",
      boxShadow: "none",
      height: "150px ! important ",
      ["@media (max-width:48em)"]: {
        height: "110px ! important"
      }
    },
    title: {
      fontFamily: "Roboto Medium",
      fontSize: "24px",
      color: "#030303",
      letterSpacing: "-0.15px",
      paddingLeft: "2%",
      paddingTop: "3%",
      paddingBottom: "3%",
      boxShadow:'none',
    },
    innerCardTitle: {
      fontFamily: "Roboto",
      fontSize: " 14px",
      color: "#030303",
      letterSpacing: "0",
      textAlign: "center",
      paddingTop: "0.7%",
      paddingBottom: "0.7%",
      boxShadow:'none',
       ["@media (max-width:48em)"]: {
        fontSize:'16px'
      }}
});
class ServiceCategory extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    serviceCategory: PropTypes.object,
    handleBackBtnClick: PropTypes.func,
    serviceRequestCondition: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
  };
  constructor(props) {
    super(props);
    this.state = {
      serviceIndex: 0,
      proceedToServiceBooking: false,
      service: {},
    };
  }
  componentDidMount() {
    document.title = "GoodWorks HQ - Services";
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceRequestCondition) {
      const serviceRequestCondition = nextProps.serviceRequestCondition;
      if (this.state.service.id === serviceRequestCondition.serviceId) {
        this.setState({ proceedToServiceBooking: true });
      }
    }
  }
  handleServiceClick = (serviceItem) => {
    this.setState({ service: serviceItem },
      () => { this.props.dispatch(checkServiceRequestCondition(serviceItem.id, this.props.currentLocation.toJS().id)); });
  }

  handleBackBtnClick = () => {
    const proceedToServiceBooking = !this.state.proceedToServiceBooking;
    this.setState({ proceedToServiceBooking });
  }
  render() {
    const { classes } = this.props;
    const { serviceCategory, handleBackBtnClick } = this.props;
    console.log(serviceCategory, "service categoriesssssss");
    return (
      <Card style={{boxShadow:'none',marginLeft:'1.5%'}} className={classes.cardServices}>

        {!this.state.proceedToServiceBooking &&


                serviceCategory.map(((serviceItems) => {
                  return (

<Grid  key={serviceItems.id + serviceItems.title} style={{marginTop:'2%',marginLeft:'0.5%'}}>
  <Typography style={{fontSize:'16px',marginLeft:'1%',marginBottom:'1%',fontFamily:'Roboto Medium'}}>{serviceItems.title}</Typography>
  <GridList  style={{textTransform:'none',textDecoration:'none',overflowX:'hidden'}}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>

        </GridListTile>
  {serviceItems.services.map(((serviceItem) => {
                       return (
                         <Card className={classes.cubeCards} style={{marginRight:'0.5%',marginBottom:'1%',marginLeft:'0.5%',padding:0}}>
                  <CardContent

                    role="button"
                    tabIndex="0"
                    style={{padding:0 }}
                    onClick={() => { this.handleServiceClick(serviceItem) }}

                  >
                    <img  style={{ boxShadow: "none"}} width = "100%" src=  {serviceItem.images[0] ? serviceItem.images[0].original : ''} alt={serviceItem.title} className={classes.innerCubeCards} />



                  </CardContent>
                  <CardActions className={classes.innerCardTitle}>{serviceItem.title}</CardActions>
                  </Card>
                       )
                       }))}
                       </GridList>

                   </Grid>
                    );
                }))


        }

        {this.state.proceedToServiceBooking &&
          <BookService
          serviceTypeId={serviceCategory.id}
          serviceId={this.state.service.id}
          serviceName={this.state.service.title}
          handleBackBtnClick={this.handleBackBtnClick}

          />}

      </Card>
    );
  }
}
export const mapStateToProps = state => servicesSelector(state);
export default connect(mapStateToProps)(withStyles(design)(ServiceCategory))
