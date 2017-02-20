import axios from 'axios';
import { normalize } from 'normalizr';

import * as schema from './schema';

export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_ERROR = 'FETCH_PAGE_ERROR';
export const SET_SELECTED_CAMERA_ID = 'SET_SELECTED_CAMERA_ID';
export const UNSET_SELECTED_CAMERA_ID = 'UNSET_SELECTED_CAMERA_ID';
export const ADD_FAVORITE_CAMERA_ID = 'ADD_FAVORITE_CAMERA_ID';
export const REMOVE_FAVORITE_CAMERA_ID = 'REMOVE_FAVORITE_CAMERA_ID';

export const fetchPage = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PAGE_REQUEST });

        axios
            .get(`http://api.ivideon.com/tv/cameras?limit=10${ id ? '&seed=' + id : '' }`)
            .then(
                res => {
                    const page = {
                        id: res.data.response.seeds.this,
                        next_page_id: res.data.response.seeds.next,
                        cameras: res.data.response.cameras
                    };

                    dispatch({
                        type: FETCH_PAGE_SUCCESS,
                        payload: normalize(page, schema.page)
                    })
                },
                err => dispatch({ type: FETCH_PAGE_ERROR, payload: err })
            );
    }
}
