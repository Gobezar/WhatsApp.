import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import CreateDialog from '../../components/CreateDialog/CreateDialog';
import ContactList from '../../components/ContactList/ContactList';
import DialogWindow from '../../components/DialogWindow/DialogWindow';
import { logOut } from '../../redux/slices/loginSlice';


import '../MainPage/MainPage.css'



const MainPage = () => {

  const { isAuth } = useAppSelector(state => state.loginSlice)
  const dispatch = useAppDispatch()


console.log (isAuth)

  return (
    <div className='mainPage'>
      <div className='leftWindow'>
        <CreateDialog />
        <ContactList />
          <div className='exitButtonDiv'>
              <button onClick={() => dispatch(logOut())} className='exitButton'>Выйти из профиля</button>
          </div>
      </div>
      <div className='rightWindow'>
        <DialogWindow />
      </div>
    </div>
  )
}

export default MainPage;