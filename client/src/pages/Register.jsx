
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      password: '',
      role: 'normal', // 👈 add this line
    },
    validationSchema: Yup.object({
      name: Yup.string().min(20).max(60).required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().max(400).required('Required'),
      password: Yup.string()
        .min(8)
        .max(16)
        .matches(/[A-Z]/, 'Must include an uppercase letter')
        .matches(/[!@#$%^&*]/, 'Must include a special character')
        .required('Required'),
        role: Yup.string()
        .oneOf(['normal', 'admin', 'store_owner'], 'Invalid role')
        .required('Required'),
      
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
        alert('Registered successfully!');
        navigate('/login');
      } catch (err) {
        alert(err.response.data.message || 'Registration failed');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" {...formik.getFieldProps('name')} />
      {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}

      <input name="email" placeholder="Email" {...formik.getFieldProps('email')} />
      {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

      <input name="address" placeholder="Address" {...formik.getFieldProps('address')} />
      {formik.touched.address && formik.errors.address && <div>{formik.errors.address}</div>}

      <input type="password" name="password" placeholder="Password" {...formik.getFieldProps('password')} />
      {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}

      <select name="role" {...formik.getFieldProps('role')}>
  <option value="normal">Normal User</option>
  <option value="admin">Admin</option>
  <option value="store_owner">Store Owner</option>
</select>
{formik.touched.role && formik.errors.role && <div>{formik.errors.role}</div>}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
