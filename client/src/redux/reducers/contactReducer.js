import { GET_CONTACT, GET_CONTACT_FAIL, GET_CONTACT_LOAD, GET_CONTACT_SUCCESS } from "../actionTypes/actionTypes"


const initialState = {
    contacts : [],
    user : {},
    loadContacts : false,
    errors : []
}

export const contactReducer = (state = initialState,{type,payload}) =>{
    switch (type) {
        case GET_CONTACT_LOAD:
            return {...state, loadContacts : true}
        case GET_CONTACT_SUCCESS:
            return {...state, loadContacts : false, contacts : payload}
        case GET_CONTACT_FAIL:
            return {...state, loadContacts : false, errors : payload}
        case GET_CONTACT:
            return {...state, user : payload}
           
        default:
            return state
    }
}