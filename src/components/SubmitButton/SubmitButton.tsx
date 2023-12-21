import React, {FC} from 'react';
import {BaseSubmitButtonProps} from "./SubmitFormButton";
import {Button, Spinner} from "react-bootstrap";

interface NonFormSubmitButtonProps extends BaseSubmitButtonProps {
    isSubmitting: boolean;
}

const SubmitButton: FC<NonFormSubmitButtonProps> = ({isSubmitting, children, ...props}) => {
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