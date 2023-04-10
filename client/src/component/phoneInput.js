import React, { useState } from "react";
import styles from "./styles/style.module.css";
import axios from "axios";
import Modal from "react-overlays/Modal";

function PhoneInput(props) {
  const { value, handleChange, hashHandleChange } = props;
  const [showModal, setShowModal] = useState(false);
  // const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  const handleClose = () => setShowModal(false);

  const handleSuccess = () => {
    console.log("success");
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChanges = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const Continue = (e) => {
    axios
      .post("http://Localhost:4000/sendOTP", {
        phone: `${value.phone}`,
      })
      .then(function (res) {
        console.log(res.data.otp);
        const hash = res.data.hash;
        hashHandleChange(hash);
      });

    // e.preventDefault();
    // props.nextStep();
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email) {
      alert("posted");
      axios.post("http://Localhost:4000/register", user).then(
        (res) => console.log(res)
        // alert(res.data.message);
        // history.push("/login");
      );
    } else {
      alert("invlid input");
    }
  };

  axios.defaults.withCredentials = true;

  const [error, setError] = useState({
    error: "",
    success: "",
  });
  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const confirmOtp = () => {
    axios
      .post("http://Localhost:4000/verifyOTP", {
        phone: `${value.phone}`,
        hash: `${value.hash}`,
        otp: `${value.otp}`,
        withCredentials: true,
      })
      .then(function (res) {
        console.log(res.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response.data);
        setError({ ...error, error: error.response.data.msg });
      });
  };

  const callBoth = () => {
    if (register() && confirmOtp() == true) {
      alert("Both fiels are correct");
      // confirmOtp();
      // register();
    } else {
      alert("Both fiels are not correct");
    }
  };
  return (
    <>
      <div
        style={{
          width: "400px",
          height: "350px",
          background: " #fff",
          border: "1px solid #dddfe2",
          "border-radius": "8px",
          padding: "10px",
          "align-items": "center",
          "text-align": "center",
          margin: "auto",
          marginTop: "17%",
        }}
        className="register"
      >
        {/* {console.log("USer", user)} */}
        <h1>Register</h1>
        <input
          style={{
            "border-radius": "8px",
            border: "2px solid #dddfe2",
            outline: "none",
            color: "#1d2129",
            margin: "15px 0",
            padding: "0.5rem 0.75rem",
            width: "92%",
            "font-size": "1rem",
          }}
          type="text"
          name="name"
          value={user.name}
          placeholder="Your Name"
          onChange={handleChanges}
        ></input>
        <input
          style={{
            "border-radius": "8px",
            border: "2px solid #dddfe2",
            outline: "none",
            color: "#1d2129",
            margin: "15px 0",
            padding: "0.5rem 0.75rem",
            width: "92%",
            "font-size": "1rem",
          }}
          type="text"
          name="email"
          value={user.email}
          placeholder="Your Email"
          onChange={handleChanges}
        ></input>

        <input
          style={{
            "border-radius": "8px",
            border: "2px solid #dddfe2",
            outline: "none",
            color: "#1d2129",
            margin: "15px 0",
            padding: "0.5rem 0.75rem",
            width: "92%",
            "font-size": "1rem",
          }}
          type="tel"
          value={value.phone}
          onChange={handleChange("phone")}
          placeholder="Enter the Phone No."
          className={styles.input}
        />

        <button
          style={{
            background: "#1877f2",
            border: "1px solid #1877f2",
            color: "#fff",
            "font-size": "1.25rem",
            padding: " 0.5rem",
            margin: "15px 0",
            "border-radius": " 8px",
            outline: "none",
            cursor: "pointer",
          }}
          // onClick={Continue}
          onClick={() => {
            setShowModal(true);
            Continue();
          }}
        >
          Submit
        </button>
      </div>

      <Modal
        style={{
          position: "absolute",
          border: "2px solid #000",
          backgroundColor: "gray",
          boxShadow: "2px solid black",
          height: "100%",
          width: "100%",
          margin: "auto",
          backgroundColor: "white",
        }}
        className="modal"
        show={showModal}
        // onHide={handleClose}
        // renderBackdrop={renderBackdrop}
      >
        <div
          style={{
            width: "400px",
            height: "200px",
            background: " #fff",
            border: "1px solid #dddfe2",
            "border-radius": "8px",
            padding: "10px",
            "align-items": "center",
            "text-align": "center",
            margin: "auto",
            marginTop: "19%",
          }}
        >
          <h2
            style={{
              cursor: "pointer",
              float: "right",
            }}
            onClick={handleClose}
          >
            X
          </h2>
          <input
            style={{
              "border-radius": "8px",
              border: "2px solid #dddfe2",
              outline: "none",
              color: "#1d2129",
              margin: "15px 0",
              padding: "0.5rem 0.75rem",
              width: "92%",
              "font-size": "1rem",
            }}
            type="tel"
            value={value.otp}
            onChange={handleChange("otp")}
            placeholder="Enter the 6 digits OTP"
            className={styles.input}
          />
          <button
            style={{
              background: "#1877f2",
              border: "1px solid #1877f2",
              color: "#fff",
              "font-size": "1.25rem",
              padding: " 0.5rem",
              margin: "0.5rem 0",
              "border-radius": " 8px",
              outline: "none",
              cursor: "pointer",
            }}
            // onClick={register}
            className="button"
            onClick={() => {
              {
                if (confirmOtp() && register() == true) {
                  alert("Both Fields are correct");
                }
              }
            }}
          >
            Register
          </button>
        </div>
      </Modal>

      {/* <button onClick={back} className={styles.back}>
            Back
          </button>
          <button onClick={confirmOtp} className={styles.submit}>
            Confirm OTP
          </button> */}
    </>
  );
}

export default PhoneInput;

// button style register wala
// style={{
//   background: "#1877f2",
//   border: "1px solid #1877f2",
//   color: "#fff",
//   "font-size": "1.25rem",
//   padding: " 0.5rem",
//   margin: "0.5rem 0",
//   "border-radius": " 8px",
//   outline: "none",
//   cursor: "pointer",
// }}

// input style
// style={{
//   "border-radius": "8px",
//   border: "2px solid #dddfe2",
//   outline: "none",
//   color: "#1d2129",
//   margin: "0.5rem 0",
//   padding: "0.5rem 0.75rem",
//   width: "92%",
//   "font-size": "1rem",
// }}
