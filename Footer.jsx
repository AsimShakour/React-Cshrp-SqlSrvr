import React from "react";
import Styles from "./Home.module.css";

function Footer() {
  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <div className={Styles.footer}>
            <div className={Styles.darkText}>
              <div className={Styles.logo}>
                <img
                  src="https://sabio-s3.s3.us-west-2.amazonaws.com/sellersplace/0640bbbe-9e54-4b2b-8f67-33a2f662745f_Sellers_Place_Logo_200x91.png"
                  alt="Seller's Place"
                />
              </div>
              <p style={{ fontSize: "195%" }}>
                <a style={{ color: "deeppink" }} href="/contactus">
                  {" "}
                  <i className="far fa-envelope"></i> {" "} {" "}Contact Us
                </a>
              </p>
              <a
                style={{ color: "deeppink" }}
                href="https://www.google.com/maps/place/400+Corporate+Pointe+%23300,+Culver+City,+CA+90230"
              >
                {" "}
                400 Corporate Pointe #300<br />Culver City, CA 90230
                  </a><br />
              <a style={{ color: "deeppink" }} href="tel:+1-562-307-7589">{" "}(562) 307-7589{" "}</a>
            </div>
            <div className="fa-2x mr-2 fab fa-instagram" />
            <div className="fa-2x mr-2 fab fa-twitter" />
            <div className="fa-2x mr-2 fab fa-facebook-f" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Footer);
