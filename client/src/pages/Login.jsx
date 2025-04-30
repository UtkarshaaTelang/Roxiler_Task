
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await login(values.email, values.password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Redirect based on role
        if (data.role === 'admin') navigate('/admin');
        else if (data.role === 'store_owner') navigate('/storeowner');
        else navigate('/user');
      } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" {...formik.getFieldProps('email')} />
      {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

      <input type="password" name="password" placeholder="Password" {...formik.getFieldProps('password')} />
      {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
