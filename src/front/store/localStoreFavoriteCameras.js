const STORAGE_KEY = 'favoriteCameras';

/**
 *
 * @return {Array}
 */
export const getFavoriteCamerasIds = () => {
    const cameras = localStorage.getItem(STORAGE_KEY);
    return cameras ? JSON.parse(cameras).map(camera => camera.uin) : [];
}

/**
 *
 * @return {Object}
 */
export const getFavoriteCamerasEntities = () => {
    const cameras = localStorage.getItem(STORAGE_KEY);
    var entities = {};

    if (cameras) {
        JSON.parse(cameras).forEach(camera => {
            entities[camera.uin] = camera;
        });
    }

    return cameras ? entities : [];
}

/**
 *
 * @param {Array} cameras
 */
export const saveFavoriteCameras = (cameras) => {
    if (Array.isArray(cameras)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cameras));
    }
}

export const saveFavoriteCamerasMiddleware = store => next => action => {
    next(action);
    const { favoriteCamerasIds, camerasById } = store.getState();
    saveFavoriteCameras(favoriteCamerasIds.map(cameraId => camerasById[cameraId]));
}
