import React from "react";
import Styles from "./Home.module.css";
import "./Home.module.css";
import { StyleRoot } from 'radium';
import PropTypes from "prop-types";

//Notes: items below have hard coded anchor tags which reroute for the sections vendors, promoters, venues. Radium css is being using on this page. If radium css is used on element it may require a unique of its own. - Ask Asim if questions.

const stylesAnchor = {
  ':active, :focus, :hover': {
    color: "deeppink",
    borderColor: "deeppink",
  }
};

class ThreeImgCol extends React.Component {
  render() {
    return (
      <StyleRoot>
        <div className="row">
          <div className="col-xl-4 tallDiv-noMarg"> <a key="craftVendors" style={stylesAnchor} href="/vendors">

            <div
              className={Styles.backgroundFour}
              style={{
                backgroundImage: this.props.images[0].image
              }}>
              <div>
                <div className={Styles.center}>
                  <h1
                    className={Styles.whiteText}
                    data-aos="fade-down"
                    data-aos-offset="120"
                    data-aos-duration="500"
                  >
                    <em className="fa-2x mr-2 fas fa-cut"> </em>
                    <br />
                    Craft Vendors
                </h1>
                  <p className={Styles.whiteText}>
                    paragraph asdfghjklwetyuixcvbnm,
                </p>
                  <div
                    data-aos="fade-up"
                    data-aos-offset="120"
                    data-aos-duration="500"
                  />
                </div>
              </div>
            </div>
          </a>
          </div>
          <div className="col-xl-4 tallDiv-noMarg"><a key="eventPromoters" style={stylesAnchor} href="/promoters">
            <div
              className={Styles.backgroundFour}
              style={{
                backgroundImage: this.props.images[1].image
              }}
            >
              <div>
                <div className={Styles.center}>
                  <h1
                    className={Styles.whiteText}
                    data-aos="fade-down"
                    data-aos-offset="120"
                    data-aos-duration="500"
                  >
                    <em className="fa-2x mr-2 fas fa-bullhorn"> </em>
                    <br />
                    Event Promoters{" "}
                  </h1>
                  <p className={Styles.whiteText}>
                    paragraph asdfghjklwetyuixcvbnm,
                </p>
                  <div
                    data-aos="fade-up"
                    data-aos-offset="120"
                    data-aos-duration="500"
                  />
                </div>
              </div>
            </div>
          </a>
          </div>

          <div className="col-xl-4 tallDiv-noMarg"><a key="venueOwners" style={stylesAnchor} href="/venues">
            <div
              className={Styles.backgroundFour}
              style={{
                backgroundImage: this.props.images[2].image
              }}
            >
              <div>
                <div className={Styles.center}>
                  <h1
                    className={Styles.whiteText}
                    data-aos="fade-down"
                    data-aos-offset="120"
                    data-aos-duration="500"
                  >
                    <em className="fa-2x icon-location-pin mr-2"> </em>
                    <br />
                    Venue Owners
                </h1>
                  <p className={Styles.whiteText}>
                    paragraph asdfghjklwetyuixcvbnm,
                </p>
                  <div
                    data-aos="fade-up"
                    data-aos-offset="120"
                    data-aos-duration="500"
                  />
                </div>
              </div>
            </div>
          </a>
          </div>
        </div>
      </StyleRoot>
    );
  }
}
ThreeImgCol.propTypes = {
  images: PropTypes.array.isRequired
};
export default ThreeImgCol;
