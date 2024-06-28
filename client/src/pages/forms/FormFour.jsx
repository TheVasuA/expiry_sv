import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ENDPOINT ="http://localhost:3000/submit"

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Vehicle Number is required'),
  lastName: Yup.string().required('Owner Name is required'),
  gender: Yup.string().required('Permit is required'),
 
 
});
// username: Yup.string().required('Username is required'),
// password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
const FormFour = () => {
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
        gender: ''


      }}
    //   email: '',
    //   phoneNumber: '',
    //   dateOfBirth: '',
    //   address: '',
    //   city: '',
    //   state: '',
    //   zipCode: '',
    //   country: ''
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6">Four Wheeler Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle Number</label>
            <Field name="firstName" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Owner Name</label>
            <Field name="lastName" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kerala Permit</label>
            <Field as="select" name="gender" className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="">Select</option>
              <option value="male">Yes</option>
              <option value="female">No</option>
        
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <Field name="email" type="email" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <Field name="phoneNumber" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expiry Date</label>
            <Field name="dateOfBirth" type="date" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <Field name="address" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <Field name="city" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <Field name="state" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Zip Code</label>
            <Field name="zipCode" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <Field name="country" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
          </div> */}

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

export default FormFour