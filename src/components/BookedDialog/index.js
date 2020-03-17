import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Button, Dialog,Icon
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({

});
class Booked extends React.Component {
  render() {
    const { open, toggleCreatePostDialogClose } = this.props;
    const { classes } = this.props;
    return (
      <Dialog open={open}  >
        <Grid >
     <Card   style={{width:'600px',height:'25vh'}}>
         <Icon class="material-icons" style={{marginTop:'6%',marginLeft:'45%',fontSize:'250%'}} >
check_circle
</Icon>
<Typography style={{marginTop:'2%',marginLeft:'35%',fontSize:'18px'}}>Booked Successfully</Typography>
<Grid style={{ border: "1px solid #DADADA",
              borderRadius: "31px",
              borderRadius: "31px",
              width:'20%',
              height:'18%',
              display:'flex',marginTop:'3%',marginLeft:'38%',
              background: "linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)"}}>
                <Button style={{marginLeft:'25%',marginTop:'1%',color:'white'}}>OK</Button>
              </Grid>
     </Card>
     </Grid>
     </Dialog>
    );
  }
}
Booked.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Booked);
