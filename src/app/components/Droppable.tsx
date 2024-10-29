"use client";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

function Droppable() {
  const [file, setFile] = useState<{ preview: string } | null>(null);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
      multiple: false, // Allow only one file
      onDrop: (acceptedFiles) => {
        const newFile = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = async () => {
          if (!reader.result || typeof reader.result !== "string") return;
          const base64Image = reader.result.split(",")[1];
          await fetch("/api/editimg", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Image }),
          });
        };
        reader.readAsDataURL(newFile);
        setFile({ preview: URL.createObjectURL(newFile) });
      },
    });

  return (
    <div className="container">
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300
                                ${
                                  isDragActive
                                    ? "border-green-500"
                                    : isDragReject
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }
                                hover:border-gray-400 focus:outline-none`,
        })}
      >
        <input {...getInputProps()} />
        {isDragReject ? (
          <p>File type not accepted</p>
        ) : (
          <p>
            {isDragActive
              ? "Drop the file here"
              : "Drag 'n' drop a file, or click to select one"}
          </p>
        )}

        {file && (
          <div className="mt-4">
            <Image
              alt="preview"
              src={file.preview}
              width={200}
              height={200}
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Droppable;
