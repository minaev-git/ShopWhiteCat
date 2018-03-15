import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Delivery from "components/CartPage/delivery/Delivery";
import DeliveryMobile from "components/CartPage/delivery/DeliveryMobile";

class DeliveryPage extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>«Белый кот» — Доставка</title>
          <meta
            name="description"
            content="Информация о регионах доставки интернет-магазина «Белый кот»"
          />
        </Helmet>
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
