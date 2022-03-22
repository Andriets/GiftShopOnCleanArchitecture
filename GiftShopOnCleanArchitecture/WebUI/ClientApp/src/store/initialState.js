'use strict';

const initialState = {
    login: {
        isLoginPending: false,
        isLoginSuccess: false,
        loginError: null
    },
    register: {
        isRegisterPending: false,
        isRegisterSuccess: false,
        registerError: null
    },
    user: {
        Id: null,
        Email: null,
        FirstName: null,
        LastName: null,
        Role: null,
        JwtToken: null
    },
    changePasswordModal: {
        isOpen: false,
        isChangingPasPenging: false,
        isChangingPasSuccess: false,
        changingPasError: null
    },
    boxes: {
        isPending: false,
        list: []
    },
    tags: {
        isPending: false,
        list: []
    },
    boxModal: {
        isOpen: false,
        editMode: false,
        initialValues: {},
        imagefile: {},
    },
    addBox: {
        isAddingPending: false,
        isAddingSuccess: false,
        addBoxError: null
    },
    editBox: {
        isEditingPending: false,
        isEditingSuccess: false,
        editBoxError: null
    }
};

export default initialState;