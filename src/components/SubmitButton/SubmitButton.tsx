import React, {FC} from 'react';
import {ButtonProps} from "react-bootstrap/Button";
import {Button, Spinner} from "react-bootstrap";
import {useFormikContext} from 'formik';

interface SubmitButtonProps extends ButtonProps {

}

const SubmitButton: FC<SubmitButtonProps> = ({
                                               children,
                                               ...props
                                             }) => {
  const {isSubmitting} = useFormikContext();
  return (

    <Button
      type={"submit"}
      disabled={isSubmitting}
      {...props}
    >
      {
        isSubmitting &&

        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            className='me-1'
        />
      }

      {children}
    </Button>
  );
};

export default SubmitButton;
