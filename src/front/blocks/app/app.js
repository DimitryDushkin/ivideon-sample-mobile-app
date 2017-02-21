import { PropTypes } from 'react';
import { connect } from 'react-redux';
import once from 'lodash/once';
import 'reset-css/reset.css';

import List from '../list/list';
import Camera from '../camera/camera';
import ListControls from '../list-controls/list-controls';
import { fetchPage } from '../../store/actions';

import './app.styl';

const fetchFirstPageOnce = once((dispatch) => dispatch(fetchPage()));

function App({ camerasIdsOnPage, camerasById, isListLoading, fetchFirstPageOnce, listLoadingError, favoriteCamerasIds }) {
    fetchFirstPageOnce();   // executes only once, can be replaced by stateful component

    return <div className='app'>
        <List>
            {
                favoriteCamerasIds.map(cameraId => <Camera key={ cameraId } data={ camerasById[cameraId] } />)
            }
            {
                camerasIdsOnPage.map(cameraId => {
                    if (favoriteCamerasIds.indexOf(cameraId) === -1) {
                        return <Camera key={ cameraId } data={ camerasById[cameraId] } />;
                    } else {
                        return null;
                    }
                })
            }
        </List>
        {
            isListLoading &&
                <div className='app__loader'>Loading...</div>
        }
        {
            listLoadingError &&
                <div className='app__error'>Loading error: { listLoadingError.toString() }</div>
        }
        {
            !isListLoading && !listLoadingError &&
                <ListControls />
        }
    </div>
}

App.propTypes = {
    camerasIdsOnPage: PropTypes.array.isRequired,
    camerasById: PropTypes.object.isRequired,
    fetchFirstPageOnce: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listLoadingError: PropTypes.string.isRequired
};

export default connect(
    (state) => ({
        camerasIdsOnPage: state.camerasIdsOnPage,
        camerasById: state.camerasById,
        isListLoading: state.isListLoading,
        listLoadingError: state.listLoadingError,
        favoriteCamerasIds: state.favoriteCamerasIds
    }),
    (dispatch) => ({
        fetchFirstPageOnce: () => fetchFirstPageOnce(dispatch)
    })
)(App);
