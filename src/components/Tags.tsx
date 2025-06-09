import React from "react";

interface Tag {
  id: string;
  name: string;
}

type Props = {
  tags: Tag[];
  selectedTags:Tag[]
  handleAddTag: (id: string) => void;
  handleRemoveTag: (id: string) => void;
};

const TagsManagement = ({ tags,selectedTags,handleAddTag,handleRemoveTag }:Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-500">Manage Tags</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tags.map((tag: Tag) => {
          const isTagged = selectedTags.some((t: Tag) => t.id === tag.id);
          return (
            <div
              key={tag.id}
              className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center ${
                isTagged
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              } ${tag.name.toLowerCase()}`}
              onClick={() =>
                isTagged ? handleRemoveTag(tag.id) : handleAddTag(tag.id)
              }
            >
              <span>{tag.name}</span>
              <span>{isTagged ? "✓" : "+"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagsManagement;
