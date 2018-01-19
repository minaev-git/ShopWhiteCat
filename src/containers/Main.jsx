import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./category/Category";
import SubCategoryPage from "./subCategory/SubCategory"
import Product from "./product/Product";
import CartPage from "./cartPage/CartPage";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path="/category/:name/:id"
      render={props => <CategoryPage {...props} type="category" />}
    />
    <Route
      path="/subcategory/:name/:id"
      render={props => <SubCategoryPage {...props} type="childCategory" />}
    />
    <Route path="/product/:name/:id" component={Product} />
    <Route path="/cart" component={CartPage} />
  </Switch>
);

export default Main;
