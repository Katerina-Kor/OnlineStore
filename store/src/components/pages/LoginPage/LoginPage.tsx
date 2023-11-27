import { FC } from 'react';
import LoginForm from '../../forms/LoginForm/LoginForm';

const LoginPage: FC = () => {
  return (
    <div className="login">
      <h3 className="heading login__heading">login</h3>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
