import React from "react";
import ContentWrapper from "../layout/ContentWrapper";
import PromoterForm from "./PromoterForm";
import * as promotersService from "../../services/promotersService";
import * as businessesServices from "../../services/businessesService";
import PropTypes from "prop-types";
import SweetAlert from "sweetalert";
import logger from "../../logger";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectBusiness from "../questionnaire/BusinessTypeMap";

// Note: Asim made  this a  class from func component. So it gives toaster if user doesnt have access to this thru lifecycle method and for payload needing biz id.
//This is seprate from CretePromoter comp becuase this is not part of the registration UX that a brand new user goes through.  This AddProm comp is for adding a promo in logins after intial when user has realized they want to add things.  

const _logger = logger.extend("AddPromoter");
class AddPromoter extends React.PureComponent {
  state = {
    businesses: {},
    selectedBusiness: 0,
    if1Business: false
  };

  componentDidMount() {
    _logger("Comp AddProm mounted");
    this.getBuinessesInfo();
  }

  getBuinessesInfo = () => {
    businessesServices
      .getForCurrentUser()
      .then(this.onSuccessGetBiz)
      .catch(this.onErrorGetBiz);
  };

  onSuccessGetBiz = data => {
    if (data.items.length === 1) {
      let businesses = data.items;
      let selectedBusiness = data.items[0].id;
      let businessesLog = businesses.map(this.mapBusinessLog);
      _logger(businessesLog.join("\n"));
      let businessesComponent = businesses.map(this.map1Business);
      let if1Business = true;
      this.setState({
        businesses,
        businessesComponent,
        selectedBusiness,
        if1Business
      });
    } else if (data.items.length) {
      let businesses = data.items;
      let businessesLog = businesses.map(this.mapBusinessLog);
      _logger(businessesLog.join("\n"));
      let businessesComponent = businesses.map(this.mapBusinesses);
      this.setState({ businesses, businessesComponent });
    } else {
      toast.error(
        "No businesses associated with user. Please register a business in the Businesses Section."
      );
    }
  };

  mapBusinessLog = business => {
    return (
      "The business id is: " +
      business.id +
      " and the name is: " +
      business.name +
      "\n"
    );
  };
  mapBusinesses = business => {
    return (
      <SelectBusiness
        key={business.id}
        if1Business={false}
        businessType={business}
        getBusinessType={this.selectBusinessValue}
      />
    );
  };

  map1Business = business => {
    return (
      <div className="c-radio" key={business.id + business.name + "this is c radio"}>
        <label>
          <input
            checked
            key={business.id + business.name}
            type="radio"
            name="businessType"
            value={business.id}
            onChange={this.selectBusinessValue}
          />
          <span className="fa fa-circle" /> {business.name}
        </label>
      </div>
    );
  };

  onErrorGetBiz(data) {
    _logger(data, "Error getting data about business associated with user id");
    SweetAlert(
      "Something went wrong",
      "Error occured creating promoter profile. If no business has been added, please add a business.",
      "error"
    );
  }

  addPromoter = payload => {
    if (payload.businessId) {
      _logger("when promo id then promoter payload is: ", payload);
      promotersService
        .createPromoter(payload)
        .then(this.onSuccessAddPromo)
        .catch(this.onErrorAddPromo);
    } else {
      toast.error(
        "Sorry, please select a business associated with this promoter. "
      );
    }
  };
  onSuccessAddPromo = () => {
    SweetAlert("All done!", "Welcome to Seller's Place!", "success");
    this.props.history.push("/admin/dashboard");
  };
  onErrorAddPromo = () => {
    SweetAlert(
      "Something went wrong",
      "Error occured creating promoter profile",
      "error"
    );
  };

  selectBusinessValue = event => {
    let selectedBusiness = 0;
    selectedBusiness = Number(event.target.value);
    _logger(selectedBusiness);
    this.setState({ selectedBusiness });
  };

  render() {
    return (
      <>
        <ContentWrapper>
          <div className="content-heading">Add a Promoter Form</div>
          <div className="card mb-3 border-primary">
            <div className="card-header text-white bg-primary">
              <h2>Add a Promoter</h2>
            </div>
            <PromoterForm
              isolatedNewPromoForm={true}
              businessesComponent={this.state.businessesComponent}
              id={this.state.selectedBusiness}
              onSubmitForm={this.addPromoter}
              if1Business={this.state.if1Business}
              formHeader={"Add"}
            />
          </div>
        </ContentWrapper>
      </>
    );
  }
}

AddPromoter.propTypes = {
  businessId: PropTypes.number,
  history: PropTypes.object
};
export default AddPromoter;
