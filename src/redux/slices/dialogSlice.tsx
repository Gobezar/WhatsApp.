import { createSlice } from '@reduxjs/toolkit'
import { IDialogProps } from '../../models'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState: IDialogProps = {
    isLoading: false,
    error: '',
    sendingMessage: {
        isMy: true,
        textMessage: '',
        idMessage: ''
    },
    acceptedMessage: {
        isMy: false,
        textMessage: '',
        idMessage: ''
    }, 
    arrayMessages: [],
    receiptId: 0,
}


export const sendMessage = createAsyncThunk('dialog/sendMessage', async ({ textMessage, chatId }: { textMessage: string, chatId: string },) => {  
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    const message = textMessage
    const response = await axios.post(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
        chatId: `${chatId}@c.us`,
        message
    })
    const result = response.data
    return result
})


export const AcceptMessage = createAsyncThunk('dialog/AcceptMessage', async ({ number }: { number: string }) => {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    const response = await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
    const data = response.data; // Получение данных из ответа сервера
    console.log(data)
    const message = data.body.messageData?.textMessageData?.textMessage || data.body.messageData?.extendedTextMessageData?.text
   
    const receiptId = data.receiptId
    const idMessage = data.body.idMessage
    return { message, receiptId, idMessage, number: `${number}@c.us`, senderId: data.body.senderData.sender }; // Возврат receiptId как результата createAsyncThunk
})


export const deleteMessage = createAsyncThunk('dialog/deleteMessage', async (receiptId: number) => {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    const response = await axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
    const result = response.data
    return result
})



const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.sendingMessage.textMessage = action.payload
        },
        deleteArrayMessages (state) {
            state.arrayMessages = []
        }

    },
    extraReducers: {
        [sendMessage.fulfilled.type]: (state, action) => {
            state.error = '';
            state.sendingMessage = {
                isMy: true,
                textMessage: state.sendingMessage.textMessage,
                idMessage: action.payload.idMessage
            }
            state.arrayMessages.push(state.sendingMessage)
            state.sendingMessage = {
                isMy: true,
                textMessage: '',
                idMessage: action.payload.idMessage
            }
            state.isLoading = false;
            state.error = '';
        },
        [sendMessage.pending.type]: (state) => {
            state.isLoading = true;
        },
        [sendMessage.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            alert('При отправке сообщения возникла ошибка. Проверьте правильность введённых данных и повторите попытку.')
        },

        [AcceptMessage.fulfilled.type]: (state, action) => {
            if (state.receiptId !== action.payload.receiptId && state.sendingMessage.idMessage !== action.payload.idMessage) {
                const newMessage = {
                    isMy: false,
                    textMessage: action.payload.message,
                    idMessage: action.payload.idMessage
                };
                state.acceptedMessage = newMessage;
                state.arrayMessages.push(newMessage);
                state.acceptedMessage = {
                    isMy: false,
                    textMessage: '',
                    idMessage: action.payload.idMessage
                };
            }
            state.receiptId = action.payload.receiptId;
        },        
        [AcceptMessage.pending.type]: (state) => {
        },
        [AcceptMessage.rejected.type]: (state, action) => {
            state.error = action.payload;
            console.log('ошибка в получении данных (входящие сообщения отсутствуют)', state.error)

        },


    }
})

// ничего не менялось
export const { setMessage, deleteArrayMessages } = dialogSlice.actions;
export default dialogSlice.reducer