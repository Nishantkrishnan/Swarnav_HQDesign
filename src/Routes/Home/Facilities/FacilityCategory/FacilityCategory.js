import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Button from '../../../../components/Button/Button';
import Facility from '../Facility/Facility';
import BookFacility from "../../BookFacility/BookFacility"
import styles from '../Facilities.css';
// import { withStyles } from "@material-ui/core/styles";
import{ Grid,Button, withStyles,Card,Typography,Hidden,MenuItem,Select,CardContent, CardMedia,GridList,GridListTile,ListSubheader, CardActions} from "@material-ui/core";
const design = theme => ({
  cardFacilities: {

    width: "66%",
    paddingLeft: "1%",
    paddingRight: "1%",
    boxShadow: "none",
    ["@media (max-width:48em)"]: {
      width: "98%"
    }
  },
  cubeCards: {

    width: '32% ! important',
    marginRight:'1%',
    marginBottom:'1%',
    boxShadow:'none',
    // display:' inline-block',
    // minHeight:' 1px',
    // padding: '0 5px',
    // height:' 700px',
    // overflow:' hidden',
    // marginBottom: '10px',

    background: "#EDEDED ! important",
    borderRadius: "7px",
    borderRadius: "7px",

    boxShadow: "none",
    height: "100%",
    ["@media (max-width:48em)"]: {
      height: "100%"
    }
  },
  ff:{
    padding:'0 !  important',
  },
  innerCubeCards: {

    background: "#848484 ! important",
    margin:'0 !  important',
    borderRadius: "7px 7px 0 0",
    boxShadow: "none",
    height: "130px ! important ",
    ["@media (max-width:48em)"]: {
      height: "110px ! important"
    }

  },
  title: {
    fontFamily: "Roboto Medium",
    fontSize: "16px",
    color: "#030303",
    letterSpacing: "-0.15px",
    paddingLeft: "1%",
    paddingTop: "2%",
    paddingBottom: "2%"
  },
  innerCardTitle: {
    fontFamily: "Roboto Regular",
    fontSize: " 14px",
    color: "#030303",
    letterSpacing: "0",
    textAlign: "center",
    paddingTop: "0.7%",
    paddingBottom: "0.7%",
    margin:0,
        ["@media (max-width:48em)"]: {
      fontSize: "16px"
    }
  }
});
class FacilityCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilityIndex: 0,
      individualFacility: false,
    };
  }
  handleBackBtnClick = () => {
    const individualFacility = !this.state.individualFacility;
    this.setState({ individualFacility });
  }
  handleFacilityClick = (facilityIndex) => {
    const individualFacility = !this.state.individualService;
    this.setState({ facilityIndex, individualFacility });
  }
  componentDidMount() {
    document.title = "GoodWorks HQ - Facility";
  }
  render() {
    const { facilityCategory, handleBackBtnClick } = this.props;
    const { classes } = this.props;
    const { location } = this.state;
    return (
      <Card style={{boxShadow:'none',marginLeft:'1%'}} className={classes.cardFacilities}>

            <Typography className={classes.title}>Meeting Rooms</Typography>
            <Typography style={{marginTop:'',marginBottom:'1%',color:'red',fontFamily:'Roboto Medium',fontSize:'12px',marginLeft:'1%'}}>Note: You can avail maximum of 4 facilities in a month  </Typography>


        {!this.state.individualFacility &&
          <GridList   style={{overflowX:'hidden'}}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          {/* <ListSubheader component="div" style={{fontSize:'18px'}}>Meeting Rooms</ListSubheader> */}
        </GridListTile>
            { facilityCategory.facilities.map(((facilityItem, index) => {
              return (

                <Card className={classes.cubeCards} key={facilityItem.id + facilityItem.title}>
                  <CardContent className={classes.ff}

                    role="button"
                    tabIndex="0"
                    style={{ boxShadow: "none" ,margin:0}}
                    onClick={() => { this.handleFacilityClick(index); }}

                  >
                    <img  style={{ boxShadow: "none"}} width = "100%" src=  {facilityItem.images.length > 0 ? facilityItem.images[0].original : null} alt={facilityItem.title} className={classes.innerCubeCards} />
                    {/* <CardMedia
                    className={classes.innerCubeCards}
                      component="img"
                      image=  {facilityItem.images.length > 0 ? facilityItem.images[0].original : null} alt={facilityItem.title}
                      /> */}


                  </CardContent>
                  <CardActions className={classes.innerCardTitle}>{facilityItem.title}</CardActions>
                </Card>

                );
            }))}
          </GridList>
        }
        {this.state.individualFacility &&
          <BookFacility
            facility={facilityCategory.facilities[this.state.facilityIndex]}
            handleBackBtnClick={this.handleBackBtnClick}
            facilityId={facilityCategory.facilities[this.state.facilityIndex].id} facilityName={facilityCategory.facilities[this.state.facilityIndex].title}
            />
          }
      </Card>
    );
  }
}
FacilityCategory.propTypes = {
  facilityCategory: PropTypes.object,
  handleBackBtnClick: PropTypes.func,
  classes: PropTypes.object.isRequired
};
export default withStyles(design)(FacilityCategory);
