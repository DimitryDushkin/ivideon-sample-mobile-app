import { PropTypes } from 'react';

import './camera.styl';

export default function Camera({ data }) {
    return <li className='camera'>
        <div className='camera__photo'>
            <img src={ `https://streaming.ivideon.com/preview/live?server=${data.server}&camera=${data.camera}` } />
        </div>
        <div className='camera__content'>
            { data.camera_name }
        </div>
    </li>
}

Camera.propTypes = {
    data: PropTypes.object
};
