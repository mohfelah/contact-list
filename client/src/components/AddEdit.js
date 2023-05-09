import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { editContact, postContact } from '../redux/actions/contactActions';


const AddEdit = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({name : "",email : "",phone : ""});

  const userReducer = useSelector(state => state.contactReducer.user)
  console.log(userReducer);
  const edit = useSelector(state => state.editReducer.edit)
  console.log(edit);

 
  useEffect(()=>{
    edit ? setUser(userReducer) : setUser({name : "",email : "",phone : ""})
  },[userReducer,edit])


  const handleChange = (e) =>{
    e.preventDefault();
    setUser({...user,[e.target.name] : e.target.value})
  }

  const handleContact = () =>{
    if(!edit){
      dispatch(postContact(user))
    }else{
      dispatch(editContact(userReducer._id,user))
    }
  }
  return (
    <Form>
    <Form.Group className="mb-3">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" value={user.name} name="name" onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={user.email} name="email" onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Phone number</Form.Label>
      <Form.Control type="text" placeholder="Enter phone number"  value={user.phone} name="phone" onChange={handleChange} />
    </Form.Group>
    <Link to = "/contact_list">
    <Button variant="primary" type="submit" onClick={handleContact} >Save</Button>
    </Link>
  </Form>
  )
}

export default AddEdit