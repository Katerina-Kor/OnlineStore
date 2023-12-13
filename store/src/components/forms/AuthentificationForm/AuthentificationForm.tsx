import { FC, useEffect, useState } from 'react';
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
import { setUserLoggedIn } from '../../../store/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../../../store/services/cartService';

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
  const [login, loginResult] = useLoginUserMutation();
  const [signUp, signUpResult] = useRegisterUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginResult.isSuccess) {
      reset();
      dispatch(setUserLoggedIn(loginResult.data.data.token));
      navigate('/products');
    };
    if (loginResult.error && 'status' in loginResult.error) {
      setError('root.serverError', {
        message: loginResult.error.data.error.message,
      });
    }
  }, [loginResult]);

  useEffect(() => {
    if (signUpResult.error && 'status' in signUpResult.error) {
      setError('root.serverError', {
        message: signUpResult.error.data.error.message,
      });
    }
  }, [signUpResult]);

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
        const res = await signUp({
          email: data.emailRequired,
          password: data.passwordRequired,
        });
        console.log('signup', res )
        if ('error' in res) return;
      }
      await login({
        email: data.emailRequired,
        password: data.passwordRequired,
      });
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
          <Link
            component={RouterLink}
            to={linkPath}
            variant="body2"
            alignSelf="end"
          >
            {linkText}
          </Link>
        </Stack>
      </form>
    </>
  );
};

export default AuthentificationForm;
