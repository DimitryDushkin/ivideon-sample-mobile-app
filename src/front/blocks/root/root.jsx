import { Provider } from 'react-redux'

import setupStore from '../../store/setupStore';
import './root.styl';

const isBrowser = typeof window !== 'undefined';

export default function Root({ store }) {
    const initedStore = isBrowser ? setupStore(window.appState) : store;

    return <Provider store={ initedStore }>
        <div className='root'>Root compoentn</div>
    </Provider>;
}
