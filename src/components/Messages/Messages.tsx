import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import '../Messages/Messages.css'


const Messages = () => {

    const dispatch = useAppDispatch();
    const { arrayMessages } = useAppSelector(state => state.dialogSlice)
    const { currentSubscriber } = useAppSelector(state => state.contactsSlice)
    const nameSubscriber = currentSubscriber.name
    const { sendingMessage, acceptedMessage } = useAppSelector(state => state.dialogSlice)
    const idMessage = sendingMessage.idMessage

// ничего не менялось

console.log (acceptedMessage)
    return (
        <div>
            {arrayMessages.map((message: any) => (
                <div className='messages' key={message.idMessage}>
                    {message.isMy ?
                        <div className='myMessage'>
                            {/* <span style={{padding:'10px'}}>Я 1:</span> */}
                            <div><span>{message.textMessage}</span></div>
                        </div>
                        :
                        <div  className='subscriberMessage'>
                            {/* <span>{nameSubscriber? nameSubscriber : 'Аноним'}:</span> */}
                            <div><span>{message.textMessage}</span></div>
                        </div>
                    }
                </div>
            ))}

        </div>
    )
}

export default Messages