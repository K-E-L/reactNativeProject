import {
    GET_NAV_USER_STACK,
    POP_NAV_MOJI,
    POP_NAV_USER,
    POP_NAV_USER_CONVO_TAB,
    PUSH_NAV_MOJI,
    PUSH_NAV_USER,
    PUSH_NAV_USER_CONVO_TAB,
    PUSH_NAV_USER_MOJI_TAB,
    PUSH_NAV_MOJI_USER_TAB,
    POP_NAV_MOJI_USER_TAB,
    POP_NAV_USER_MOJI_TAB,
    SELEC_IMAGE,
    SET_COMMENT_ID,
    SET_CONVO_ID,
    SET_CONVO_TYPE,
    SET_IMAGES,
    SET_IMAGE_NAME_BODY,
    SET_MESSAGE_MOJIS_ARRAY,
    SET_MOJI_ID,
    SET_MOJI_KEYBOARD_TYPE,
    SET_MOJI_PREVIEW_TYPE,
    SET_MOJI_TYPE,
    TOGGLE_MOJI_PREVIEW,
    TOGGLE_IMAGE_PRIVATE,
    TOGGLE_MOJI_KEYBOARD
} from '../types';

export const pushNavUser = (id) => dispatch => {
    dispatch({
        type: PUSH_NAV_USER,
        payload: id
    });
};

export const popNavUser = () => dispatch => {
    dispatch({
        type: POP_NAV_USER,
        payload: 0
    });
};

export const pushNavUserConvoTab = (id) => dispatch => {
    dispatch({
        type: PUSH_NAV_USER_CONVO_TAB,
        payload: id
    });
};

export const popNavUserConvoTab = () => dispatch => {
    dispatch({
        type: POP_NAV_USER_CONVO_TAB,
        payload: 0
    });
};

export const pushNavUserMojiTab = (id) => dispatch => {
    dispatch({
        type: PUSH_NAV_USER_MOJI_TAB,
        payload: id
    });
};

export const popNavUserMojiTab = () => dispatch => {
    dispatch({
        type: POP_NAV_USER_MOJI_TAB,
        payload: 0
    });
};

export const pushNavMoji = (id) => dispatch => {
    dispatch({
        type: PUSH_NAV_MOJI,
        payload: id
    });
};

export const popNavMoji = () => dispatch => {
    dispatch({
        type: POP_NAV_MOJI,
        payload: 0
    });
};

export const pushNavMojiUserTab = (id) => dispatch => {
    dispatch({
        type: PUSH_NAV_MOJI_USER_TAB,
        payload: id
    });
};

export const popNavMojiUserTab = () => dispatch => {
    dispatch({
        type: POP_NAV_MOJI_USER_TAB,
        payload: 0
    });
};

export const getNavUserStack = () => dispatch => {
    dispatch({
        type: GET_NAV_USER_STACK,
        payload: 0
    });
};

export const setConvoID = (id) => dispatch => {
    dispatch({
        type: SET_CONVO_ID,
        payload: id
    });
};

export const setConvoType = (type) => dispatch => {
    dispatch({
        type: SET_CONVO_TYPE,
        payload: type
    });
};

export const setMojiID = (id) => dispatch => {
    dispatch({
        type: SET_MOJI_ID,
        payload: id
    });
};

export const setMojiType = (type) => dispatch => {
    dispatch({
        type: SET_MOJI_TYPE,
        payload: type
    });
};

export const setCommentID = (id) => dispatch => {
    dispatch({
        type: SET_COMMENT_ID,
        payload: id
    });
};

export const toggleMojiKeyboard = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_MOJI_KEYBOARD,
        payload: toggle
    });
};

export const setMojiKeyboardType = (type) => dispatch => {
    dispatch({
        type: SET_MOJI_KEYBOARD_TYPE,
        payload: type
    });
};

export const toggleMojiPreview = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_MOJI_PREVIEW,
        payload: toggle
    });
};

export const setMojiPreviewType = (type) => dispatch => {
    dispatch({
        type: SET_MOJI_PREVIEW_TYPE,
        payload: type
    });
};

export const setImages = (images) => dispatch => {
    dispatch({
        type: SET_IMAGES,
        payload: images
    });
};

export const selecImage = (image) => dispatch => {
    dispatch({
        type: SELEC_IMAGE,
        payload: image
    });
};

export const setImageNameBody = (body) => dispatch => {
    dispatch({
        type: SET_IMAGE_NAME_BODY,
        payload: body
    });
};

export const toggleImagePrivate = () => dispatch => {
    dispatch({
        type: TOGGLE_IMAGE_PRIVATE,
        payload: null
    });
};
