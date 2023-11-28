import { FC, FormEvent, FormEventHandler, useState } from 'react';
import closeEyeIcon from '../../../assets/img/close-eye.png';
import openEyeIcon from '../../../assets/img/open-eye.png';
import login from '../../../api/loginRequest';
import { useNavigate } from 'react-router-dom';

type PasswordType = 'password' | 'text';

const LoginForm: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordType, setPasswordType] = useState<PasswordType>('password');
  const [iconPath, setIconPath] = useState<string>(closeEyeIcon);
  const navigate = useNavigate();

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
    await login(emailValue, passwordValue);
    navigate('/products');
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
        login
      </button>
    </form>
  );
};

export default LoginForm;
