import React, { Components } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import axios from "axios";
import classnames from "classnames";
import InputMask from "react-input-mask";
import prodAddress from "redux/prodAddress";
import SuccessOrder from "./SuccessOrder";
import styles from "./checkOutForm.css";

const formikEnchancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("*Нужно указать имя"),
    phone: Yup.string()
      .required("*Нужно ввести номер телефона")
      .matches(
        /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,
        "*Нужно ввести номер телефона"
      ),
    address: Yup.string(),
    metro: Yup.string(),
    additionalInfo: Yup.string()
  }),

  mapPropsToValues: ({ user }) => ({
    ...user
  }),

  handleSubmit: (payload, { setStatus }) => {
    axios({
      method: "post",
      url: `${prodAddress}/api/createOrder`,
      data: {
        fio: payload.firstName,
        email: payload.email,
        tel: payload.phone,
        address: payload.address,
        metro: payload.metro,
        other: payload.additionalInfo
      }
    })
      .then(response => {
        setStatus("success")
      })
      .catch(error => {
      });
  },
  displayName: "checkOutForm"
});

const InputFeedback = ({ error }) =>
  error ? <div className={styles.inputFeedBack}>{error}</div> : null;

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
      [styles.animatedValid]: value && typeof error === "undefined"
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

const TextInputNotValidate = ({
  type,
  id,
  label,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames([styles.inputGroup], className);

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
    </div>
  );
};

const TextArea = ({
  type,
  id,
  label,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames([styles.inputGroup], className);

  return (
    <div className={classes}>
      <textarea
        id={id}
        className={`${styles.textInput} ${styles.textArea}`}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
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
    status,
    handleChange,
    handleBlur,
    handleShowCheckOutForm,
    handleSubmit,
    getCount,
    isSubmitting,
  } = props;

  if (status === "success") {
    return (
      <div className={styles.overlay}>
        <SuccessOrder
          getCount={getCount}
          handleShowCheckOutForm={handleShowCheckOutForm}
        />
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.checkOutForm}>
        <button
          className={styles.close}
          onClick={handleShowCheckOutForm}
          type="button"
        />
        <h4>Контактная информация</h4>
        <TextInput
          id="firstName"
          type="text"
          placeholder="ФИО *"
          error={touched.firstName && errors.firstName}
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <PhoneInput
          id="phone"
          type="tel"
          placeholder="Телефон *"
          error={touched.phone && errors.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.line} />
        <TextInputNotValidate
          id="email"
          type="text"
          placeholder="E-mail"
          error={touched.email && errors.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextInputNotValidate
          id="address"
          type="text"
          placeholder="Адрес"
          error={touched.address && errors.address}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextInputNotValidate
          id="metro"
          type="text"
          placeholder="Метро"
          error={touched.metro && errors.metro}
          value={values.metro}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextArea
          id="additionalInfo"
          type="text"
          placeholder="Дополнительная информация"
          error={touched.additionalInfo && errors.additionalInfo}
          value={values.additionalInfo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={isSubmitting}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

const EnchancedCheckOutForm = formikEnchancer(CheckOutForm);

const CheckOutFormModal = props => (
  <div className={props.checkOutFormShow ? styles.show : styles.hide}>
    <EnchancedCheckOutForm
      handleShowCheckOutForm={props.handleShowCheckOutForm}
      getCount={props.getCount}
      user={{
        email: "",
        firstName: "",
        phone: "",
        address: "",
        metro: "",
        additionalInfo: ""
      }}
    />
  </div>
);

export default CheckOutFormModal;
