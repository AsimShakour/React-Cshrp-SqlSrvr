import React from "react";
import Styles from "./Home.module.css";
import PropTypes from "prop-types";
import format from "date-fns/format";

import logger from "../../../../logger";

const _logger = logger.extend("public");

class EventContainer extends React.Component {
  componentDidMount() {
    _logger(this.props.events);
  }

  mapEvent = event => (
    <div key={event.eventId} className="col-xl-4">
      <div className={Styles.marginTwo}>
        <div className={Styles.darkText}>
          <a className={Styles.stylesAnchor} href={"/public/event/details/" + event.eventId}>
            <h2>{event.eventName}</h2>
            <h4>{format(new Date(event.dateStart), "ddd MMM D YYYY - h:mm a")}</h4>
            <h4>{event.city}</h4>
          </a>
        </div>
      </div>
    </div>
  );

  render() {

    return (
      <div
        style={{
          backgroundImage: "url(/SellersPlaceImg/Bg_Craft.jpg"
        }}
        className="row eventBackground"
      >
        <div className="col-xl-12 ">
          <div className={Styles.alignCenter}>
            <div
              className={Styles.marginFive}
              style={{ backgroundColor: "rgba(204, 204, 204, 0)" }}
            >
              <h1 className={Styles.darkText}>Schedule Of Upcoming Events</h1>
              <p>paragraph here</p>
            </div>
          </div>
        </div>
        {this.props.events && this.props.events.map(this.mapEvent)}
        <div className="col-xl-12 text-center" >
          <h4 >
            <a href="/events" className={Styles.upcomingEvent}>
              Upcoming Events{" "}
            </a>
          </h4>
        </div>
      </div>
    );
  }
}

EventContainer.propTypes = {
  events: PropTypes.array
};

export default EventContainer;
