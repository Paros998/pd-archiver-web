import React from 'react';
import { EmojiExpressionlessFill } from "react-bootstrap-icons";
import BackButtonArrowCircle from "../BackButton/BackButtonArrowCircle";

const NotFound = () => {
  return (
    <main
      className={ `d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark` }>

      <BackButtonArrowCircle className={ `position-absolute left-5 top-5` } arrowSize={ `fs-1` }/>

      <EmojiExpressionlessFill
        className={ `text-light spin-around` }
        fontSize={ '30rem' }
      />

      <h1
        id={ 'not-found' }
        className={ `gradient-color mt-lg-4 mt-md-2 mt-sm-1` }
      >
        Not Found 404
      </h1>

    </main>

  );
};

export default NotFound;