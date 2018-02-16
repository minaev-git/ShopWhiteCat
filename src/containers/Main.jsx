import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./category/Category";
import Product from "./product/Product";
import CartPage from "./cartPage/CartPage";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/category/:name/:id" component={CategoryPage} />
    <Route path="/product/:name/:id" component={Product} />
    <Route path="/cart" component={CartPage} />
  </Switch>
);

export default Main;
/*    const breadCrumbLinksCategory = isFetchingСategoryLink
? null
: [
    {
      name: categoryLink.name,
      link: `/category/${transliterate(categoryLink.name)}/${categoryLink.id}`
    }
  ];

const breadCrumbLinksSubCategory = isFetchingSubСategoryLink
? null
: [
    {
      name: subCategoryLink.category.name,
      link: `/category/${transliterate(subCategoryLink.category.name)}/${
        subCategoryLink.category.id
      }`
    },
    {
      name: subCategoryLink.name,
      link: `/subcategory/${transliterate(subCategoryLink.name)}/${
        subCategoryLink.id
      }`
    }
  ];*/