import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Card,
  CardBody,
  Row,
  Col
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

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

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
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
      console.log('success', success);

      if (success.data === 'OK' || success.status === 200) {
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
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center bg-light py-5"
    >
      <Row className="justify-content-center w-100 mx-0">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-sm">
            <CardBody className="p-4">
              <h2 className="text-center mb-4">
                <IntlMessages id="login.title" />
              </h2>

              {submitError && (
                <Alert color="danger" className="mb-4">
                  {submitError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <Label for="name" className="fw-bold">
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
                    className="form-control-lg"
                  />
                  {errors.name && (
                    <div className="text-danger small mt-1">{errors.name}</div>
                  )}
                </FormGroup>

                <FormGroup className="mb-4">
                  <Label for="email" className="fw-bold">
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
                    className="form-control-lg"
                  />
                  {errors.email && (
                    <div className="text-danger small mt-1">{errors.email}</div>
                  )}
                </FormGroup>

                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100 btn-lg"
                >
                  {isSubmitting ? (
                    <IntlMessages id="button.is-logging-in" />
                  ) : (
                    <IntlMessages id="button.login" />
                  )}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
