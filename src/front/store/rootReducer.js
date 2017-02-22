import { combineReducers } from 'redux';
import union from 'lodash/union';

import {
    FETCH_PAGE_REQUEST,
    FETCH_PAGE_SUCCESS,
    FETCH_PAGE_ERROR,
    TOGGLE_SELECTED_CAMERA_ID,
    TOGGLE_FAVORITE_CAMERA_ID
} from './actions';
import { getFavoriteCamerasEntities, getFavoriteCamerasIds } from './localStoreFavoriteCameras';

/**
 * @typedef {Object} Page
 * @property {Camera[]} cameras
 * @property {String} id
 * @property {String} next_page_id
 */

/**
 * @typedef {Object} Camera
 * @property {String} uin — id
 * @property {String} camera
 * @property {String} server
 * @property {String} camera_name
 * @property {Number} views
 */

export default combineReducers({
    camerasIdsOnPage: (camerasIdsOnPage = [], action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            // for uniq items on page
            return union(camerasIdsOnPage, getPageFromPayload(action.payload).cameras);
        }

        return camerasIdsOnPage;
    },
    nextPageId: (nextPageId = '', action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            return getPageFromPayload(action.payload).next_page_id;
        }

        return nextPageId;
    },
    camerasById: (camerasById = getFavoriteCamerasEntities(), action) => {
        if (action.type === FETCH_PAGE_SUCCESS) {
            return Object.assign({}, camerasById, action.payload.entities.cameras);
        }

        return camerasById;
    },
    selectedCameraUin: (selectedCameraUin = '', action) => {
        if (action.type === TOGGLE_SELECTED_CAMERA_ID) {
            if (selectedCameraUin === action.payload.uin) {
                return '';
            } else {
                return action.payload.uin;
            }
        }
        return selectedCameraUin;
    },
    favoriteCamerasIds: (favoriteCamerasIds = getFavoriteCamerasIds(), action) => {
        if (action.type === TOGGLE_FAVORITE_CAMERA_ID) {
            if (favoriteCamerasIds.indexOf(action.payload.uin) > -1) {
                return favoriteCamerasIds.filter(id => id !== action.payload.uin)
            } else {
                return favoriteCamerasIds.concat(action.payload.uin);
            }
        }

        return favoriteCamerasIds;
    },
    isListLoading: (isListLoading = false, action) => {
        if (action.type === FETCH_PAGE_REQUEST) {
            return true;
        }

        return false;
    },
    listLoadingError: (listLoadingError = '', action) => {
        if (action.type === FETCH_PAGE_ERROR) {
            return action.payload;
        }

        return '';
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
