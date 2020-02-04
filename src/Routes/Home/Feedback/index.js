import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
} from 'react-bootstrap';
import { sendFeedback, showLoader } from './Feedback.actions';
import feedbackSelector from './Feedback.selectors';
import Wrapper from '../../hoc/Wrapper';
import { Loader } from '../../../containers/Loader/Loader';
import { blockLocationAndOpen } from '../Locations/Locations.actions';
import {Card,Typography} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
const design = theme => ({
FeedbackCard:{
  width:'66%',
  marginLeft:'2%',background:'',
  ["@media (max-width:48em)"]: {
    width:'95%'
  },
},
});
class Feedback extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    showLoader: PropTypes.bool,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  sendFeedback = () => {
    console.log("Select:::::::", this.location.value)
    this.props.dispatch(sendFeedback(this.title.value, this.description.value, this.location.value));
    this.props.dispatch(showLoader(true));
  }

  componentDidMount()
  {
    document.title = "GoodWorks HQ - FeedBack";
    this.props.dispatch(blockLocationAndOpen(true));
  }

  render() {
    const {classes}=this.props
    return (
      <Card className={classes.FeedbackCard}>
     <Typography  style={{marginLeft:'2%',fontSize:'18px',fontFamily:'Roboto Medium',marginBottom:'2%',marginTop:'1%'}}>Feedback</Typography>
        <Form  style={{background:'', marginLeft:'2%', width:'95%'}}
          onSubmit={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.sendFeedback();
            }
          }
        >
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel className="sr-only">Location</ControlLabel>
            <FormControl
              inputRef={(ref) => { this.location = ref; }}
              componentClass="select"
            >
              {
                this.props.locations && this.props.locations.map(location => {
                  return(<option value={location.id}>{location.address_line1}</option>);
                })
              }
            </FormControl>
            <FormControl.Feedback />
            <HelpBlock>Select a location</HelpBlock>

            <ControlLabel className="sr-only">Tilte</ControlLabel>
            <FormControl
              type="text"
              placeholder="Feedback Title"
              inputRef={(ref) => { this.title = ref; }}
              required="true"
              autoFocus=""
            />
            <FormControl.Feedback />
            <HelpBlock>Give feedback title</HelpBlock>

            <ControlLabel className="sr-only">Description</ControlLabel>
            <FormControl
              type="textarea"
              componentClass="textarea"
              placeholder="Description"
              inputRef={(ref) => { this.description = ref; }}
              required="true"
              autoFocus=""
            />
            <FormControl.Feedback />
            <HelpBlock>Give feedback description.</HelpBlock>

            <Button   style={{background:'#E84A3F'}} type="submit" className="btn btn-lg btn-success btn-block">Post</Button>
          </FormGroup>
        </Form>
        {this.props.showLoader && <Loader />}
      </Card>
    );
  }
}

export const mapStateToProps = state => feedbackSelector(state);
export default connect(mapStateToProps)(withStyles(design)(Feedback));
