import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorCompProps {
  value: string;
  onChange: (content: string) => void;
  customClass?: string;
}

const EditorComp: React.FC<EditorCompProps> = ({
  value,
  onChange,
  customClass,
}) => {
  return (
    <ReactQuill
      className={customClass}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default EditorComp;
