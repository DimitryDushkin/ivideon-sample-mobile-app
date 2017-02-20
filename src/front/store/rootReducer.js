import { combineReducers } from 'redux';

import {
    FETCH_PAGE_SUCCESS,
    SET_SELECTED_CAMERA_ID,
    UNSET_SELECTED_CAMERA_ID,
    ADD_FAVORITE_CAMERA_ID,
    REMOVE_FAVORITE_CAMERA_ID
} from './actions';

/**
 * @typedef {Object} Camera
 * @property {String} uid — id
 * @property {String} camera
 * @property {String} server
 * @property {String} link_text
 * @property {Number} views
 */

/**
 * @typedef {Object} Page
 * @property {String} id
 * @property {String} next_page_id
 * @property {Array<Camera>} cameras
 */

/**
 * @typedef {Object} StorePages
 * @property {Array<String>} result
 * @property {Object.<string, Page>} entities – key is id of page
 */

/** @type {StorePages} **/
const initialPages = {
    result: [],
    entities: {}
};

export default combineReducers({
    pages: (pages = initialPages, action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            return {
                result: pages.result.concat(action.payload.result),
                entities: Object.assign({}, pages.entities, action.payload.entities)
            };
        }

        return pages;
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
