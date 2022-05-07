import React from "react";
import { Field } from "redux-form";
<<<<<<< HEAD
import styles from "./FormControls.module.css";
=======
import styles from "./FormControls.module.scss";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { validateAuthorizationUserCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

<<<<<<< HEAD
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
=======
const FormControls = (props) => {
  return (
    <>
      {props.children && props.children.props.type === "checkbox" ? <div>{props.children}</div> : <>{props.meta.touched && props.meta.error ? <div className={styles.wrapperInputAndTextarea + " " + styles.wrapperInputAndTextareaError}>{props.children}</div> : <div className={styles.wrapperInputAndTextarea}>{props.children}</div>}</>}
      {props.meta.touched && props.meta.error ? (
        <div className={styles.block_error}>
          <svg aria-hidden="true" className="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
          </svg>
          {props.meta.error}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const Input = (props) => {
  const { input, child, meta, ...restProps } = props;

  return (
    <FormControls {...props}>
      <input {...input} {...restProps} />
    </FormControls>
  );
};

export const Textarea = (props) => {
  const { input, child, meta, ...restProps } = props;

  return (
    <FormControls {...props}>
      <textarea {...input} {...restProps} />
    </FormControls>
  );
};

export const WrapperCreateField = (props) => {
  const [values, setValues] = React.useState({
    password: "",
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
    <>
      {props.type === "checkbox" ? (
        <div className={styles.wrapper_field + " " + styles.wrapper_field_checkbox}>
          {props.text ? (
            <span className={styles.text_for_field}>
              <Checkbox
                className={styles.checkbox}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                sx={{
                  color: pink[2000],
                  "&.Mui-checked": {
                    color: pink[300],
                  },
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                  padding: 0,
                  marginRight: "5px",
                }}
              />
              {props.text}
            </span>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className={styles.wrapper_field}>
          {props.type === "password" ? (
            <>
              <Field className={styles.field + " " + styles.field__password} name={props.name} validate={props.validate} type={values.showPassword ? "text" : props.type} value={values.password} onChange={handleChange("password")} placeholder={props.placeholder} component={props.component} />

              {values.password !== "" ? (
                <InputAdornment position="end" className={styles.toggle_show_password_button}>
                  <IconButton className={styles.toggle_show_password_icon} aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              )}
            </>
          ) : (
            <Field className={styles.field} name={props.name} validate={props.validate} type={props.type} placeholder={props.placeholder} component={props.component} />
          )}

          {props.text ? <span className={styles.text_for_field}>{props.text}</span> : <></>}
        </div>
      )}
    </>
  );
};

export const WrapperButton = (props) => {
  let [errorSignIn, setErrorSignIn] = React.useState(false);

  return (
    <>
      {props.isSignIn && errorSignIn ? <div className={styles.common_error}>{errorSignIn}</div> : undefined}

      <div className={styles.wrapper_button}>
        <Button onClick={() => (props.isSignIn ? setErrorSignIn(validateAuthorizationUserCreator(props.accounts, props.userSignIn)) : undefined)} type="submit" disabled={props.invalid || props.submitting} variant="contained">
          <span style={{ textTransform: "capitalize" }}>{props.button_text}</span>
        </Button>
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
      </div>
    </>
  );
};
