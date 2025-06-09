import React from "react";

interface Attendee {
  id: string;
  name: string;
  email?: string;
}
type Props = {
  attendees: Attendee[];
  handleRemoveAttendee: (id: string) => void;
};

const AttendeeList = ({ attendees, handleRemoveAttendee }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-500">
        Attendees ({attendees.length})
      </h2>

      {attendees.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No attendees yet</p>
      ) : (
        <ul className="divide-y">
          {attendees.map((attendee: Attendee) => (
            <li
              key={attendee.id}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{attendee.name}</p>
                {attendee.email && (
                  <p className="text-sm text-gray-500">{attendee.email}</p>
                )}
              </div>
              <button
                onClick={() => handleRemoveAttendee(attendee.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendeeList;
