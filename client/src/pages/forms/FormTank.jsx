import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ENDPOINT ="http://localhost:3000/submit"

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Company Name is required'),
  lastName: Yup.string().required('Tank Capacity is required'),
  dateOfBirth: Yup.date().required('Expiry Date is required'),
  
});
// username: Yup.string().required('Username is required'),
// password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
const FormTank = () => {
  const handleSubmit = (values, { setSubmitting,resetForm }) => {

    console.log(values)
    axios.post(ENDPOINT, values)
      .then(response => {
        alert('Form submitted successfully');
        setSubmitting(false);
        resetForm();
      })
      .catch(error => {

        alert('Data submitted, Server Failed');
        setSubmitting(false);
        resetForm();
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-5 text-xl">
 <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''

      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6">Peso Tank Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <Field name="firstName" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tank Capacity</label>
            <Field name="lastName" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
          </div>
        
          <div className="mb-4">
            <label className="block text-gray-700">Licence Expiry Date</label>
            <Field name="dateOfBirth" type="date" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
          </div>
          

          <div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 text-white p-2 rounded">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default FormTank