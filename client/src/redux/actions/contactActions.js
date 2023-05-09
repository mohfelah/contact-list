import axios from "axios"
import { GET_CONTACT, GET_CONTACT_FAIL, GET_CONTACT_LOAD, GET_CONTACT_SUCCESS } from "../actionTypes/actionTypes"


export const getContacts = () => async (dispatch) =>{
    dispatch({type : GET_CONTACT_LOAD})
    try {
        let result = await axios.get("/api/contact")
        console.log(result);
        dispatch({type : GET_CONTACT_SUCCESS, payload : result.data.response})
    } catch (error) {
        dispatch({type : GET_CONTACT_FAIL, payload : error})
        console.log(error);
    }
}

export const postContact = (user) =>async(dispatch) =>{
    try {
        await axios.post("/api/contact/user", user)
        dispatch(getContacts())
    } catch (error) {
        console.log(error);
    }
}

export const deleteContact = (id) =>async(dispatch) =>{
    try {
        await axios.delete(`/api/contact/${id}`)
        dispatch(getContacts())
    } catch (error) {
        console.log(error);
    }
}

export const getcontact = (id) => async (dispatch) =>{
    axios.get(`/api/contact/${id}`)
    .then((res) => dispatch({type : GET_CONTACT, payload : res.data.response}))
    .catch((err) => console.log(err))
}

export const editContact = (id, user) => async(dispatch) =>{
    try {
        await axios.put(`/api/contact/${id}`, user)
        dispatch(getContacts())
    } catch (error) {
        console.log(error);
    }
}