import { PropTypes } from 'react';
import { connect } from 'react-redux';
import once from 'lodash/once';
import 'reset-css/reset.css';

import List from '../list/list';
import Camera from '../camera/camera';
import { fetchPage } from '../../store/actions';

import './app.styl';

const fetchFirstPageOnce = once((dispatch) => dispatch(fetchPage()));

function App({ camerasIdsList, camerasById, fetchFirstPageOnce }) {
    fetchFirstPageOnce();   // executes only once, can be replaced by stateful component

    return <div className='app'>
        <List>
            {
                camerasIdsList.map(cameraId => <Camera key={ cameraId } data={ camerasById[cameraId] } />)
            }
        </List>
    </div>
}

App.propTypes = {
    camerasIdsList: PropTypes.array.isRequired,
    camerasById: PropTypes.object.isRequired,
    fetchFirstPageOnce: PropTypes.func.isRequired
};

export default connect(
    (state) => ({
        camerasIdsList: state.camerasIdsList,
        camerasById: state.camerasById
    }),
    (dispatch) => ({
        fetchFirstPageOnce: () => fetchFirstPageOnce(dispatch)
    })
)(App);
