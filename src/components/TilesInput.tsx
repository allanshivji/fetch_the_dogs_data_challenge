import React, { useEffect, useState } from "react";
import { Label } from 'reactstrap'
import Select from "react-select";
import useLocationFilter from "./useLocationFilter";

interface TagOption {
  label: string;
  value: string;
}

interface TagInputProps {
  setZipCodesFromInput: (zipCodes: string[]) => void
}

const TagInput: React.FC<TagInputProps> = ({ setZipCodesFromInput }) => {
  const [tags, setTags] = useState<TagOption[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setZipCodesFromInput(...[tags.map((tag) => tag.value)])
  }, [tags])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTag = inputValue.trim();
      if (!tags.some(tag => tag.value === newTag)) {
        setTags([...tags, { label: newTag, value: newTag }]);
      }
      setInputValue(""); // Clear input after adding tag
      event.preventDefault();
    }
  };

  const handleRemoveTag = (removedTag: TagOption) => {
    setTags(tags.filter(tag => tag.value !== removedTag.value));
  };

  const handleClearAll = () => {
    setTags([]);
  };

  return (
    <div style={{ width: "400px" }}>
      <Select
        isMulti
        isClearable
        options={[]} // No dropdown options
        value={tags}
        inputValue={inputValue}
        onInputChange={(value) => setInputValue(value)}
        onChange={(selected) => setTags(selected as TagOption[])}
        onKeyDown={handleKeyDown}
        placeholder="Type and press enter..."
        components={{
          DropdownIndicator: null, // Hide dropdown arrow
          IndicatorSeparator: () => null, // Remove separator
          Menu: () => null, // Completely hide the dropdown menu
        }}
        styles={{
          control: (base) => ({
            ...base,
            cursor: "text", // Make it behave like an input field
          }),
        }}
      />
      {/* {tags.length > 0 && (
        <button onClick={handleClearAll} style={{ marginTop: "10px" }}>
          Clear All
        </button>
      )} */}
    </div>
  );
};

export default TagInput;
