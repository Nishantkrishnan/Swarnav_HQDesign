import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './RightPanel.css';
import { logOut } from '../../Routes/Landing/Login/Login.actions';
import{ Grid,Button, withStyles,Card,Typography,Hidden,MenuItem,Select} from "@material-ui/core";

const design = theme => ({
  rightPanelCard: {
    background: "#FFFFFF",
    borderRadius: "7px",
    borderRadius: "7px",
    marginTop: "0%",
    paddingBottom: "7%",
    boxShadow:'none',
    marginTop:'1%',
    background:"red ! important",


  },
  rightPanelPaper: {
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    borderRadius: "31px",
    borderRadius: "31px",
    width: "88%",
    marginLeft: "5.2%",
    marginTop: "4%",
    fontFamily:'Roboto'
  },
  rightPanelSearchField: {
    paddingLeft: "6%",
    paddingTop: "4%",
    fontSize: "14px",
    color: "#939393"
  },
  rightPanelSuggestions: {
    fontSize: "22px",
    color: "#343434",
    marginLeft: "5.2%",
    marginTop: "4%",
    marginRight: "5.2%",
    fontFamily:'Roboto Medium',
    background:''
  },
  rightPanelSuggestionUser: {
    fontSize: "14px",
    fontFamily:'Roboto Medium',
    color: "#343434",
    paddingLeft: "4%",
    marginTop: "5%"
  },
  rightPanelButton: {
    border: "1px solid #E95A29",
    borderRadius: "18px",
    borderRadius: "18px"
  },
  rightPanelButtonText: {
    fontSize: "14px",
    color: "#E95A29",
    textAlign: "center"
  },
  rightPanelSearchIcon: {
    width: "17.5px",
    height: "17.5px",
    marginLeft: "1px"
  },
  rightPanelSuggestionAvatar: {
    // width: "45px",
    // height: "45px",
    // border: "3px solid #FFFFFF",
    // marginLeft: "5.2%",
    marginTop: "4%"
  },
  eventTitle: {
    fontSize: "15px",
    fontFamily:'Roboto Medium',
    color: "#343434",
    marginTop: "4%"
  },
  event: {
    color: "#4E4B4B",
    marginTop: "0.9%",
     fontFamily:'Roboto Regular',
    fontSize: "14px"
  },
  divider: {
    marginTop: "1%",
    marginBottom: "1%"
  }
});


class RightPanel extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.destroySession = this.destroySession.bind(this);
  }

  destroySession = () => {
    this.props.dispatch(logOut({ userToken: null }));
  }

  render() {
    const { classes } = this.props;

    return (
      <Card  style={{height:"542px", marginTop:"-2.5%",boxShadow:'none'}} >

      </Card>
      // <nav id="spy">
      //   <ul className="sidebarNav nav">
      //     <li>
      //       <Link className={styles.sidebarNavAnchor} title="Following" to="/following">
      //         <h2 className="fas fa-user-secret"></h2>
      //         <div>Following</div>
      //       </Link>
      //     </li>
      //     <li>
      //       <Link className={styles.sidebarNavAnchor} title="Followers" to="/followers">
      //         <h2 className="fas fa-users"></h2>
      //         <div>Followers</div>
      //       </Link>
      //     </li>
      //     <li>
      //       <Link className={styles.sidebarNavAnchor} to="/logout" title="Logout"
      //         onClick={(e) => {
      //           e.preventDefault();
      //           e.stopPropagation();
      //           this.destroySession();
      //         }}>
      //         <h2 className="fas fa-power-off" style={{color: '#f57d7d'}}></h2>
      //         <div>Logout</div>
      //       </Link>
      //     </li>
      //   </ul>
      // </nav>
    );
  }
}

export default withStyles(styles)(RightPanel);
