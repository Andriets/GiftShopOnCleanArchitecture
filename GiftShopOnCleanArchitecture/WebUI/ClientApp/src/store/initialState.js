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
    recomendation: {
        idPending: false,
        list: []
    },
    box: {
        isPending: false,
        box: {}
    },
    cart: {
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
    },
    tags: {
        isPending: false,
        list: []
    },
    catalogFiltersInfo: {
        currentPage: null,
        totalPages: null,
        minPrice: null,
        maxPrice: null,
        tags: []
    },
    tagModal: {
        isOpen: false,
        editMode: false,
        initialValues: {}
    },
    addTag: {
        isAddingPending: false,
        isAddingSuccess: false,
        addTagError: null
    },
    editTag: {
        isEditingPending: false,
        isEditingSuccess: false,
        editTagError: null
    },
};

export default initialState;