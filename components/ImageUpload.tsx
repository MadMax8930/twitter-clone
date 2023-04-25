import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploadProps {
   onChange: (base64: string) => void;
   label: string;
   value?: string;
   disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
   const [base64, setBase64] = useState(value);

   const handleChange = useCallback((base64: string) => {
      onChange(base64);
   }, [onChange]);

   // Convert the uploaded image to base64

   const handleDrop = useCallback((files: any) => {
      const file = files[0];
      const reader = new FileReader(); // js ecosystem

      reader.onload = (e: any) => {
         setBase64(e.target.result);
         handleChange(e.target.result);
      }

      reader.readAsDataURL(file);
   }, [handleChange]);

   // initiate our hook

   const { getRootProps, getInputProps } = useDropzone({
      maxFiles: 1,
      onDrop: handleDrop,
      disabled,   // disabled: disabled
      accept: {
         'image/jpeg': [],
         'image/png': []
      }
   });

  return (
    <div
      {...getRootProps({
         className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700"
      })}
    >
      <input {...getInputProps()} />
      {
         base64 ? (
            <div className="flex items-center justify-center">
               <Image 
                  src={base64}
                  alt="Uploaded image"
                  height="100"
                  width="100"
               />
            </div>
         ) : (
            <p className="text-white">{label}</p>
         )
      }
    </div>
  );
};

export default ImageUpload;