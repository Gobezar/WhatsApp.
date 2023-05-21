import { createSlice } from '@reduxjs/toolkit'
import { IContactsProps, ISubscriber } from '../../models'



const initialState: IContactsProps = {
   arraySubscribers: [],
   subscriber: {
        number: '',
        name: '',
    }, 
    currentSubscriber: {},
}


const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setNumber (state, action) {
            state.subscriber.number = action.payload;
        },
        setName (state, action) {
            state.subscriber.name = action.payload;
        },
        createSubscriber (state) {
            state.arraySubscribers.push(state.subscriber)
        },
        resetValue (state) {
            state.subscriber.number = '';
            state.subscriber.name = '';
        },
        setCurrentSubscriber (state, action) {
            state.currentSubscriber = action.payload;
        }, 
        deleteSubscriber (state, action) {
            state.arraySubscribers = state.arraySubscribers.filter((obj)=> obj.number !== action.payload)
        }
    }
})

export const { setNumber, setName, createSubscriber, resetValue, setCurrentSubscriber, deleteSubscriber } = contactsSlice.actions;
export default contactsSlice.reducer