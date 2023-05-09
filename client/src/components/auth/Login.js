import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

const Login = () => {
    const [show, setShow] = useState(false);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const handleLogin = () =>{
        const userLogin = {email,password}
        dispatch(loginUser(userLogin))
        setEmail("")
        setPassword("")
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Login
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email Address" name = "email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name = "password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() =>{handleLogin();handleClose()}} >Login</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login