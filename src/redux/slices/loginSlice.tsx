import { createSlice } from '@reduxjs/toolkit'
import { ILoginProps } from '../../models'


const initialState: ILoginProps = {
   isAuth: false,
   idInstance:'',
   apiTokenInstance:'', 
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      logIn (state, action) {
        state.isAuth = true
        localStorage.setItem('auth', 'true')
      },
      setIdInstance (state, action) {
        state.idInstance = action.payload
        localStorage.setItem('idInstance', state.idInstance)
      }, 
      setApiTokenInstance (state, action) {
        state.apiTokenInstance = action.payload
        localStorage.setItem('apiTokenInstance', state.apiTokenInstance)
      }, 
      logOut (state) {
        state.isAuth = false
        localStorage.setItem('auth', '')
        localStorage.removeItem('idInstance')
        localStorage.removeItem('apiTokenInstance')
      }, 
      setLocalStorage (state) {
        localStorage.setItem('idInstance', state.idInstance)
        localStorage.setItem('apiTokenInstance', state.apiTokenInstance)
      }
    }
})

export const { logIn, logOut, setIdInstance, setApiTokenInstance, setLocalStorage } = loginSlice.actions;
export default loginSlice.reducer