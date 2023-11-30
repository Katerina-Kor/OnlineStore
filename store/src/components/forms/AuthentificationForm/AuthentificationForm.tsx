import { FC, useState } from 'react';
import loginUser from '../../../api/loginRequest';
import registerUser from '../../../api/registerRequest';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  emailValidationRules,
  passwordValidationRules,
} from '../../../utils/authFormValidation/authFormValidate';

type PasswordType = 'password' | 'text';

type AuthFormData = {
  emailRequired: string;
  passwordRequired: string;
};

type AuthentificationFormProps = {
  formType?: 'login' | 'register';
};

const AuthentificationForm: FC<AuthentificationFormProps> = ({ formType }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    mode: 'onTouched',
  });

  const [passwordType, setPasswordType] = useState<PasswordType>('password');
  const navigate = useNavigate();

  const isRegisterPage = formType === 'register';
  const buttonName = formType === 'login' ? 'Login' : 'Sign Up';
  const linkPath = formType === 'login' ? '/register' : '/login';
  const linkText =
    formType === 'login'
      ? "Don't have an account? Sign Up"
      : 'Already have an account? Login';

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    if (isSubmitting) return;
    try {
      if (isRegisterPage) {
        await registerUser(data.emailRequired, data.passwordRequired);
      }
      await loginUser(data.emailRequired, data.passwordRequired);
      reset();
      navigate('/products');
    } catch (e) {
      // TODO: обработать конкретные ответы сервера
      const errorMessage = (e as Error).message;
      setError('root.serverError', {
        message: errorMessage,
      });
    }
  };

  const onInput = () => {
    clearErrors('root.serverError');
  };

  const passwordIconProps = {
    sx: { cursor: 'pointer' },
    onClick: togglePassword,
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            type="text"
            {...register('emailRequired', {
              required: 'this field is required',
              validate: emailValidationRules,
            })}
            error={!!errors.emailRequired || !!errors.root?.serverError}
            helperText={errors.emailRequired?.message}
            required
            onInput={onInput}
          />
          <TextField
            label="Password"
            type={passwordType}
            {...register('passwordRequired', {
              required: 'this field is required',
              validate: passwordValidationRules,
            })}
            error={!!errors.passwordRequired || !!errors.root?.serverError}
            helperText={errors.passwordRequired?.message || ''}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {passwordType === 'password' ? (
                    <VisibilityOff {...passwordIconProps} />
                  ) : (
                    <Visibility {...passwordIconProps} />
                  )}
                </InputAdornment>
              ),
            }}
            onInput={onInput}
          />
          <Typography color="error" textAlign="center">
            {errors.root?.serverError.message}
          </Typography>
          <Button type="submit" variant="contained" color="primary">
            {buttonName}
          </Button>
          <Link href={linkPath} variant="body2" alignSelf="end">
            {linkText}
          </Link>
        </Stack>
      </form>
    </>
  );
};

export default AuthentificationForm;
