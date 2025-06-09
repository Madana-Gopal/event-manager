"use client";

import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "@/graphql/operations";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useTags } from "@/hooks/useTags";
import TagsManagement from "@/components/Tags";
import { useState } from "react";

// Zod schema for validation
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
});

interface Tag {
  id: string;
  name: string;
}

export default function NewEventPage() {
  const router = useRouter();
  const { tags } = useTags();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

  const handleSubmit = async (values: { title: string; date: string }) => {
    try {
      const tagIds = selectedTags.map((tag) => tag.id);
      const { data } = await createEvent({
        variables: {
          title: values.title,
          date: values.date,
          selectedTags: tagIds,
        },
      });

      if (data?.createEvent?.id) {
        router.push(`/events/${data.createEvent.id}`);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const handleAddTag = (id: string) => {
    const tag = tags.find((t: Tag) => t.id === id);
    setSelectedTags([...selectedTags, { ...tag }]);
  };

  const handleRemoveTag = (id: string) => {
    const tempTags = tags.filter((t: Tag) => t.id !== id) as Tag[];
    setSelectedTags([...tempTags]);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href="/events" className="text-blue-500 hover:underline">
          &larr; Back to Events
        </Link>
        <h1 className="text-2xl font-bold mt-2">Create New Event</h1>

        <TagsManagement
          tags={tags}
          selectedTags={selectedTags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <Formik
          initialValues={{ title: "", date: "" }}
          validationSchema={toFormikValidationSchema(eventSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  placeholder="Enter event title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Date
                </label>
                <Field
                  id="date"
                  name="date"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">
                  Error creating event: {error.message}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting || loading ? "Creating..." : "Create Event"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
