import React, { useRef, useState } from 'react'
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setErr('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            setErr('Failed to Login')
        }
        setLoading(false);
    }
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            {err && <Alert variant='danger'>{err}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} type="submit" className="w-100">Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Don't have an account? <Link to='/signup'>Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login
