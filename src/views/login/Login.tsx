import { useState, FormEvent, ChangeEvent } from 'react';
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

import { API } from '../../services/api.service';
import { FormErrors } from '../../ts_types';
import { EMAIL_REGEX } from '../../constants/general.constants';
import IntlMessages from '../../components/common/IntlMessages';

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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      const success = await API.LOGIN({
        name: formData.name,
        email: formData.email
      });

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
      <h2 className="my-4">
        <IntlMessages id="login.title" />
      </h2>
      {submitError && <Alert color="danger">{submitError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">
            <IntlMessages id="login.label-name-field" />
          </Label>
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
          <Label for="email">
            <IntlMessages id="login.label-email-field" />
          </Label>
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
          {isSubmitting ? (
            <IntlMessages id="button.is-logging-in" />
          ) : (
            <IntlMessages id="button.login" />
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
