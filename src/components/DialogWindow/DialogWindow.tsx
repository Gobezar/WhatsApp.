import React, { useEffect, useRef } from 'react'
import MyInput from '../../UI/Input/MyInput'
import Messages from '../Messages/Messages'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setMessage, sendMessage, AcceptMessage, deleteMessage, deleteArrayMessages } from '../../redux/slices/dialogSlice'
import '../DialogWindow/DialogWindow.css'
import DialogHeader from '../DialogHeader/DialogHeader'
import { DeleteTwoTone } from '@ant-design/icons'

const DialogWindow = () => {

  const { currentSubscriber } = useAppSelector(state => state.contactsSlice)
  const chatId = currentSubscriber.number;
  const { sendingMessage, receiptId, arrayMessages } = useAppSelector(state => state.dialogSlice)
  const textMessage = sendingMessage.textMessage
  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);



  const onChangeTextMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setMessage(e.currentTarget.value))
  }

  const toSendMessage = () => {
    dispatch(sendMessage({ textMessage, chatId }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(AcceptMessage({ number: currentSubscriber.number }))
      dispatch(deleteMessage(receiptId))

    }, 3000)
    return () => { clearInterval(intervalId) }
  }, [receiptId, currentSubscriber])


  return (


    <div className='dialogWindow' style={{ maxHeight: '100vh' }}>
      <div className='dialogHeaderDiv'><DialogHeader /></div>
      {Object.keys(currentSubscriber).length ? (
        <div className='messagesDiv'>
          <div className='messagesScroll'>
            <Messages />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className='buttonsDiv'>
        <div className='resetDiv'>
          <button
            disabled={arrayMessages.length ? false : true}
            onClick={() => dispatch(deleteArrayMessages())}
            className='resetButton'
          >
            <DeleteTwoTone twoToneColor="rgba(37, 211, 102, 1)" />
          </button>
        </div>
        <div className='inputDiv'>
          <MyInput value={textMessage} onChange={onChangeTextMessage} onKeyDown={handleKeyDown} type="text" placeholder="Текст сообщения..." className='textMessageInput' />
        </div>
        <div className='buttonDiv'>
          <button
            disabled={Object.keys(currentSubscriber).length ? false : true}
            onClick={toSendMessage}
            className='myBtn'
            ref={buttonRef}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export default DialogWindow