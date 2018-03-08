import React, { Component } from "react";
import Delivery from "components/CartPage/delivery/Delivery";
import DeliveryMobile from "components/CartPage/delivery/DeliveryMobile";

class DeliveryPage extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render() {
    document.title = "«Белый кот» — Доставка";
    return (
      <div>
        <div className="hiddenMobile">
          <Delivery />
        </div>
        <div className="hiddenDesktop">
          <DeliveryMobile />
        </div>
      </div>
    );
  }
}

export default DeliveryPage;
