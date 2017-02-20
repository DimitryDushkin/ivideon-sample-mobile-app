import { PropTypes } from 'react';

export default function List({ children }) {
    return <ul className='list'>{ children }</ul>
}

List.propTypes = {
    children: PropTypes.any
};
