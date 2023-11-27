import { FC, useState } from 'react';
import closeEyeIcon from '../../../assets/img/close-eye.png';
import openEyeIcon from '../../../assets/img/open-eye.png';
// import './loginForm.css';

type PasswordType = 'password' | 'text';

const LoginForm: FC = () => {
  const [passwordType, setPasswordType] = useState<PasswordType>('password');
  const [iconPath, setIconPath] = useState<string>(closeEyeIcon);

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setIconPath(openEyeIcon);
    } else {
      setPasswordType('password');
      setIconPath(closeEyeIcon);
    }
  };

  const handleSubmit = () => {};

  const handleInput = () => {};

  return (
    <div className="login">
      <h3 className="heading login__heading">login</h3>
      <form className="login__form" onSubmit={() => handleSubmit}>
        <input
          className={`input login__input`}
          type="text"
          placeholder="Email"
          onInput={handleInput}
        />
        <div className="password__wrapper">
          <input
            className={`input login__input input_password`}
            type={passwordType}
            placeholder="Password"
            onInput={handleInput}
          />
          <img src={iconPath} className="icon_eye" onClick={togglePassword} />
        </div>
        <button className="button login__button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
