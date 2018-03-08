// @flow
import React from "react";
import type { Product } from "type/product";
import PhotoSlider from "components/Elements/DataDisplay/photoSlider/PhotoSlider";
import MobileDropDown from "components/Elements/DataDisplay/mobileDropDown/MobileDropDown";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionsProduct from "redux/modules/product";
import { getCount } from "redux/modules/cart/getCount";
import styles from "./productCard.css";
import ProductPhoto from "../productPhoto/ProductPhoto";
import ProductForm from "../productForm/ProductForm";
import ProductDescription from "../productDescription/ProductDescription";

type Props = {
  product: Product
};

const ProductCard = (props: Props) => (
  <div className={styles.productCard}>
    <h2 className={styles.title}>{props.product.name}</h2>
    <div className="hiddenMobile">
      <ProductPhoto photos={props.product.images} />
    </div>
    <div className={`hiddenDesktop ${styles.mobileSlider}`}>
      <PhotoSlider photos={props.product.images} />
    </div>
    <ProductForm
      product={props.product}
      addProduct={props.actionsProduct.addProduct}
      getCount={props.getCount}
    />
    <div className={`hiddenDesktop ${styles.mobileDropDown}`}>
      <MobileDropDown
        title="Характеристики"
        text={<p className={styles.discription}>{props.product.seo_description}</p>}
      />
    </div>
    <ProductDescription product={props.product} />
  </div>
);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actionsProduct: bindActionCreators(actionsProduct, dispatch),
    getCount: bindActionCreators(getCount, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
