import React,{useRef,useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link} from 'react-router-dom'
function Signup() {
    const emailRef = useRef();
    const passwordRef=useRef();
    const passwordConfirmRef = useRef();
    const [err,setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const {signup} = useAuth()
    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setErr('Passwords do not match')
        }

        try{
            setErr('');
            setLoading(true);
            await signup(emailRef.current.value,passwordRef.current.value);
        }catch{
            setErr('Failed to create an Account')
        }
        setLoading(false);
    }
    return (
        <>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
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
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
            </div>
            </Container>
        </>
    )
}

export default Signup
