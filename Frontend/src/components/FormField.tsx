// src/components/FormField.tsx
import React from "react";
import { Field, ErrorMessage } from "formik";

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => (
  <div className="flex items-start justify-center flex-col mb-5">
    <label className="text-xl" htmlFor={name}>
      {label}
    </label>
    <Field
      className="bg-white/40 rounded-lg w-96 pl-1 py-1"
      type={type}
      name={name}
    />
    <ErrorMessage
      className="text-red-500 mt-1 break-words"
      name={name}
      component="div"
    />
  </div>
);

export default FormField;
