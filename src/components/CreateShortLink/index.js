import React, { useState } from 'react';

import InputField from '../InputField';
import { CloseOutlined } from '@material-ui/icons';
import { Slide, Button, Dialog, DialogContent } from '@material-ui/core';

import { validateData } from './dataManager';
import { createNewShortLink } from '../../services/LinkService';

import styles from './CreateLink.module.scss';

const CreateShortLink = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formLongURL, setFormLongURL] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleDialogClose = () => {
    if (isLoading) {
      return;
    } else {
      if (props.onClose) {
        props.onClose();
      }
    }
  };

  const handleSubmit = () => {
    // setIsLoading(true);
    setValidationErrors([]);

    const dataPayload = {
      sourceURL: formLongURL,
    };

    const errors = validateData(dataPayload);

    if (errors.length !== 0) {
      setValidationErrors(errors);
      return;
    }

    createNewShortLink(dataPayload)
      .then((responseData) => {
        if (props.onCreateComplete) {
          props.onCreateComplete(responseData.data);
        }
      })
      .catch((errorData) => {
        console.log('Error occurred while creating link', errorData);
      });
  };

  return (
    <Dialog
      open={props.open}
      TransitionProps={{
        direction: 'left',
        timeout: 700,
      }}
      PaperProps={{
        style: {
          right: '0px',
          margin: '0px',
          height: '100%',
          width: '400px',
          padding: '0px',
          maxHeight: '100%',
          position: 'fixed',
          borderRadius: '0px',
        },
      }}
      TransitionComponent={Slide}
      onClose={() => handleDialogClose()}
    >
      <DialogContent style={{ padding: '0px' }}>
        <header className={styles.headerWrapper}>
          <h3 className={styles.heading}>Create Link</h3>
          <button
            className={styles.closeButton}
            onClick={() => handleDialogClose()}
          >
            <CloseOutlined htmlColor='white' />
          </button>
        </header>

        <div className={styles.contentWrapper}>
          <InputField
            label='Domain (default)'
            inputProps={{
              readOnly: true,
              value: 'short.ly',
            }}
          />

          <InputField
            textArea
            label='Long URL'
            inputProps={{
              type: 'url',
              value: formLongURL,
              disabled: isLoading,
              placeholder: 'Enter long URL',
              onChange: (e) => setFormLongURL(e.target.value),
            }}
          />

          <div className={styles.submitAreaWrapper}>
            <Button
              color='secondary'
              variant='contained'
              disabled={isLoading}
              onClick={() => handleSubmit()}
            >
              Create
            </Button>
          </div>

          {validationErrors && validationErrors.length !== 0 && (
            <div className={styles.validationErrorsWrapper}>
              <ul>
                {validationErrors.map((currentItem, currentIndex) => (
                  <li key={currentIndex}>{currentItem}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShortLink;
