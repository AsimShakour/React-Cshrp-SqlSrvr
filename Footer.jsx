import React from "react";
import Styles from "./Home.module.css";

function Footer() {
  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <div className={Styles.footer}>
            <div className={Styles.darkText}>
              {" "}
              <h1> Connect With Sellers Place </h1>
              <p style={{ fontSize: "120%" }}>
                <address>
                  <a style={{ color: "deeppink" }} href="https://www.google.com/maps/place/400+Corporate+Pointe+%23300,+Culver+City,+CA+90230"> 400 Corporate Pointe #300 <p> Culver City, CA 90230 </p> </a></address>
              </p>
              <p style={{ fontSize: "120%" }}>
                <a style={{ color: "deeppink" }} href="tel:+1-562-307-7589"> 562-307-7589 </a>
              </p>
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
