import styles from './Input.module.scss';

const InputField = (props) => {
  return (
    <div className={styles.inputWrapper}>
      {props.label && <p className={styles.label}>{props.label}</p>}
      <input className={styles.inputField} {...props.inputProps} />
    </div>
  );
};

export default InputField;
