import React from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { validateAuthorizationUserCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

export const InputField = (props) => {
  const { input, child, meta, ...restProps } = props;

  return <TextField {...input} {...restProps} error={props.meta.touched && props.meta.error ? Boolean(props.meta.error) : null} helperText={props.meta.touched && props.meta.error ? props.meta.error : null} />;
};

export const Textarea = (props) => {
  const { input, child, meta, ...restProps } = props;

  return <textarea {...input} {...restProps} />;
};

export const WrapperCreateField = (props) => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.wrapper_field}>
      {props.type === "password" ? (
        <Field
          id="outlined-adornment-password"
          className={styles.field}
          name={props.name}
          type={values.showPassword ? "text" : "password"}
          label={props.label}
          placeholder={props.placeholder}
          helperText={props.helperText}
          validate={props.validate}
          error={props.error}
          component={props.component}
          value={values.password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {values.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Field className={styles.field} name={props.name} type={props.type} label={props.label} placeholder={props.placeholder} helperText={props.helperText} validate={props.validate} error={props.error} component={props.component} />
      )}
    </div>
  );
};

export const WrapperButton = (props) => {
  return (
    <>
      {props.authError ? <div className={styles.form_error}>{props.authError}</div> : null}

      <div className={styles.wrapper_button}>
        <LoadingButton className={styles.button} type="submit" loading={props.loading} disabled={props.invalid || props.submitting} variant="contained" loadingPosition="center">
          {props.button_text}
        </LoadingButton>
      </div>
    </>
  );
};
