import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// const ENDPOINT ="http://localhost:4000/data/pesotank"
const ENDPOINT ="https://chartap.com/api/pesotank"

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  capacity: Yup.string().required('Capacity is required'),
  tankNo: Yup.string().required('Tank No is required'),
  licDate: Yup.date().required('Licence Date is required'),
  rule19Date: Yup.date().required('Rule-19 Date is required'),
  rule18Date: Yup.date().required('Rule-18 Date is required'),
  aggrement: Yup.string().required('Aggrement is required'),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

});

const FormTank = () => {
  const handleSubmit = (values, { setSubmitting,resetForm }) => {

    console.log(values)
    axios.post(ENDPOINT, values)
      .then(response => {
        alert('Pesotank Data submitted successfully');
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
  companyName: '',
  capacity: '',
  tankNo: '',
  licDate: '',
  rule19Date: '',
  rule18Date: '',
  aggrement: '',
  phoneNumber: '',

      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6">Peso Tank Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <Field name="companyName" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tank No</label>
            <Field name="tankNo" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="tankNo" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tank Capacity</label>
            <Field name="capacity" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm" />
          </div>
        
          <div className="mb-4">
            <label className="block text-gray-700">Licence Expiry Date</label>
            <Field name="licDate" type="date" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="licDate" component="div" className="text-red-500 text-sm" />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Rule-19 Expiry Date</label>
            <Field name="rule19Date" type="date" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="rule19Date" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Rule-18 Expiry Date</label>
            <Field name="rule18Date" type="date" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="rule18Date" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Aggrement</label>
            <Field as="select" name="aggrement" className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <Field name="phoneNumber" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
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