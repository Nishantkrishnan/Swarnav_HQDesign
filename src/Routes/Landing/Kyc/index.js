import React, { Component } from 'react';
import{ Button,withStyles} from "@material-ui/core";
import ReactPhoneInput from "react-phone-input-2";
import Select from "react-select";
import styles from "./kyc.css";

var design = theme => ({
  navBar:{
   width:"100%",
   boxShadow:"0px 1px 1px #f9f3f9"
  },
  headerLogo: {
    height: "41px",
    ["@media (max-width:360px)"]: {
      height: "35px"
    },
  }
});

class Kyc extends Component {

  state ={
    phone:"",
    addressProof:"",
    file: '',
    imagePreviewUrl: '',
    file1: '',
    imagePreviewUrl1:''
  }

  handleSelect = (event) => {
    console.log('selected');
    this.setState({addressProof:event})
  }

  handleOnChange = value => {
    this.setState({ phone: value }, () => {
      console.log(this.state.phone);
    });
  };

  _handleImageChange(e,type) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if(type === 'pan'){
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
    }else{
      reader.onloadend = () => {
        this.setState({
          file1: file,
          imagePreviewUrl1: reader.result
        });
      }
    }


    reader.readAsDataURL(file)
  }
  removeImg = (type) => {
    if(type === 'address'){
      this.setState({imagePreviewUrl1:"",file1:""})
    }else{
      this.setState({imagePreviewUrl:"",file:""})
    }
  }
  render() {
    const {classes}= this.props
    const { handleSelect, handleOnChange, removeImg } = this;
    const { addressProof,imagePreviewUrl, imagePreviewUrl1 } = this.state;
    let imagePreview = null;
    let imagePreview1 = null;
    const options = [];
    const options2 = [
      {value:"Aadhar", label:"Aadhar"},
      {value:"Passport", label:"Passport"},
      {value:"Voter Id", label:"Voter Id"}
    ]
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = ("");
    }
    if (imagePreviewUrl1) {
      imagePreview1 = (<img src={imagePreviewUrl1} />);
    } else {
      imagePreview1 = ("");
    }
    return (
      <div className={styles.root}>
        <div className={classes.navBar}>
          {screen.width>768?
            <Button style={{padding:"6px 40px"}}>
            <img src="../../src/images/hq_logo.png" className={classes.headerLogo}/>
            </Button>
            :
            <Button>
            <img src="../../src/images/hq_mobile.png" className={classes.headerLogo}/>
            </Button>
          }
          <span className={styles.header}>KYC Form</span>
        </div>
        <div className={screen.width>768?styles.form:""}>
          <div className={styles.subHeader}>Please provide following details</div>
          <div className={styles.formContainer}>
            <form>
              <div className={styles.rowFlex}>
                <div className={styles.colFlex}>
                  <input type="text"  name="firstname" placeholder="First Name *"  className={styles.textInput} />
                </div>
                <div className={styles.colFlex}>
                  <input type="text"  name="lastname" placeholder="Last Name *" className={styles.textInput} />
                </div>
              </div>
              <div className={styles.address}>
                  <input type="text"  name="address1" placeholder="Address Line 1 *" className={styles.textInput} />
              </div>
              <div className={styles.address}>
                  <input type="text"  name="address2" placeholder="Address Line 2 *" className={styles.textInput} />
              </div>
              <div className={styles.address}>
                  <input type="text"  name="area" placeholder="Area *" className={styles.textInput} />
              </div>
              <div className={styles.rowFlex}>
                <div className={styles.colFlex}>
                  <input type="text"  name="city" placeholder="City/District *"  className={styles.textInput} />
                </div>
                <div className={styles.colFlex}>
                  <input type="text"  name="post" placeholder="Postal Code *" className={styles.textInput} />
                </div>
              </div>
              <div className={styles.rowFlex}>
                <div className={styles.colFlex}>
                  <Select
                    placeholder="Select state"
                    options={options}
                    onChange={handleSelect}
                  />
                </div>
                <div className={styles.colFlex}>
                  <Select
                    placeholder="Select Country"
                    options={options}
                    onChange={handleSelect}
                  />
                </div>
              </div>
              <div className={styles.address}>
                <ReactPhoneInput
                  inputExtraProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true
                  }}
                  country='in' 
                  value={this.state.phone}
                  onChange={handleOnChange}
                  placeholder={"Enter contact number"}
                />
              </div>
              <div className={styles.colFlex1}>
                <input type="text"  name="bloodGrp" placeholder="Blood Group *"  className={styles.textInput} />
              </div>
              <div className={styles.rowFlex1}>
                <div className={styles.colFlex}>
                  <input type="text"  name="pan" placeholder="Pan card *"  className={styles.textInput} />
                </div>
                <div className={styles.colFlex}>
                  <input 
                    style={{display:"none"}}
                    type="file" id="upload-image"
                    onChange={(e)=>this._handleImageChange(e,'pan')} 
                  />
                  <span>
                    <label htmlFor="upload-image" >      
                      <div className={styles.chooseFileButton}>
                        Upload File
                      </div>
                    </label>
                  </span>
                </div>
              </div>
              <div className={styles.imgPreview}>
                {imagePreview}
                {imagePreview && <span className={styles.removeImg} onClick={()=>removeImg('pan')}>X</span>}
              </div>
              <div className={styles.rowFlex1}>
                <div className={styles.colFlex}>
                  <Select
                    placeholder="Address Proof"
                    value={addressProof}
                    options={options2}
                    onChange={handleSelect}
                  />
                </div>
                <div className={styles.colFlex}>
                  <input 
                    style={{display:"none"}}
                    type="file" id="upload-image1"
                    onChange={(e)=>this._handleImageChange(e,'address')} 
                  />
                  <span>
                    <label htmlFor="upload-image1" >      
                      <div className={styles.chooseFileButton}>
                        Upload File
                      </div>
                    </label>
                  </span>
                </div>
              </div>
              <div className={styles.imgPreview}>
                {imagePreview1}
                {imagePreview1 && <span className={styles.removeImg} onClick={()=>removeImg('address')}>X</span>}
              </div>
              <div className={styles.submitContainer}>
                <Button variant="contained" size="large" style={{color:"white", background:"#1E90FF"}}className={styles.submit}>Submit</Button>
              </div>
            </form>
          </div>
        </div> 
        <div className={styles.footer}>All Rights Reserved. © GoodWorks Spaces Pvt. Ltd.</div>     
      </div>
    );
  }
}
export default (withStyles(design)(Kyc));
