import React from 'react';
import { Form, useFormikContext } from "formik";
import { Form as FormBoot } from "react-bootstrap";
import {LoginFormikValues} from "../interfaces/formik/LoginFormikValues";
import SubmitFormButton from "../components/SubmitButton/SubmitFormButton";

const LoginForm = () => {

  const formGroup = `mx-3 my-1 fw-light w-50 align-self-center`;
  const formLabel = `position-relative left-10 fs-4`;
  const formControl = `rounded-pill px-3 w-100 bg-light text-dark`;
  const errorSpan = `text-danger position-relative left-10`;

  const { handleChange, errors, touched } = useFormikContext<LoginFormikValues>();

  return (
    <Form className={ `h-80 w-100 py-2 d-flex flex-column justify-content-around` }>

      <FormBoot.Group className={ formGroup }>
        <FormBoot.Label className={ formLabel }>Username</FormBoot.Label>
        <FormBoot.Control type={ `text` }
                          className={ formControl }
                          name={ `username` }
                          onChange={ handleChange }
                          isInvalid={ touched.username && !!errors.username }
                          isValid={ touched.username && !errors.username }
        />

        <span id={ 'username-error' } className={ errorSpan }>
          { errors.username }
        </span>

      </FormBoot.Group>

      <FormBoot.Group className={ formGroup }>
        <FormBoot.Label className={ formLabel }>Password</FormBoot.Label>
        <FormBoot.Control type={ `password` }
                          className={ formControl }
                          name={ `password` }
                          onChange={ handleChange }
                          isInvalid={ touched.password && !!errors.password }
                          isValid={ touched.password && !errors.password }
        />

        <span id={ 'password-error' } className={ errorSpan }>
          { errors.password }
        </span>

      </FormBoot.Group>


      <hr className={ `my-4 w-50 align-self-center position-relative left-5` }/>

      <SubmitFormButton
        variant={ `info` }
        className={ `w-25 align-self-center rounded-pill text-light` }
      >
        Login
      </SubmitFormButton>

    </Form>
  );
};

export default LoginForm;