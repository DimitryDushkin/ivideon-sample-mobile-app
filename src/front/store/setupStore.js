import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer.js';

/**
 *
 * @param {Object} initialState
 * @returns {Store}
 */
export default function setupStore(initialState) {
    const isBrowser = typeof window !== 'undefined',
        chromeReduxExtension = (isBrowser && window.devToolsExtension)
            ? window.devToolsExtension()
            : f => f,
        store = createStore(
            rootReducer,
            initialState,
            compose(        // middlewares
                applyMiddleware(thunkMiddleware),
                chromeReduxExtension
            )
        );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./rootReducer', () => {
            store.replaceReducer(require('./rootReducer').default);
        });
    }

    return store;
}
