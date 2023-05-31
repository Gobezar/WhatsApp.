import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './AppRouter';
import {setupStore} from './redux/store'



function App() {

  const store = setupStore()
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
          <AppRouter />
          </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
