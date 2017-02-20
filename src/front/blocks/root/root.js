import { Provider } from 'react-redux'

import App from '../app/app';
import setupStore from '../../store/setupStore';

const isBrowser = typeof window !== 'undefined';

export default function Root({ store }) {
    const initedStore = isBrowser ? setupStore(window.appState) : store;

    return <Provider store={ initedStore }><App /></Provider>;
}
