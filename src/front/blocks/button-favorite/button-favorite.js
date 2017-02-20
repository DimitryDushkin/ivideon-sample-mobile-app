import { PropTypes } from 'react';
import StarEmpty from 'react-icons/lib/fa/star-o';
import Star from 'react-icons/lib/fa/star';
import cn from 'classnames';

import './button-favorite.styl';

export default function ButtonFavorite({ isChecked = false, onClick }) {
    return <div
        className={ cn('button-favorite', { 'button-favorite_checked': isChecked })}
        onClick={ onClick }>
        {
            isChecked
                ? <Star />
                : <StarEmpty />
        }
    </div>;
}

ButtonFavorite.propTypes = {
    isChecked: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};
