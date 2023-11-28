import { FC } from 'react';
import RegisterForm from '../../forms/RegisterForm/RegisterForm';

const RegisterPage: FC = () => {
  return (
    <div className="login">
      <h3 className="heading login__heading">register</h3>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;