import React from "react";
import Styles from "./Home.module.css";
import { StyleRoot } from 'radium';

//Notes:  Radium css is being using on this page. If radium css is used on element it may require a unique key of its own. - Ask Asim if questions.

const stylesasimFooterWhite = {
  color: "rgb(101, 101, 101)",
  ':hover': {
    color: "deeppink",
    borderColor: "deeppink",
    textDecoration: "none"
  },
  ':active': {
    color: "deeppink",
    borderColor: "deeppink",
    textDecoration: "none"
  }, ':focus': {
    color: "deeppink",
    borderColor: "deeppink",
    textDecoration: "none"
  }
};

function Footer() {
  return (
    <StyleRoot>
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
                <a
                  style={{ color: "deeppink" }} title="Address"
                  href="https://www.google.com/maps/place/400+Corporate+Pointe+%23300,+Culver+City,+CA+90230"
                >
                  {" "}
                  400 Corporate Pointe #300<br />Culver City, CA 90230
                  </a><br />
                <a title="Phone Number" style={{ color: "deeppink" }} href="tel:+1-562-307-7589">{" "}(562) 307-7589{" "}</a>
              </div>
              <a title="Contact Us" href="/contactus" style={stylesasimFooterWhite}> <i className="fa-2x mr-2 far fa-envelope" /></a>
              <div className="fa-2x mr-2 fab fa-instagram" />
              <div className="fa-2x mr-2 fab fa-twitter" />
              <div className="fa-2x mr-2 fab fa-facebook-f" />
            </div>
          </div>
        </div>
      </div>
    </StyleRoot>
  );
}

export default React.memo(Footer);
