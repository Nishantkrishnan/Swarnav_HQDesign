import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';
import styles from './ServiceImageUpload.css';
import {
  Button,
  Grid,TextField,Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const design = theme => ({
  imgBtn: {
    backgroundColor:'transparent',  position:'relative', marginTop:"%",left:'495px',bottom:"65px",
    ["@media (min-width:200px) and (max-width:1280px)"]: {
      left:'260px'
    },
    ["@media (min-width:300px) and (max-width:360px)"]: {
      left:'250px',
      bottom:'64px'
    },
    ["@media (min-width:366px) and (max-width:375px)"]: {
      left:'258px',
      bottom:'64px'
    },
    ["@media (min-width:376px) and (max-width:450px)"]: {
      left:'290px',
      bottom:'64px'
    },
    ["@media (min-width:450px) and (max-width:1024px)"]: {
      left:'490px',
      bottom:'80px'
    },
  },
})
class ServiceImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      imageFiles: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      maxFilesError: null,
    };
    this.onDropFile = this.onDropFile.bind(this);
  }
  /* Handle file validation */
  onDropFile = (e) => {
    if (!e.target.value) {
      return;
    }
    let imageFiles = [...this.state.imageFiles];
    let pictures = [...this.state.pictures];
    const files = e.target.files;
    const notAcceptedFileType = [];
    const notAcceptedFileSize = [];
    setTimeout(function () {
      this.setState({
        notAcceptedFileType: [],
        notAcceptedFileSize: [],
        maxFilesError: null,
      });
    }.bind(this), 5000);
    // Clear all previous errors.
    this.setState({ notAcceptedFileSize, notAcceptedFileType, maxFilesError: null });
    if (!this.props.singleImage && ((imageFiles.length + files.length) > this.props.maxFiles)) {
      this.setState({ maxFilesError: `Selected files exceed maximum allowed files ${this.props.maxFiles}.` });
      e.target.value = null;
      return;
    }
    // Iterate over all uploaded files
    Array.from(files).forEach((file) => {
      // Check for file extension
      if (!this.hasExtension(file.name)) {
        notAcceptedFileType.push(file.name);
        return;
      }
      // Check for file size
      if (file.size > this.props.maxFileSize) {
        notAcceptedFileSize.push(file.name);
        return;
      }
      const reader = new FileReader();
      // Read the image via FileReader API and save image result in state.
      reader.onloadend = () => {
        if (this.props.singleImage) {
          pictures = [reader.result];
          imageFiles = [file];
        } else {
          pictures.push(reader.result);
          imageFiles.push(file);
        }
        this.setState({ pictures, imageFiles });
        // If callback giving, fire.
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(imageFiles);
        }
      };
      reader.readAsDataURL(file);
    });
    // Set error files array.
    this.setState({ notAcceptedFileSize, notAcceptedFileType });
    // Set file field to null to fire on change event if the user select the same image.
    e.target.value = null;
  }
  /* Check file extension (onDropFile) */
  hasExtension = (fileName) => {
    return (new RegExp(`(${this.props.imgExtension.join('|').replace(/\./g, '\\.')})$`)).test(fileName);
  }
  /* Remove the image from state */
  removeImage(index) {
    const pictures = [...this.state.pictures];
    const imageFiles = [...this.state.imageFiles];
    pictures.splice(index, 1);
    imageFiles.splice(index, 1);
    this.setState({ pictures, imageFiles });
    // If callback giving, fire.
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(imageFiles);
    }
  }
  /* Render label */
  renderLabel = () => {
    if (this.props.withLabel) {
      return <span className={this.props.labelClass}>{this.props.label}</span>;
    }
    return '';
  }
  /* Check if any errors && render */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <FlipMove enterAnimation="none" leaveAnimation="fade" duration={750} style={{color:'red', marginLeft:'4%',fontFamily:'Roboto Regular',fontSize:'14px'}} key={index}>
            <div  key={index} >
              * {error} {this.props.fileTypeError}
            </div>
          </FlipMove>
        );
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <FlipMove enterAnimation="none" leaveAnimation="fade" style={{ color:'red', marginLeft:'4%',fontFamily:'Roboto Regular',fontSize:'14px' }} key={index}>
            <div className={classNames(this.props.errorClass)} key={index} style={this.props.errorStyle}>
              * {error} {this.props.fileSizeError}
            </div>
          </FlipMove>
        );
      });
    }
    if (this.state.maxFilesError) {
      notAccepted = (
        <FlipMove enterAnimation="none" leaveAnimation="fade" style={{ color:'red', marginLeft:'4%',fontFamily:'Roboto Regular',fontSize:'14px'}}>
          <div className={classNames(this.props.errorClass)} style={this.props.errorStyle}>
            * {this.state.maxFilesError}
          </div>
        </FlipMove>
      );
    }
    return notAccepted;
  }
  /* Render preview images */
  renderPreview() {
    return (
      <FlipMove enterAnimation="fade" leaveAnimation="none" style={{ display: 'inline' }}>
        {this.state.pictures.map((picture, index) => {
          return (
          <Grid key={index} className={styles.uploadPictureContainer}>
              <div role="button" tabIndex="0" className={styles.deleteImage} onClick={() => this.removeImage(index)}>X</div>
              <img src={picture} className={styles.uploadedPicture} alt="preview" />
            </Grid>
    /*  <Grid>
      <Paper  style={{background:'black',height:'1px'}}>
      <div role="button" tabIndex="0" className={styles.deleteImage} onClick={() => this.removeImage(index)}>X</div>
      <img src={picture} className={styles.uploadedPicture} alt="preview" />
      </Paper>
        </Grid>*/
          );
        })}
      </FlipMove>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div  >
        <div >
          {this.renderErrors()}
        </div>
        {<span>
          <input
          style={{display:'none',background:"red"}}
            type="file"
            ref={(input) => { this.inputElement = input; }}
            multiple={this.props.singleImage ? '' : 'multiple'}
            onChange={this.onDropFile}
            accept={this.props.accept}
            id="contained-button-file"
          />
          </span> }
<label htmlFor="contained-button-file">
          <Button  component="span" className= {classes.imgBtn} >
             <i class="material-icons">photo</i>
          </Button>
        </label>
{/* <label htmlFor="contained-button-file">
          <Button  component="span" style={{backgroundColor:'transparent'}} >
             <i class="material-icons">photo</i>
          </Button>
        </label> */}
        {/* </span> */}
        {/* Image Preview Span */}
        {this.props.withPreview ? this.renderPreview() : null}
        {/* End Image Preview Span */}
      </div>
    );
  }
}
ServiceImageUpload.defaultProps = {
  className: '',
  buttonClassName: {},
  buttonStyles: {},
  withPreview: false,
  accept: 'accept=image/*',
  name: '',
  buttonText: 'ADD PHOTOS',
  withLabel: true,
  label: 'Max image size: 5mb, file type: jpg|gif|png',
  labelStyles: {},
  labelClass: '',
  imgExtension: ['.jpg', '.gif', '.png', '.jpeg', '.JPG', '.JPEG', '.PNG'],
  maxFileSize: 5242880,
  maxFiles: 5,
  fileSizeError: ' image size is too big',
  fileTypeError: ' is unsupported image extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  singleImage: false,
};
ServiceImageUpload.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.object,
  buttonStyles: PropTypes.object,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  maxFiles: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
};
export default withStyles(design)(ServiceImageUpload);
