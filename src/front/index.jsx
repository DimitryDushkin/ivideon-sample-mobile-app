import 'core-js/es6/symbol';        // for IE11 production and dev builds
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './blocks/root/root.jsx';

render(<AppContainer><Root /></AppContainer>, document.querySelector('.app-container'));

if (module.hot) {
    module.hot.accept(Root, () => {
        render(<AppContainer><Root /></AppContainer>, document.querySelector('.app-container'));
    });
}
