"use client";

import { useParams,  } from "next/navigation";
import Link from "next/link";
import { useEvent } from "@/hooks/useEvent";
import { useAddAttendee } from "@/hooks/useAddAttendee";
import { useRemoveAttendee } from "@/hooks/useRemoveAttendee";
import { useAddTagToEvent } from "@/hooks/useAddTagToEvent";
import { useRemoveTagFromEvent } from "@/hooks/useRemoveTagFromEvent";
import { useTags } from "@/hooks/useTags";
import AttendeeList from "@/components/AttendeeList";
import AddAttendee from "@/components/AddAttendee";
import TagsManagement from "@/components/Tags";
import ShowTags from "@/components/ShowTags";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;

  const { event, loading, error, refetch } = useEvent(eventId);
  const { tags } = useTags();

  const { addAttendee } = useAddAttendee(refetch);
  const { removeAttendee } = useRemoveAttendee(refetch);
  const { addTagToEvent } = useAddTagToEvent(refetch);
  const { removeTagFromEvent } = useRemoveTagFromEvent(refetch);

  if (loading)
    return <div className="p-8 text-center">Loading event details...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading event: {error.message}
      </div>
    );

  if (!event) {
    return (
      <div className="container mx-auto p-4 max-w-4xl text-center">
        <p className="text-red-500">Event not found</p>
        <Link
          href="/events"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const handleAddAttendee = async (
    name: string,
    email?: string | null
  ): Promise<void> => {
    try {
      await addAttendee({
        variables: {
          eventId,
          name,
          email: email || null,
        },
      });
    } catch (err) {
      console.error("Error adding attendee:", err);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    try {
      await removeAttendee({
        variables: {
          id: attendeeId,
        },
      });
    } catch (err) {
      console.error("Error removing attendee:", err);
    }
  };

  const handleAddTag = async (tagId: string) => {
    try {
      await addTagToEvent({
        variables: {
          eventId,
          tagId,
        },
      });
    } catch (err) {
      console.error("Error adding tag:", err);
    }
  };

  const handleRemoveTag = async (tagId: string) => {
    try {
      await removeTagFromEvent({
        variables: {
          eventId,
          tagId,
        },
      });
    } catch (err) {
      console.error("Error removing tag:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Link href="/events" className="text-blue-500 hover:underline">
          &larr; Back to Events
        </Link>
        <h1 className="text-2xl font-bold mt-2">{event.title}</h1>
        <p className="text-gray-500">
          {new Date(event.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Tags */}
        <ShowTags selectedTags={event.tags} handleRemoveTag={handleRemoveTag} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Attendees List */}
        <AttendeeList
          attendees={event.attendees}
          handleRemoveAttendee={handleRemoveAttendee}
        />

        {/* Add Attendee Form */}
        <AddAttendee handleAddAttendee={handleAddAttendee}  />
      </div>

      {/* Tags Management */}
      <TagsManagement
        tags={tags}
        selectedTags={event.tags}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
      />
    </div>
  );
}
