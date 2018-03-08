import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import ProductTile from "components/Category/productTile/ProductTile";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import { getCount } from "redux/modules/cart/getCount";
import { getSearch } from "redux/modules/search";
import * as actionsProduct from "redux/modules/product";
import styles from "./searchList.css";

class SearchList extends Component {
  componentDidMount() {
    this.props.getSearch(this.props.match.params.searchValue);
    document.title = `«Белый кот» — Поиск…`;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.searchValue !== prevProps.match.params.searchValue
    ) {
      this.props.getSearch(this.props.match.params.searchValue);
    }
  }

  render() {
    const {
      isFetching,
      entity,
      title,
      error,
      status
    } = this.props.searchProducts;

    if (isFetching) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    if (status === 404) {
      return (
        <div className={styles.searchListError}>
          <p className={styles.error}>{error}</p>
        </div>
      );
    }

    const productsBlock = entity.map(product => (
      <ProductTile
        product={product}
        key={product.id}
        addProduct={this.props.actionsProduct.addProduct}
        getCount={this.props.getCount}
      />
    ));

    return (
      <div className="col-xl-9 col-lg-9 col-md-9">
        <div className={styles.searchList}>
          <h2>
            По запросу "{decodeURIComponent(title)}" получено
            <span className={styles.counterProduct}>
              {" "}
              {entity.length} товаров:
            </span>{" "}
          </h2>
          {productsBlock}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchProducts: state.searchProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsProduct: bindActionCreators(actionsProduct, dispatch),
    getCount: bindActionCreators(getCount, dispatch),
    getSearch: bindActionCreators(getSearch, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchList)
);
