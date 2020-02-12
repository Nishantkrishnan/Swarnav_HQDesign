import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import kycDetailsSelector from './KycDetails.selectors';
import styles from './KycDetails.css';
import ImageUploader from '../../../components/ImageUpload/ImageUpload';
import { fetchUserKtcDetails, uploadKycUserDetails } from './KycDetails.actions';
import { Loader } from '../../../containers/Loader/Loader';
// import { logIn } from './Login.actions';

class KycDetails extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);
    // this.login = this.login.bind(this);
    this.onDropPanCard = this.onDropPanCard.bind(this);
    this.onDropAddressProof = this.onDropAddressProof.bind(this);

    this.state = {
      show: false,
      panCardImg: null,
      addressProofImg: null,
      kycUserDetails: null,
    };

  }

  componentWillMount() {
    this.props.dispatch(fetchUserKtcDetails(this.props.match.params.userId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.kycUserDetails !== null) {
      this.setState({ kycUserDetails: nextProps.kycUserDetails.toJS() });
    }
    //console.log("kycUserDetails:::::::::::::::::", nextProps.kycUserDetails.toJS() )
  }

  onDropPanCard = (panCardImg) => {
    console.log('PAN CARD:::::::::::::::', panCardImg);
    this.setState({ panCardImg });
  }

  onDropAddressProof = (addressProofImg) => {
    this.setState({ addressProofImg });
  }

  getValidationState = () => { }


  uploadKyc = () => {
    this.setState({ kycUserDetails: null });
    const reqBody = new FormData();
    if (this.firstName) {
      reqBody.append('first_name', this.firstName.value);
    }
    if (this.lastName) {
      reqBody.append('last_name', this.lastName.value);
    }
    if (this.addressLine1) {
      reqBody.append('address_line1', this.addressLine1.value);
    }
    if (this.addressLine2) {
      reqBody.append('address_line2', this.addressLine2.value);
    }
    if (this.area) {
      reqBody.append('area', this.area.value);
    }
    if (this.cityDistrict) {
      reqBody.append('city_district', this.cityDistrict.value);
    }
    if (this.country) {
      reqBody.append('country', this.country.value);
    }
    if (this.pinCode) {
      reqBody.append('pin_code', this.pinCode.value);
    }
    if (this.region) {
      reqBody.append('region', this.region.value);
    }
    if (this.emergencyContactNumber) {
      reqBody.append('emergency_contact', this.emergencyContactNumber.value);
    }
    if (this.bloodGroup) {
      reqBody.append('blood_group', this.bloodGroup.value);
    }
    if (this.panCard) {
      reqBody.append('pan_card', this.panCard.value);
    }
    if (this.state.panCardImg && this.state.panCardImg.length > 0) {
      reqBody.append('pan_card_img', this.state.panCardImg[0], this.state.panCardImg[0].name);
    }
    if (this.addressProof) {
      reqBody.append('address_proof', this.addressProof.value);
    }
    if (this.state.addressProofImg && this.state.addressProofImg.length > 0) {
      reqBody.append('address_proof_img', this.state.addressProofImg[0], this.state.addressProofImg[0].name);
    }
    this.props.dispatch(uploadKycUserDetails(this.props.match.params.userId, reqBody));
  }

  render() {
    if (this.state.kycUserDetails === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div style={{margin:"10% 0px"}}>
        <Form
          className={styles.formSignin}
          onSubmit={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.uploadKyc();
            }
          }
        >
          {/* <img className="mb-4" src="../../src/images/GoodWorks_CoWork-logo-sq.png" alt="" width="150" height="150" /> */}
          <h1 className="h3 mb-3 font-weight-normal">Please Provide KYC details</h1>

          <FormGroup
            validationState={this.getValidationState()}
          >
              {
                this.state.kycUserDetails.reupload == false &&
              (
                <div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <ControlLabel className="sr-only">First Name</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="First name"
                  inputRef={(ref) => { this.firstName = ref; }}
                  required=""
                  autoFocus="true"
                  defaultValue={this.state.kycUserDetails.first_name}
                />
                <ControlLabel className="sr-only">Last Name</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="Last Name"
                  inputRef={(ref) => { this.lastName = ref; }}
                  required=""
                  autoFocus="true"
                  defaultValue={this.state.kycUserDetails.last_name}
                />
                </div>
                <ControlLabel className="sr-only">Address1</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyle}
                  placeholder="Address1"
                  inputRef={(ref) => { this.addressLine1 = ref; }}
                  required=""
                  autoFocus="true"
                />

                <ControlLabel className="sr-only">Address2</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyle}
                  placeholder="Address2"
                  inputRef={(ref) => { this.addressLine2 = ref; }}
                  required=""
                  autoFocus="true"
                />

                <ControlLabel className="sr-only">Area</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyle}
                  placeholder="Area"
                  inputRef={(ref) => { this.area = ref; }}
                  required=""
                  autoFocus="true"
                />
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <ControlLabel className="sr-only">City/District</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="City/District"
                  inputRef={(ref) => { this.cityDistrict = ref; }}
                  required=""
                  autoFocus="true"
                />

                <ControlLabel className="sr-only">Pin code</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="Pincode"
                  inputRef={(ref) => { this.pinCode = ref; }}
                  required=""
                  autoFocus="true"
                />
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <ControlLabel className="sr-only">State</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="State"
                  inputRef={(ref) => { this.region = ref; }}
                  required=""
                  autoFocus="true"
                />
                  <ControlLabel className="sr-only">Country</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="Country"
                  inputRef={(ref) => { this.country = ref; }}
                  required=""
                  autoFocus="true"
                />

               </div>
                <ControlLabel className="sr-only">Emergency Contact Number</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyle}
                  placeholder="Emergency Contact Number"
                  inputRef={(ref) => { this.emergencyContactNumber = ref; }}
                  required=""
                  autoFocus="true"
                />

                <ControlLabel className="sr-only">Blood Group</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyle}
                  placeholder="Blood Group"
                  inputRef={(ref) => { this.bloodGroup = ref; }}
                  required=""
                  autoFocus="true"
                />
              </div>)
              }

              {
                this.state.kycUserDetails.reupload == false &&
            (
            <div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <ControlLabel className="sr-only">PAN Card</ControlLabel>
                <FormControl
                  type="text"
                  className={styles.formStyleFlex}
                  placeholder="PAN"
                  inputRef={(ref) => { this.panCard = ref; }}
                  required=""
                  autoFocus="true"
                  value="pancard"
                />
                {/* <ImageUploader
                  onChange={this.onDropPanCard}
                  maxFileSize={10485760}
                  singleImage
                  label="Max image size: 10MB, file type: jpg | jpeg | gif | png | pdf"
                  withPreview
                  buttonText="ADD PAN CARD"
                /> */}
                <input 
                  className={styles.addImageInput}
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.onDropAddressProof}
                />
             </div>
            <div className={styles.addImageIcon}>
              <img src={this.state.kycUserDetails.pan_card} alt="pan" />
            </div>
            </div>)
              }

              {
                this.state.kycUserDetails.reupload == true &&  this.state.kycUserDetails.pancard_reupload == true &&
            (<div><ControlLabel className="sr-only">PAN Card</ControlLabel>
            <FormControl
              type="text"
              className={styles.formStyle}
              placeholder="PAN"
              inputRef={(ref) => { this.panCard = ref; }}
              required=""
              autoFocus="true"
              value="pancard"
            />

            <ImageUploader
              onChange={this.onDropPanCard}
              maxFileSize={10485760}
              singleImage
              label="Max image size: 10MB, file type: jpg | jpeg | gif | png | pdf"
              withPreview
              buttonText="ADD PAN CARD"
            />
        
            <div className={styles.addImageIcon}>
              <img src={this.state.kycUserDetails.pan_card} alt="pan" />
            </div>
            </div>)
              }

              {
                this.state.kycUserDetails.reupload == false && (
          <div>
          <ControlLabel className="sr-only">Address Proof</ControlLabel>
          <FormControl
            componentClass="select"
            className={styles.formStyle}
            placeholder="Address Proof"
            inputRef={(ref) => { this.addressProof = ref; }}
            required=""
            autoFocus="true"
          >
            <option value="aadhaar">Aadhaar</option>
            <option value="passport">Passport</option>
            <option value="voterid">Voter ID</option>
          </FormControl>

          <ImageUploader
            onChange={this.onDropAddressProof}
            maxFileSize={10485760}
            singleImage
            label="Max image size: 10MB, file type: jpg | jpeg | gif | png | pdf"
            withPreview
            buttonText="ADD Address Proof"
          />
  

          <div className={styles.addImageIcon}>
            {this.state.kycUserDetails.aadhar_card && <img src={this.state.kycUserDetails.aadhar_card} alt="aadhar" />}
          </div>
          </div>)
            }

            {
                this.state.kycUserDetails.reupload == true && this.state.kycUserDetails.aadhar_card_reupload == true && (
          <div>
          <ControlLabel className="sr-only">Address Proof</ControlLabel>
          <FormControl
            componentClass="select"
            className={styles.formStyle}
            placeholder="Address Proof"
            inputRef={(ref) => { this.addressProof = ref; }}
            required=""
            autoFocus="true"
          >
            <option value="aadhaar">Aadhaar</option>
            <option value="passport">Passport</option>
            <option value="voterid">Voter ID</option>
          </FormControl>

          <ImageUploader
            onChange={this.onDropAddressProof}
            maxFileSize={10485760}
            singleImage
            label="Max image size: 10MB, file type: jpg | jpeg | gif | png | pdf"
            withPreview
            buttonText="ADD Address Proof"
          />

          <div className={styles.addImageIcon}>
          {this.state.kycUserDetails.aadhar_card && <img src={this.state.kycUserDetails.aadhar_card} alt="aadhar" />}
          </div>
          </div>)
            }

            {/* <Checkbox readOnly>Remember me</Checkbox> */}
            <Button type="submit" className="btn btn-primary">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export const mapStateToProps = state => kycDetailsSelector(state);
export default connect(mapStateToProps)(KycDetails);
