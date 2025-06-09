import React from "react";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = {

  handleAddAttendee: (
    name: string,
    email?: string | null
  ) => Promise<void>;
};

type FormValues = {
  name: string;
  email: string;
};

const attendeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
});

const AddAttendee = ({  handleAddAttendee }: Props) => {
  const onSubmitAdd = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      await handleAddAttendee( values.name, values.email || null);
      helpers.resetForm();
    } catch (err) {
      console.error("Error adding attendee:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-500">Add Attendee</h2>

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={toFormikValidationSchema(attendeeSchema)}
        onSubmit={onSubmitAdd}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                placeholder="Enter attendee name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email (optional)
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                placeholder="Enter attendee email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Attendee"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAttendee;
