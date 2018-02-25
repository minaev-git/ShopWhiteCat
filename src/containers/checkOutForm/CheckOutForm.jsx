import React from "react";
import { withFormik } from "formik";
import Yup from "yup";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputMask from "react-input-mask";
import styles from "./checkOutForm.css";

const formikEnchancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Нужно указать имя"),
    email: Yup.string()
      .email(
        "E-mail должен состоять из имени почтового ящика разделенного @ и домена, например IvanIvanov@yandex.ru"
      )
      .required("Нужно указать E-mail"),
    phone: Yup.string().matches(
      /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,
      "Нужно ввести номер телефона"
    ),
    address: Yup.string(),
    metro: Yup.string(),
    additionalInfo: Yup.string()
  }),

  mapPropsToValues: ({ user }) => ({
    ...user
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    console.log(payload.address);
    setSubmitting(false);
  },
  displayName: "checkOutForm"
});

const InputFeedback = ({ error }) => (error ? <div>{error}</div> : null);

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    [styles.inputGroup],
    {
      [styles.animatedError]: !!error,
      [styles.animatedValid]: value && !error
    },
    className
  );

  return (
    <div className={classes}>
      <input
        id={id}
        className={styles.textInput}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};

const PhoneInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    [styles.inputGroup],
    {
      [styles.animatedError]: !!error,
      [styles.animatedValid]: value && !error
    },
    className
  );

  return (
    <div className={classes}>
      <InputMask
        id={id}
        className={styles.textInput}
        type={type}
        value={value}
        onChange={onChange}
        mask="+7 (999) 999-99-99"
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};

const CheckOutForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="firstName"
        type="text"
        placeholder="ФИО"
        error={touched.firstName && errors.firstName}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <PhoneInput
        id="phone"
        type="text"
        placeholder="Телефон"
        error={touched.phone && errors.phone}
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="email"
        type="text"
        placeholder="E-mail"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="address"
        type="text"
        placeholder="Адрес"
        error={touched.address && errors.address}
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="metro"
        type="text"
        placeholder="Метро"
        error={touched.metro && errors.metro}
        value={values.metro}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="additionalInfo"
        type="text"
        placeholder="Дополнительная информация"
        error={touched.additionalInfo && errors.additionalInfo}
        value={values.additionalInfo}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button type="submit" disabled={isSubmitting}>
        Отправить
      </button>
    </form>
  );
};

const EnchancedCheckOutForm = formikEnchancer(CheckOutForm);

const CheckOutFormModal = () => (
  <div>
    <EnchancedCheckOutForm user={{ email: "", firstName: "" }} />
  </div>
);

export default CheckOutFormModal;
