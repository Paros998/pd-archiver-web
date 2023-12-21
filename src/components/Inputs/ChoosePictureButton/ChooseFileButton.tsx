import React, { ChangeEvent, FC, useRef } from 'react';
import { Button, Form, FormControlProps } from 'react-bootstrap';
import { ErrorMessage, useField } from 'formik';

enum FileUpload {
  FirstFile,
}

interface ChooseFileButtonProps extends FormControlProps {
  name: string;
}

const ChooseFileButton: FC<ChooseFileButtonProps> = ({ ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, , helpers] = useField(props.name);

  const handleFileUpload = (e: ChangeEvent<HTMLElement>) => {
    const file = (e.target as HTMLInputElement).files![FileUpload.FirstFile];
    if (file !== undefined) {
      helpers.setValue(file)
    }
  };

  const handleChooseFile = () => inputRef?.current?.click();

  return (
    <Form.Group className='text-center text-md-start'>
      <Form.Control
        name={field.name}
        className='d-none'
        type='file'
        ref={inputRef}
        onChange={handleFileUpload}
      />

      <Button
        variant='light'
        className='shadow-none pe-3 ps-3'
        onClick={handleChooseFile}
      >
        Choose File
      </Button>

      <ErrorMessage name={field.name}>
        {(errorMessage) =>
          <div className='mt-1 text-danger'>
            {errorMessage}
          </div>}
      </ErrorMessage>
    </Form.Group>
  );
};

export default ChooseFileButton;