import { combineReducers } from 'redux';

import {
    FETCH_PAGE_SUCCESS,
    SET_SELECTED_CAMERA_ID,
    UNSET_SELECTED_CAMERA_ID,
    ADD_FAVORITE_CAMERA_ID,
    REMOVE_FAVORITE_CAMERA_ID
} from './actions';

/**
 * @typedef {Object} Page
 * @property {Camera[]} cameras
 * @property {String} id
 * @property {String} next_page_id
 */

/**
 * @typedef {Object} Camera
 * @property {String} uid — id
 * @property {String} camera
 * @property {String} server
 * @property {String} camera_name
 * @property {Number} views
 */

export default combineReducers({
    camerasIdsList: (camerasIdsList = [], action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            return camerasIdsList.concat(getPageFromPayload(action.payload).cameras);
        }

        return camerasIdsList;
    },
    nextPageId: (nextPageId = '', action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            return getPageFromPayload(action.payload).next_page_id;
        }

        return nextPageId;
    },
    camerasById: (camerasById = {}, action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            return Object.assign({}, camerasById, action.payload.entities.cameras);
        }

        return camerasById;
    },
    selectedCameraId: (selectedCameraId = '', action) => {
        if (action.type === SET_SELECTED_CAMERA_ID) {
            return action.payload;
        }

        if (action.type === UNSET_SELECTED_CAMERA_ID) {
            return '';
        }

        return selectedCameraId;
    },
    favoriteCamerasIds: (favoriteCamerasIds = [], action) => {
        if (action.type === ADD_FAVORITE_CAMERA_ID) {
            return favoriteCamerasIds.concat(action.payload);
        }

        if (action.type === REMOVE_FAVORITE_CAMERA_ID) {
            return favoriteCamerasIds.filter(id => id !== action.payload);
        }

        return favoriteCamerasIds;
    }
});

/**
 *
 * @param {Object} payload
 * @return {Page}
 */
function getPageFromPayload(payload) {
    return payload.entities.pages[payload.result];
}
