import React from 'react'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { deleteContact, getcontact } from '../redux/actions/contactActions';
import { Link } from 'react-router-dom';
import { toggleTrue } from '../redux/actions/editActions';

const Contact = ({contact}) => {
  const dispatch = useDispatch()
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{width : '50%',margin : '0 auto'}} src="https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png" />
      <Card.Body>
        <Card.Title>{contact.name}</Card.Title>
        <Card.Text>{contact.email}</Card.Text>
        <Card.Text>{contact.phone}</Card.Text>
        <Link to = {`/edit/${contact._id}`} >
        <Button variant="success" onClick={() =>{dispatch(getcontact(contact._id));dispatch(toggleTrue())}} >Edit</Button>
        </Link>
        <Button variant="danger" onClick={() =>{dispatch(deleteContact(contact._id))}} >Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default Contact