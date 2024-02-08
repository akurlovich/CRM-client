import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { USER_AVATAR } from '../../constants/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUser } from '../../store/reducers/AuthReducer/AuthActionCreatores';
import { removeRigisterUserError } from '../../store/reducers/AuthReducer/AuthSlice';
import { FormInput } from '../UI/FormInput/FormInput';
import { UserErrorWarning } from '../UI/UserErrorWarning/UserErrorWarning';
import './userregistration.scss';

const UserRegistrationInner: FC = () => {
  const { error } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonSubmit, setButtonSubmit] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const handlerChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(registerUser({email, password}));
  };

  const validFormData = () => {
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passValid = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(password);
    const pasConfirm = (password === confirmPassword);
    if (passValid && pasConfirm && emailValid) {
      setButtonSubmit(true)
    }
  };

  useEffect(() => {
    validFormData();
  }, [password, confirmPassword, email]);

  useEffect(() => {
    if (error) {
      setRegisterError(true);
    }
  
  }, [error])

  const canselHandler = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setButtonSubmit(prev => false);
    setRegisterError(false);
    dispatch(removeRigisterUserError());
  }

  return (
    <div className='registration'>
      {registerError && <UserErrorWarning canselHandler={canselHandler} message={`User with email ${email} already exist!`}/>}
      <div className="registration__block">
        <div className="registration__container">
          <div onClick={() => navigate('/')} className="registration__close">
            <AiOutlineCloseCircle size={40}/>
          </div>
          <div className="registration__title">
            Создать аккаунт
          </div>
          <form
            onSubmit={handlerChange}
            className="registration__form"
            >
            <FormInput
              label='Email address'
              name='email'
              type='text'
              value={email}
              errorMessage='Not valid email!'
              setData={setEmail}
              required={true}
              pattern='^\S+@\S+\.\S+$'
            />
            <FormInput
              label='Password'
              name='password'
              type='password'
              value={password}
              errorMessage='Password shoud be 8-20 characters and include 1 number and 1 letter!'
              setData={setPassword}
              required={true}
              pattern='^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$'
            />
            <FormInput
              label='Confirm password'
              name='confirm'
              type='password'
              value={confirmPassword}
              errorMessage="Password don'n match"
              setData={setConfirmPassword}
              required={true}
              pattern={password}
            />
            <div className="registration__form__button">
              <input
                className={buttonSubmit ? "registration__form__button_send active" : "registration__form__button_send"}
                type="submit"
                value="Sing in"
              />
            </div>
          </form>
          <div className="registration__login-link">
            <div className="registration__login-link__text">
              Уже есть аккаунт?
            </div>
            <div className="registration__login-link__link">
              <Link to='/login'>Вход</Link> 
            </div>
          </div>
        </div>
        {/* <img className='registration__book one' src="./assets/book-1.png" alt="book" />
        <img className='registration__book two' src="./assets/book-2.png" alt="book" />
        <img className='registration__book three' src="./assets/book-3.png" alt="book" /> */}
      </div>
    </div>
  );
};

export const UserRegistration = React.memo(UserRegistrationInner);
