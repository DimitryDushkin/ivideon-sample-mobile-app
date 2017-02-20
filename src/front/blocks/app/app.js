import { PropTypes } from 'react';
import { connect } from 'react-redux';
import once from 'lodash/once';

import List from '../list/list';
import Camera from '../camera/camera';
import { fetchPage } from '../../store/actions';

const fetchFirstPage = once((dispatch) => dispatch(fetchPage()));

function App({ pages, fetchFirstPage }) {
    const entities = pages.entities;

    fetchFirstPage();

    return <div className='app'>
        {
            pages.result.map(pageId =>
                <List>
                    {
                        entities
                            .pages[pageId]
                            .cameras
                            .map(cameraId => <Camera data={ entities.cameras[cameraId] } />)
                    }
                </List>
            )
        }
    </div>
}

App.propTypes = {
    pages: PropTypes.array,
    fetchFirstPage: PropTypes.func.isRequired
};

export default connect(
    (state) => ({
        pages: state.pages
    }),
    (dispatch) => ({
        fetchFirstPage: () => fetchFirstPage(dispatch)
    })
)(App);
