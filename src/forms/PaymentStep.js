import React from "react";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

//import qrCode1 from "./AnanyaQR.png";
//import qrCode2 from "./MansiQR.png";

export default function PaymentStep({
  isVasavi,
  transactionId,
  setTransactionId,
  driveLink,
  setDriveLink,
  recipient,
  setRecipient,
  utrNumber,
  setUtrNumber,
  upiData,
  setUpiData,
}) {
 
  
  
  //const upiID = isVasavi ? "saiananyat-1@okhdfcbank" : "8309502651@ibl";
  const paymentLink = isVasavi
    ? "https://example.com/pay/1000"
    : "https://example.com/pay/1400";

  //const QR = isVasavi ? qrCode1 : qrCode2;
  const no = isVasavi ? "8978966277" : "8309502651";
  useEffect(() => {
    fetch("https://mun-dat.onrender.com/upi/available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUpiData(data.upiData);  // Set UPI ID from the response
        setRecipient(data.recipient);  // Set recipient name from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("UPI ID copied to clipboard!");
    });
  };

  return (
    <div>
      <h2>
        {isVasavi
          ? "Pay the registration fee of ₹1300"
          : "Pay the registration fee of ₹1700"}
      </h2>
      <div className="hd">
        <label className="btn">
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <h3>Payment</h3>
          </a>
        </label>
        <input
          type="text"
          id="transaction-id"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
        <input
          type="text"
          id="drive-link"
          placeholder="Payment Screenshot (Drive Link)"
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
        />
        <p
          style={{
            marginTop: "5px",
            fontSize: "0.9rem",
            color: "#fff",
          }}
        >
          Ensure access is not restricted
        </p>
      </div>

      {/* Dropdown for recipient */}
      {/* <div style={{ marginTop: "20px" }}>
        <label htmlFor="recipient" style={{ color: "#fff", fontSize: "1rem" }}>
          To Whom You Are Paying:
        </label>
        <select
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "1rem",
            borderRadius: "4px",
            marginLeft: "10px",
          }}
        >
          <option value="Ananya">Ananya</option>
          <option value="Mansi">Mansi</option>
          <option value="Other">Other</option>
        </select>
      </div> */}

      {/* UTR Number Input */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          id="utr-number"
          placeholder="Enter UTR Number"
          value={utrNumber}
          onChange={(e) => setUtrNumber(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "1rem",
            borderRadius: "4px",
            width: "100%",
            marginBottom: "10px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              padding: "8px",
              borderRadius: "8px",
              marginRight: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {upiData}
          </p>
          <FaRegCopy
            onClick={() => copyToClipboard(upiData)}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "#fff",
            }}
          />
        </div>
        <h5
          style={{
            marginTop: "10px",
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#fff",
          }}
        >
          For payment issues, contact: {no}
        </h5>
      </div>

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <div
          style={{
            padding: "10px",
            borderRadius: "15px",
            overflow: "hidden",
            border: "1px solid #ccc",
          }}
        >
          <img
            src={QR}
            alt="QR Code"
            style={{
              height: "auto",
              maxWidth: "100%",
              borderRadius: "10px",
            }}
          />
        </div>
      </div> */}
    </div>
  );
}
