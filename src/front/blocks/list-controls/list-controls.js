import { PropTypes } from 'react';
import { connect } from 'react-redux';

import IconUp from 'react-icons/lib/fa/arrow-up';
import { fetchNextPage } from '../../store/actions';

import './list-controls.styl';

function ListControls({ fetchNextPage }) {
    return <div className='list-controls'>
        <button className='list-controls__button list-controls__button_color_blue'
            onClick={ () => window.scrollTo(0, 0) }>
            <IconUp />
            TOP
        </button>
        <button
            className='list-controls__button list-controls__button_color_green'
            onClick={ fetchNextPage }>
            MORE
        </button>
    </div>
}

ListControls.propTypes = {
    fetchNextPage: PropTypes.func.isRequired
};

export default connect(
    () => ({}),
    (dispatch) => ({
        fetchNextPage: () => dispatch(fetchNextPage())
    })
)(ListControls);
