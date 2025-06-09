import React from 'react'

interface Tag {
  id: string;
  name: string;
}


type Props = {
  selectedTags:Tag[]
  handleRemoveTag: (id: string) => void;
};

const ShowTags = ({ selectedTags,handleRemoveTag }:Props) => {
  return (
      <div className="mt-3 flex flex-wrap gap-2">
          {selectedTags &&
            selectedTags.map((tag: Tag) => (
              <div
                key={tag.id}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${tag.name.toLowerCase()}`}
              >
                {tag.name}
                <button
                  onClick={() => handleRemoveTag(tag.id)}
                  className="ml-2 text-xs font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
  )
}

export default ShowTags