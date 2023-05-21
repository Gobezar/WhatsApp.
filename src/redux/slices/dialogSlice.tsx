import { createSlice } from '@reduxjs/toolkit'
import { IDialogProps } from '../../models'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



const idInstance: string | null = localStorage.getItem('idInstance')
const apiTokenInstance: string | null = localStorage.getItem('apiTokenInstance')



const initialState: IDialogProps = {
    isLoading: false,
    error: '',
    message: {
        isMy: true,
        textMessage: '',
        idMessage: ''
    },
    arrayMessages: [],
    receiptId: 0,
}


export const sendMessage = createAsyncThunk('dialog/sendMessage', async ({ textMessage, chatId }: { textMessage: string, chatId: string },) => {
    const message = textMessage
    const response = await axios.post(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
        chatId: `${chatId}@c.us`,
        message
    })
    const result = response.data
    return result
})


export const AcceptMessage = createAsyncThunk('dialog/AcceptMessage', async ({ number }: { number: string }) => {
    const response = await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
    const data = response.data; // Получение данных из ответа сервера
    const message = data.body.messageData?.textMessageData?.textMessage || data.body.messageData?.extendedTextMessageData?.text
    // const message = data.body.messageData.textMessageData.textMessage
    //     // message = data.body.messageData.extendedTextMessageData.text
    const receiptId = data.receiptId
    const idMessage = data.body.idMessage
    return { message, receiptId, idMessage, number: `${number}@c.us`, senderId: data.body.senderData.sender }; // Возврат receiptId как результата createAsyncThunk
})


export const deleteMessage = createAsyncThunk('dialog/deleteMessage', async (receiptId: number) => {
    const response = await axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
    const result = response.data
    return result
})

// export const acceptMessage = createAsyncThunk('dialog/acceptMessage', async () => {
//     const response = await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
//     const data = response.data; // Получение данных из ответа сервера
//     const responseMessage = data.body.messageData.extendedTextMessageData.textMessage
//     const receiptId = data.receiptId; // Извлечение receiptId из данных
//     deleteMessage(receiptId)
//     return responseMessage; // Возврат receiptId как результата createAsyncThunk
// })

// export const deleteMessage = createAsyncThunk('dialog/deleteMessage', async (args: { receiptId: number }) => {
//     const { receiptId } = args;
//     const result = await axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`);
//     return result;
//   });

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message.textMessage = action.payload
        },
        deleteArrayMessages (state) {
            state.arrayMessages = []
        }

    },
    extraReducers: {
        [sendMessage.fulfilled.type]: (state, action) => {
            state.error = '';
            state.message = {
                isMy: true,
                textMessage: state.message.textMessage,
                idMessage: action.payload.idMessage
            }
            state.arrayMessages.push(state.message)
            state.message = {
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
        },

        [AcceptMessage.fulfilled.type]: (state, action) => {
            if (state.receiptId !== action.payload.receiptId && state.message.idMessage !== action.payload.idMessage) state.arrayMessages.push(action.payload.message)
            state.receiptId = action.payload.receiptId
        },
        [AcceptMessage.pending.type]: (state) => {
        },
        [AcceptMessage.rejected.type]: (state, action) => {
            state.error = action.payload;
            console.log('ошибка', state.error)

        },


    }
})

export const { setMessage, deleteArrayMessages } = dialogSlice.actions;
export default dialogSlice.reducer