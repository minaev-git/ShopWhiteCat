import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./category/Category";
import Product from "./product/Product";
import CartPage from "./cartPage/CartPage";
import GiftPage from "./giftPage/GiftPage";
import DeliveryPage from "./DeliveryPage";
import Contacts from "./contacts/Contacts"
import styles from "./styles/Main.css"

const Main = () => (
  <div className={styles.mainPage}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/product/:name/:id" component={Product} />
      <Route path="/category/:name/:id" component={CategoryPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/gift" component={GiftPage} />
      <Route path="/delivery" component={DeliveryPage} />
      <Route path="/search/:searchValue" component={CategoryPage} />
      <Route path="/contacts" component={Contacts} />
    </Switch>
  </div>
);

export default Main;
