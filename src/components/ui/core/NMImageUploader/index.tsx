import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../input";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TImageUploader = {
    label?: string;
    className?: string;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  };;

const NMImageUploader = ({
    label = "Upload Images",
    className,
    setImageFiles,
    setImagePreview,
}: TImageUploader) => {



  //! getting image from pc
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    //! reads the file and after loading creates url of the image and Image tag will be able to display the image
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };

      //! convert the image file into dataURL to show in Image tag
      reader.readAsDataURL(file);
    }

    event.target.value = "";
  };

 
  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="Image/*"
        className="hidden"
        id="image-uploader"
      />
      <label
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        htmlFor="image-uploader"
      >
        {label}
      </label>
      {/* <div>
        {imagePreview.map((preview, idx) => (
          <Image
            key={idx}
            src={preview}
            width={500}
            height={500}
            alt="images"
          />
        ))}
      </div> */}
    </div>
  );
};

export default NMImageUploader;
