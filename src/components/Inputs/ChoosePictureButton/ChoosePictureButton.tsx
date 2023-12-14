import React, { ChangeEvent, FC, useRef } from 'react';
import { Button, Form, FormControlProps } from 'react-bootstrap';
import { ErrorMessage, useField } from 'formik';

enum PhotoUpload {
  FirstPhoto,
}

interface ChoosePictureButtonProps extends FormControlProps {
  name: string;
}

const ChoosePictureButton: FC<ChoosePictureButtonProps> = ({ ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, , helpers] = useField(props.name);

  const handlePhotoUpload = (e: ChangeEvent<HTMLElement>) => {
    const file = (e.target as HTMLInputElement).files![PhotoUpload.FirstPhoto];

    if (file !== undefined) {
      helpers.setValue(file);
    }
  };

  const handleChoosePhoto = () => inputRef?.current?.click();

  return (
    <Form.Group className='text-center text-md-start'>
      <Form.Control
        name={field.name}
        className='d-none'
        type='file'
        ref={inputRef}
        onChange={handlePhotoUpload}
      />

      <Button
        variant='secondary-light'
        className='bg-white shadow-none pe-3 ps-3'
        onClick={handleChoosePhoto}
      >
        Choose Picture
      </Button>

      <div className='w-100' />

      <Form.Text>File Type</Form.Text>

      <ErrorMessage name={field.name}>
        {(errorMessage) =>
          <div className='mt-1 text-danger'>
            {errorMessage}
          </div>}
      </ErrorMessage>
    </Form.Group>
  );
};

export default ChoosePictureButton;