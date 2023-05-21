import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginSlice from './slices/loginSlice'
import contactsSlice from './slices/contactsSlice'
import dialogSlice from './slices/dialogSlice'

const rootReducer = combineReducers({
    loginSlice, 
    contactsSlice,
    dialogSlice, 
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']