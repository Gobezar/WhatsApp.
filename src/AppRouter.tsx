import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from './hooks/reduxHooks';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';


export const AppRouter = () => {

  const { isAuth } = useAppSelector(state => state.loginSlice)

  return (
    <div>

      {isAuth ?
      <Routes>
          <Route
            path='/'
            element={<MainPage />} />
      </Routes> :
      <Routes>
          <Route
            path='login'
            element={<LoginPage />}
          />

          <Route
            element={<LoginPage />}
            path="*">
          </Route>
      </Routes>

      }



    </div >
  )
}
