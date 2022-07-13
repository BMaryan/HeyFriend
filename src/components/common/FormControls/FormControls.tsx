import React from "react";
import { FiledValidatorType } from "../../../utils/FieldValidationForm/FieldValidationForm";
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import styles from "./FormControls.module.scss";

interface FieldPropsType {
  input: WrappedFieldInputProps;
  child: React.ReactElement;
  meta: WrappedFieldMetaProps;
}

export const InputField = (props: FieldPropsType) => {
  const { input, child, meta, ...restProps } = props;

  return <TextField {...input} {...restProps} error={props.meta.touched && props.meta.error ? Boolean(props.meta.error) : undefined} helperText={props.meta.touched && props.meta.error ? props.meta.error : null} />;
};

export const Textarea = (props: FieldPropsType) => {
  const { input, child, meta, ...restProps } = props;

  return <textarea {...input} {...restProps} />;
};

interface WrapperCreateFieldPropsType {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  type: "text" | "email" | "search" | "password";
  variant?: "outlined" | "filled" | "standard";
  validate?: Array<FiledValidatorType>;
  error?: string;
  component: typeof InputField | typeof Textarea | "input" | "textarea";
  onReset?: any;
}

export const WrapperCreateField = (props: WrapperCreateFieldPropsType) => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
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
          variant={props.variant}
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
        <Field className={styles.field} name={props.name} type={props.type} label={props.label} variant={props.variant} placeholder={props.placeholder} helperText={props.helperText} validate={props.validate} error={props.error} component={props.component} />
      )}
    </div>
  );
};

interface WrapperButtonPropsType {
  authError: string | null;
  loading: boolean;
  button_text: string;
  invalid: boolean;
  submitting: boolean;
  anyTouched: boolean;
  dirty: boolean;
}

export const WrapperButton = (props: WrapperButtonPropsType) => {
  return (
    <>
      {props.authError ? <div className={styles.form_error}>{props.authError}</div> : null}

      <div className={styles.wrapper_button}>
        <LoadingButton className={styles.button} type="submit" loading={props.loading} disabled={((props.invalid || props.submitting) && !props.anyTouched) || !props.dirty} variant="contained" loadingPosition="center">
          {props.button_text}
        </LoadingButton>
      </div>
    </>
  );
};
