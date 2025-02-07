import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { login } from '../services/api';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const success = await login(name, email);
      if (success) {
        navigate('/search');
      } else {
        setError('Failed to authenticate');
      }
    } catch (err) {
      setError('Error occurred while logging in');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Login to Find Your Dog</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;