import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { validateData } from './dataManager';
import { getProperShortLink } from '../../common/helper';

import InputField from '../InputField';
import { Slide, Button, Dialog, DialogContent } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

import cx from 'classnames';
import styles from './EditLink.module.scss';
import { updateShortLink } from '../../services/LinkService';

const EditShortLink = (props) => {
  const [backHalf, setBackHalf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpireType, setIsExpireType] = useState(false);
  const [formExpireTime, setFormExpireTime] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (!props.linkData || Object.keys(props.linkData).length === 0) {
      console.log('Cannot edit link without appropriate data');
    } else {
      setBackHalf(props.linkData?.slug);
      setIsExpireType(props.linkData?.is_expire_type ?? false);
      setFormExpireTime(props.linkData?.expire_time ?? '');
    }
  }, [props.linkData]);

  const handleDialogClose = () => {
    if (isLoading) {
      return;
    } else {
      if (props.onClose) {
        props.onClose();
      }

      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const validationPayload = {
      backHalf: backHalf,
      isExpireType: isExpireType,
      expireTime: formExpireTime,
    };

    const errors = validateData(validationPayload);

    if (errors.length === 0) {
      // TODO Save Link

      const dataPayload = {
        id: props.linkData?.id,
        slug: backHalf,
        is_expire_type: isExpireType,
        expire_time: formExpireTime,
      };

      updateShortLink(dataPayload)
        .then((responseData) => {
          setIsLoading(false);

          if (props.onEditComplete) {
            props.onEditComplete();
          }
        })
        .catch((errorData) => {
          setIsLoading(false);

          if (errorData.data.errors) {
            setValidationErrors(errorData.data.errors);
          }

          console.log('Error While Updating Link Data', errorData);
        });
    } else {
      setValidationErrors(errors);
      setIsLoading(false);
    }
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
          <h3 className={styles.heading}>Edit Link</h3>
          <button
            className={styles.closeButton}
            onClick={() => handleDialogClose()}
          >
            <CloseOutlined htmlColor='white' />
          </button>
        </header>

        <div className={styles.contentWrapper}>
          <a
            className={styles.createdLink}
            href={getProperShortLink(props.linkData?.slug)}
          >
            <p>
              {process.env.REACT_APP_SHORT_LINK_DOMAIN}/
              <b>{props.linkData?.slug}</b>
            </p>
          </a>

          <p className={styles.date}>
            Created{' '}
            {dayjs(props.linkData?.created_at).format('MMMM DD YYYY, hh:mm A')}
          </p>

          <InputField
            label='Customize Back Half'
            inputProps={{
              type: 'text',
              value: backHalf,
              disabled: isLoading,
              placeholder: 'Enter value...',
              onChange: (e) => setBackHalf(e.target.value),
            }}
          />

          <div
            className={styles.expireWrapper}
            onClick={() => {
              setIsExpireType((prev) => !prev);
              setFormExpireTime('');
            }}
          >
            <input
              readOnly
              type='checkbox'
              checked={isExpireType}
              className={styles.expireCheckbox}
            />
            <label className={styles.expireLabel}>Set to auto expire</label>
          </div>

          {isExpireType ? (
            <InputField
              label='Enter Expiry Date and Time'
              inputProps={{
                type: 'datetime-local',
                disabled: isLoading,
                value: formExpireTime,
                placeholder: 'Enter date time...',
                onChange: (e) => setFormExpireTime(e.target.value),
              }}
            />
          ) : null}

          <div className={styles.submitAreaWrapper}>
            <Button
              color='secondary'
              variant='contained'
              disabled={isLoading}
              onClick={() => handleSubmit()}
            >
              Save
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

export default EditShortLink;
