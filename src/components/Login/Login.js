import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API_URLS from '../../apiConfigs';


const Login = ({ handleSetLoggedIn }) => {
  const initialFormData = {
    email: '',
    password: '',
  };
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };
  const _handleLogin = async (event) => {
    event.preventDefault();
    try {
      const API_ENDPOINT = API_URLS + 'token/login/';
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      handleSetLoggedIn(data.auth.token);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2 className='log'>Log in</h2>
      <Form onSubmit={_handleLogin} style={{ width: "30rem" }} className='submit'>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            autoFocus
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' className='btn'>Login</Button>
      </Form>
      
    </div>
  );
};

export default Login;