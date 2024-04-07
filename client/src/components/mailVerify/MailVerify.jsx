// MailVerify.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MailVerify.scss";
import { toast } from "react-toastify";

const MailVerify = ({ email }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (event) => {
    const { value } = event.target;
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.get(
        `http://localhost:8800/api/auth/verifymail?email=${inputs.email}&otp=${otp}`
      );
      toast.success("Email verifyed");
      console.log("Verifying OTP:", otp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="email-verification-component">
      <h2 className="title">Email Verification</h2>
      <p className="description">
        Please enter the 4-digit OTP sent to your email address.
      </p>
      <div className="otp-input-container">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            value={otp[index] || ""}
            onChange={handleOtpChange}
          />
        ))}
      </div>
      <button className="verify-button" onClick={handleVerifyOtp}>
        Verify OTP
      </button>
    </div>
  );
};

export default MailVerify;
