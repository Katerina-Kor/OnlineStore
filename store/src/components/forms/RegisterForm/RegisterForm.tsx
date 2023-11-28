import { FC, FormEvent, FormEventHandler, useState } from 'react';
import closeEyeIcon from '../../../assets/img/close-eye.png';
import openEyeIcon from '../../../assets/img/open-eye.png';
import login from '../../../api/loginRequest';
import register from '../../../api/registerRequest';

type PasswordType = 'password' | 'text';

const RegisterForm: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordType, setPasswordType] = useState<PasswordType>('password');
  const [iconPath, setIconPath] = useState<string>(closeEyeIcon);

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
  };

  const handlePasswordChange = (newValue: string) => {
    setPasswordValue(newValue);
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setIconPath(openEyeIcon);
    } else {
      setPasswordType('password');
      setIconPath(closeEyeIcon);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await register(emailValue, passwordValue);
      await login(emailValue, passwordValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <input
        className={`input login__input`}
        value={emailValue}
        type="text"
        placeholder="Email"
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <div className="password__wrapper">
        <input
          className={`input login__input input_password`}
          value={passwordValue}
          type={passwordType}
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <img src={iconPath} className="icon_eye" onClick={togglePassword} />
      </div>
      <button className="button login__button" type="submit">
        register
      </button>
    </form>
  );
};

export default RegisterForm;
