import { Provider } from 'react-redux';
import { Todos } from './main/Todos';
import { persistedStore, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                <Todos />
            </PersistGate>
        </Provider>
    );
}

export default App;
