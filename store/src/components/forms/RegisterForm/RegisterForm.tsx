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
    } catch (e) {
      // TODO:
      // handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={emailValue}
        type="text"
        placeholder="Email"
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <div>
        <input
          value={passwordValue}
          type={passwordType}
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <img src={iconPath} onClick={togglePassword} />
      </div>
      <button type="submit">register</button>
    </form>
  );
};

export default RegisterForm;
