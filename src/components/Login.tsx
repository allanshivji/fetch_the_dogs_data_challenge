import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

import { login } from '../services/api';
import { FormErrors } from '../ts_types';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
    // Clear submit error when user makes any change
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await login(formData.name, formData.email);

      if (success) {
        navigate('/search');
      } else {
        setSubmitError(
          'Failed to authenticate. Please check your credentials.'
        );
      }
    } catch (err) {
      setSubmitError(
        'An error occurred while logging in. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Login to Find Your Dog</h2>
      {submitError && <Alert color="danger">{submitError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            invalid={!!errors.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <div className="text-danger small mt-1">{errors.name}</div>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            invalid={!!errors.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <div className="text-danger small mt-1">{errors.email}</div>
          )}
        </FormGroup>
        <Button color="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
