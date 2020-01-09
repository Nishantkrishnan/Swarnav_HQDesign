import React from "react";
import {
  Grid,
  Fab,
  Button,
  Navigation,
  Card,
  Avatar,
  Paper,
  Divider,
  InputBase,
  IconButton,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  rightPanelCard: {
    background: "#FFFFFF",
    borderRadius: "7px",
    borderRadius: "7px",
    marginTop: "0%",
    paddingBottom: "7%",
    boxShadow:'none',

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
class RightPanel extends React.Component {
  state = {
    suguser: [
      {
        name: "Murali M",
        pic:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTJnaQlcvwo4wx5mcR4_CaJCWhHA3uz9MSHw2IBvW_-0KGXFVrQ&s"
      },
      {
        name: "Nishant Krishnan"
      },
      {
        name: "Shalu Rani",
        pic:
          "data:image/jpeg;base64,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"
      }
    ],
    events: [
      {
        etitle: "Independence Day",
        event:
          " Independence Day Celebration at Goodwork Labs.Lets celebrate the day with peace and enthusiasm Independence Day Celebration at Goodwork Labs."
      },
      {
        etitle: "Coworks Yoga Day",
        event:
          " Coming 22nd we are celebrating yoga day, with cordination to Yoga Astha "
      }
    ]
  };
  render() {
    const { classes } = this.props;
    const { suguser, events } = this.state;
    return (
      <Card className={classes.rightPanelCard} style={{height:"542px"}}>

      </Card>
    );
  }
}
RightPanel.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(RightPanel);



//
//
//
// <Grid container className={classes.rightPanelPaper} >
//   <Grid item md={1} sm={1} xs={1}>
//     <IconButton>
//       <SearchIcon />
//     </IconButton>
//   </Grid>
//   <Grid item md={10} sm={10} xs={10}>
//     <InputBase
//       className={classes.rightPanelSearchField}
//       placeholder="Search"
//     />
//   </Grid>
// </Grid>
// <Typography
//   className={classes.rightPanelSuggestions}
//   style={{ fontSize: "22px" }}
// >
//   Events
//   {events.map(eve => {
//     return (
//       <Grid>
//         <Typography
//           className={classes.eventTitle}
//           style={{
//             color: "#212121"
//           }}
//         >
//           {eve.etitle}
//         </Typography>
//         <Typography
//           className={classes.event}
//           style={{ color: "#4E4B4B" }}
//         >
//           {eve.event}
//         </Typography>
//         <Divider className={classes.divider} />
//       </Grid>
//     );
//   })}
// </Typography>
// <Typography
//   className={classes.rightPanelSuggestions}
//   style={{
//     fontSize: "22px",
//     color: "#343434",
//     background:''
//   }}
// >
//   Suggestions
//
// {suguser.map(user => {
//   return (
//     <Grid container className={classes.rightPanelSuggestionAvatar}>
//       <Grid
//         item
//         md={2}
//         sm={2}
//         xs={2}
//         style={{
//           width: "45px",
//           height: "45px",
//           border: "3px solid #FFFFFF",
//           background: ""
//         }}
//       >
//         <Avatar alt="suggest_user" src={user.pic} />
//       </Grid>
//       <Grid item md={6} sm={7} xs={7}>
//         <Typography
//           className={classes.rightPanelSuggestionUser}
//           style={{
//             fontSize: "14px",
//             color: "#343434"
//           }}
//         >
//           {user.name}
//         </Typography>
//       </Grid>
//       <Grid item md={3} sm={2} xs={2}>
//         <Button
//           className={classes.rightPanelButton}
//           variant="outlined"
//           onClick={this.handleSuggestFollow}
//           style={{ backgroundColor: this.state.backgroundColor }}
//         >
//           <Typography className={classes.rightPanelButtonText}>
//             Follow
//           </Typography>
//         </Button>
//       </Grid>
//     </Grid>
//   );
//
//
// })}
// </Typography>
