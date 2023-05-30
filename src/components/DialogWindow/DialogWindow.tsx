import React, {useEffect} from 'react'
import MyInput from '../../UI/Input/MyInput'
import Messages from '../Messages/Messages'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setMessage, sendMessage,  AcceptMessage, deleteMessage, deleteArrayMessages } from '../../redux/slices/dialogSlice'
import '../DialogWindow/DialogWindow.css'
import DialogHeader from '../DialogHeader/DialogHeader'
import {DeleteTwoTone} from '@ant-design/icons'

const DialogWindow = () => {

  const { currentSubscriber } = useAppSelector(state => state.contactsSlice)
  const chatId = currentSubscriber.number;
  const { message, receiptId, arrayMessages } = useAppSelector(state => state.dialogSlice)
  const textMessage = message.textMessage
  const dispatch = useAppDispatch();


  const onChangeTextMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setMessage(e.currentTarget.value))
  }

  const toSendMessage = () => {
    dispatch(sendMessage({ textMessage, chatId }))
  }

  useEffect(() => {
    const intervalId = setInterval (() => {
      dispatch(AcceptMessage({number: currentSubscriber.number}))
      dispatch(deleteMessage(receiptId))

    }, 3000)
    return () => {clearInterval(intervalId)}
  }, [receiptId, currentSubscriber])
  

console.log (currentSubscriber)

    return (
    <div className='dialogWindow'>
      <div className='dialogHeaderDiv'><DialogHeader /></div>
      {Object.keys(currentSubscriber).length ? <div className='messagesDiv'><Messages /></div> : <></>}
      <div className='buttonsDiv'>
        <div className='resetDiv'><button disabled={arrayMessages.length ? false : true} onClick={() => dispatch(deleteArrayMessages())} className='resetButton'><DeleteTwoTone twoToneColor="rgba(37, 211, 102, 1)"/></button></div>
        <div className='inputDiv'><MyInput value={textMessage} onChange={onChangeTextMessage} type="text" placeholder="Текст сообщения..." className='textMessageInput' /></div>
        <div className='buttonDiv'><button disabled={Object.keys(currentSubscriber).length ? false : true} onClick={toSendMessage} className='myBtn'>Отправить</button></div>
      </div>

    </div>
  )
}

export default DialogWindow