import React from 'react';
import {Spinner} from "react-bootstrap";

const Pending = () => {
  return (
    <main
      className={`d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark`}>

      <Spinner
        animation='border'
        variant='light'
        style={{width: '20rem', height: '20rem'}}
      />

    </main>
  );
};

export default Pending;