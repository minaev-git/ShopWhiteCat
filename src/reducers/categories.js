import {
  REQUEST_CATEGORIES,
  SUCCESS_CATEGORIES,
  FAILURE_CATEGORIES,
  REQUEST_CATEGORY,
  SUCCESS_CATEGORY,
  FAILURE_CATEGORY,
  REQUEST_CATEGORY_LINK,
  SUCCESS_CATEGORY_LINK,
  FAILURE_CATEGORY_LINK
} from "../constants/menu";

const inititalState = {
  categoriesNav: [],
  category: {},
  categoryLink: {},
  loadingCategories: false,
  loadingCategory: false,
  loadingCategoryLink: false,
  errorCategories: "",
  errorCategory: "",
  errorCategoryLink: "",
};

export default function(state = inititalState, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return { ...state, loadingCategories: action.loading };
    case SUCCESS_CATEGORIES:
      return {
        ...state,
        categoriesNav: action.payload,
        loadingCategories: action.loading
      };
    case FAILURE_CATEGORIES:
      return {
        ...state,
        errorCategories: action.payload,
        loadingCategories: action.loading
      };
    case REQUEST_CATEGORY:
      return { ...state, loadingCategory: action.loading };
    case SUCCESS_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loadingCategory: action.loading
      };
    case FAILURE_CATEGORY:
      return {
        ...state,
        errorCategory: action.payload,
        loadingCategory: action.loading
      };
    case REQUEST_CATEGORY_LINK: 
      return {
        ...state,
        loadingCategoryLink: action.loading
      }
    case SUCCESS_CATEGORY_LINK:
      return {
        ...state,
        categoryLink: action.payload,
        loadingCategoryLink: action.loading
      }
    case FAILURE_CATEGORY_LINK:
      return {
        ...state,
        errorCategoryLink: action.payload,
        loadingCategoryLink: action.loading
      }
    default:
      return state;
  }
}
