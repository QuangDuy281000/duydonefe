import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import "../../Style/User/UpdateProfile.css";
import { useHistory } from "react-router-dom";
import PublicService from "../../services/PublicService";
function UpdateProfile(props) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [identification, setIdentification] = useState("");
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false)

  const history = useHistory();

  const [validationMsg, setValidationMsg] = useState({});


  const onChangeFullname = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const onChangeBirthday = (e) => {
    const value = e.target.value;
    setBirthday(value);
  };
  const onChangeGender = (e) => {
    const value = e.target.value;
    setGender(value);
  };
  const onChangePhoneNumber = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const onChangeIdentification = (e) => {
    const value = e.target.value;
    setIdentification(value);
  };
  const onChangeHealthInsuranceNumber = (e) => {
    const value = e.target.value;
    setHealthInsuranceNumber(value);
  };
  const onChangeOccupation = (e) => {
    const value = e.target.value;
    setOccupation(value);
  };
  const onChangeEthnic = (e) => {
    const value = e.target.value;
    setEthnic(value);
  };
  const onChangeAddress = (e) => {
    const value = e.target.value;
    setAddress(value);
  };


  const validAll = () => {
    const msg = {};
    if (isEmpty(email)) {
      msg.email = "Email kh??ng ???????c ????? tr???ng";
    }else if(!isEmail(email)){
      msg.email = "Email kh??ng h???p l???";
    }
    if(isEmpty(occupation)){
      msg.occupation="Ngh??? nghi???p kh??ng ???????c ????? tr???ng"
    }
    if(isEmpty(address)){
      msg.address="?????a ch??? kh??ng ???????c ????? tr???ng"
    }
    if(isEmpty(phoneNumber)){
      msg.phoneNumber="S??? ??i???n tho???i kh??ng ???????c ????? tr???ng"
    }
    if(isEmpty(ethnic)){
      msg.ethnic="D??n t???c kh??ng ???????c ????? tr???ng"
    }
    
    // else if (identification.length < 12 || identification.length > 12) {
    //   msg.identification = "CCCD kh??ng h???p l???";
    // }

    if (isEmpty(healthInsuranceNumber)) {
      msg.healthInsuranceNumber = "S??? th??? BHYT kh??ng ???????c ????? tr???ng";
    }
    //else if (
    //   healthInsuranceNumber.length < 10 ||
    //   healthInsuranceNumber.length > 10
    // ) {
    //   msg.healthInsuranceNumber = "S??? th??? BHYT kh??ng h???p l???";
    // }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };



  const onUpdateProfile = () => {
    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const user = {
        name,
        birthday,
        gender,
        phoneNumber,
        email,
        identification,
        healthInsuranceNumber,
        occupation,
        ethnic,
        address,
      };

      PublicService
        .updateProfile(user)
        .then((response) => {
          setMessage(response.data);
          setSuccessful(true)
          console.log(message);
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            setMessage(error.response.data);
            setSuccessful(false)
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  };

  const onBack =()=>{
    history.push("/profile")
  }




  useEffect(() => {
    PublicService.profile()
      .then((response) => {
        if (response.data) {
          setName(response.data.customerDTO.name);
          setBirthday(response.data.customerDTO.birthday);
          setGender(response.data.customerDTO.gender);
          setPhoneNumber(response.data.customerDTO.phoneNumber);
          setEmail(response.data.customerDTO.email);
          setIdentification(response.data.customerDTO.identification);
          setHealthInsuranceNumber(
            response.data.customerDTO.healthInsuranceNumber
          );
          setOccupation(response.data.customerDTO.occupation);
          setEthnic(response.data.customerDTO.ethnic);
          setAddress(response.data.customerDTO.address);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <>
    <h5 className="well font-weight-bold text-primary">
        CH???NH S???A H??? S?? C?? NH??N
      </h5>
      {message && (
              <div className="form-group">
                <p  className={ successful ? "alert alert-success" : "alert alert-danger" }>{message}</p>
              </div>
            )}

      <div className="container rounded bg-white ">
        <div className="row">
          <div className="col-md-2 "></div>

          <div className="col-md-8 ">
            <div >
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">H??? t??n <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                   
                    value={name}
                    onChange={onChangeFullname}
                    readOnly
                  />
                  
                </div>
              </div>
              <div className="row mt-3">
                <br/>
                <div className="col-md-12">
                <label className="label">CCCD <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={identification}
                    onChange={onChangeIdentification}
                    readOnly
                  />
                </div>
                <br/>
                </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">Ng??y sinh <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                   
                    value={birthday}
                    readOnly
                    onChange={onChangeBirthday}
                  />
                  
                </div>
                <div className="col-md-6">
                  <label className="label">Gi???i t??nh <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={gender===1?"Nam":"N???"}
                    readOnly
                    onChange={onChangeGender}
                  />
                </div>
              </div>
              
              <div className="row mt-3">
                <br/>
                <div className="col-md-12">
                  <label className="label">Email <span className="text-danger">(*)</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.email}
                    </p>
                </div>
                <br/>
                <div className="col-md-12">
                  <label className="label">S??? ??i???n tho???i <span className="text-danger">(*)</span></label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="s??? ??i???n tho???i"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.phoneNumber}
                    </p>
                </div>
                <br/>
                <div className="col-md-12">
                  <label className="label">S??? BHYT <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="BHYT"
                    value={healthInsuranceNumber}
                    onChange={onChangeHealthInsuranceNumber}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.healthInsuranceNumber}
                    </p>
                </div>
               
              </div>
             
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">Ngh??? nghi???p <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ngh??? nghi???p"
                    value={occupation}
                    onChange={onChangeOccupation}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.occupation}
                    </p>
                </div>
                <div className="col-md-6">
                  <label className="label">D??n t???c <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={ethnic}
                    placeHolder="D??n t???c"
                    onChange={onChangeEthnic}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.ethnic}
                    </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="label">?????a ch??? hi???n t???i <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="?????a ch???"
                    value={address}
                    onChange={onChangeAddress}
                    
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.address}
                    </p>
                </div>
              </div>
              <div className="mt-5 text-center">
              <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={onBack}
                >
                 Quay lai
                </button>
                <button
                  className="btn btn btn-success  ml-3"
                  type="button"
                  onClick={onUpdateProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateProfile;