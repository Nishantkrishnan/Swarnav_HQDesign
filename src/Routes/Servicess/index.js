import React from "react";
import { Grid, Card, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   
    
  
  
  
    
   
  
  
  });

class Servicess extends React.Component{
    render(){
        const { classes } = this.props
        return(
            <React.Fragment> 
                <React.Fragment>        
                  <Grid container  style={{width:'600px'}} direction="row"
            justify="space-evenly"
            alignItems="flex-start">
                <Card style={{width:'150px',height:'150px'}}>
                    <img src="" style={{width:'150px',height:'110px', background:"grey"}}></img>
                    <Typography>hhii</Typography>

                </Card>
                
                <Card style={{width:'150px',height:'150px'}}>
                    <img src="" style={{width:'150px',height:'110px', background:"grey"}}></img>
                    <Typography>hhii</Typography>

                </Card>
                <Card style={{width:'150px',height:'150px'}}>
hhiii
                </Card>
                </Grid>
                </React.Fragment>
                
 <Grid>
                    <Card style={{width:'150px',height:'150px'}}>
                    <img src="" style={{width:'150px',height:'110px', background:"grey"}}></img>
                    <Typography>hhii</Typography>

                </Card>
                
                <Card style={{width:'150px',height:'150px'}}>
                    <img src="" style={{width:'150px',height:'110px', background:"grey"}}></img>
                    <Typography>hhii</Typography>

                </Card>
                <Card style={{width:'150px',height:'150px'}}>
hhiii
                </Card>
            </Grid>
            </React.Fragment>
            
        )
    }

}
Servicess.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Servicess);