import { PropTypes } from 'react';

import ButtonFavorite from '../button-favorite/button-favorite';

import './camera.styl';

export default function Camera({ data }) {
    return <li className='camera'>
        <div className='camera__photo'>
            <img src={ `https://streaming.ivideon.com/preview/live?server=${data.server}&camera=${data.camera}` } />
        </div>
        <div className='camera__content'>
            <div className='camera__content-header'>
                <div className='camera__name'>
                    { data.camera_name }
                </div>
                <div className='camera__favorite'>
                    <ButtonFavorite isChecked={ false } onClick={ () => {} } />
                </div>
            </div>
            <div className='camera__content-footer'>
                Total views: { data.views }
            </div>
        </div>
    </li>
}

Camera.propTypes = {
    data: PropTypes.object.isRequired
};
