import { PropTypes } from 'react';
import { connect } from 'react-redux';
import truncate from 'lodash/truncate';
import cn from 'classnames';
import IconClose from 'react-icons/lib/fa/close';

import ButtonFavorite from '../button-favorite/button-favorite';
import { toggleFavorite, toggleSelected } from '../../store/actions';

import './camera.styl';

function Camera({ data, favoriteCamerasIds, selectedCameraUin, toggleFavorite, toggleSelected }) {
    const isSelected = data.uin === selectedCameraUin;

    return <li className={ cn('camera', { 'camera_selected': isSelected } )}>
        <div className='camera__photo'>
            <div
                className="camera__photo-img"
                style={{ backgroundImage: `url(https://streaming.ivideon.com/preview/live?server=${data.server}&camera=${data.camera})`}}
                onClick={ () => { !isSelected && toggleSelected(data) } }></div>
            {
                isSelected &&
                    <div
                        className='camera__close'
                        onClick={ () => { toggleSelected(data) } }>
                        <IconClose />
                    </div>
            }
        </div>
        <div className='camera__content'>
            <div className='camera__content-header'>
                <div
                    className='camera__name'
                    onClick={ () => { !isSelected && toggleSelected(data) } }>
                    { truncate(data.camera_name, { length : isSelected ? 60 : 30 }) }
                </div>
                <div className='camera__favorite'>
                    <ButtonFavorite isChecked={ favoriteCamerasIds.indexOf(data.uin) > -1 } onClick={ () => { toggleFavorite(data) } } />
                </div>
            </div>
            <div className='camera__content-footer'>
                Total views: { data.views }
            </div>
        </div>
    </li>
}

Camera.propTypes = {
    data: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
    favoriteCamerasIds: PropTypes.array.isRequired
};

export default connect(
    (state) => ({
        favoriteCamerasIds: state.favoriteCamerasIds,
        selectedCameraUin: state.selectedCameraUin
    }),
    (dispatch) => ({
        toggleFavorite: (camera) => dispatch(toggleFavorite(camera)),
        toggleSelected: (camera) => dispatch(toggleSelected(camera))
    })
)(Camera);
