import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logIn, setIdInstance, setApiTokenInstance } from '../../redux/slices/loginSlice'

import MyButton from '../../UI/Button/MyButton'
import MyInput from '../../UI/Input/MyInput'
import '../LoginPage/LoginPage.css'

const LoginPage = () => {

  const dispatch = useAppDispatch()
  const { idInstance, apiTokenInstance } = useAppSelector(state => state.loginSlice)


  useEffect(() => {
    if(localStorage.getItem('auth')) {
        dispatch(logIn(true))
    }
 }, [])

  const login = (e: React.FormEvent) => {
      e.preventDefault(); // чтобы страница не перезагружалась
      dispatch(logIn(true))
  }
  
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(setIdInstance(e.currentTarget.value));
    }
  const onChangeApi = (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(setApiTokenInstance(e.currentTarget.value));
    }


    return (
      <div className='loginPage'>
          <div className='loginPageImgDiv'><img className='loginPageImg' src='https://avatars.mds.yandex.net/i?id=236961d0edfc1a5666f0033e91180a346b3d486c-8496968-images-thumbs&n=13'/></div>
          <h2>Пожалуйста, авторизуйтесь</h2>
          <form onSubmit={login}>
              <div className='loginPageInputDiv'><input className='loginPageInput' value={idInstance} onChange={onChangeId} type="text" placeholder="Введите Ваш idInstance"></input></div>
              <div className='loginPageInputDiv'><input className='loginPageInput' value={apiTokenInstance} onChange={onChangeApi} type="text" placeholder="Введите Ваш apiTokenInstance"></input></div>
              <div className='loginPageButtonDiv'><button className='loginPageButton'>Войти</button></div>
          </form>
          <div className='login_warning'><p>Это тестовая форма авторизации.<br />
          Для получения параметров запроса idInstance и apiTokenInstance обратитесь <a href='https://console.green-api.com/'>по данному адресу.</a> <br/>
          Введите Ваши данные, мы сохраним их в LocalStorage и авторизуем Вас! 😏</p></div>
  
      </div>
    )
}

export default LoginPage;
