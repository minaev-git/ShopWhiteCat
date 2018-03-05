import React from "react";
import Delivery from "components/CartPage/delivery/Delivery"
import DeliveryMobile from "components/CartPage/delivery/DeliveryMobile";

const DeliveryPage = () => (
  <div>
    <div className="hiddenMobile">
      <Delivery />
    </div>
    <div className="hiddenDesktop">
      <DeliveryMobile />
    </div>
  </div>
)

export default DeliveryPage