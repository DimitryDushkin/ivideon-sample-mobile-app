import axios from 'axios';
import { normalize } from 'normalizr';

import * as schema from './schema';

export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_ERROR = 'FETCH_PAGE_ERROR';
export const TOGGLE_SELECTED_CAMERA_ID = 'TOGGLE_SELECTED_CAMERA_ID';
export const TOGGLE_FAVORITE_CAMERA_ID = 'TOGGLE_FAVORITE_CAMERA_ID';

const API = 'https://api.ivideon.com/tv/cameras';

export const fetchPage = () => {
    return dispatch => {
        dispatch({ type: FETCH_PAGE_REQUEST });

        axios
            .get(`${API}?limit=10`)
            .then(
                handleSuccessResponse(dispatch),
                handleErrorResponse(dispatch)
            );
    }
}

export const fetchNextPage = () => {
    return (dispatch, getState) => {
        const { nextPageId } = getState();

        dispatch({ type: FETCH_PAGE_REQUEST });

        axios
            .get(`${API}?limit=10&seed=${nextPageId}`)
            .then(
                handleSuccessResponse(dispatch),
                handleErrorResponse(dispatch)
            );
    }
}

export const toggleFavorite = (camera) => {
    return { type: TOGGLE_FAVORITE_CAMERA_ID, payload: camera };
}

export const toggleSelected = (camera) => {
    return { type: TOGGLE_SELECTED_CAMERA_ID, payload: camera };
}

function handleSuccessResponse(dispatch) {
    return (res) => {
        const page = {
            id: res.data.response.seeds.this,
            next_page_id: res.data.response.seeds.next,
            cameras: res.data.response.cameras
        };

        dispatch({
            type: FETCH_PAGE_SUCCESS,
            payload: normalize(page, schema.page)
        });
    }
}

function handleErrorResponse(dispatch) {
    return (err) => {
        dispatch({ type: FETCH_PAGE_ERROR, payload: err })
    };
}
