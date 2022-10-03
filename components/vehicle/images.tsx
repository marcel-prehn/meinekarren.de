import { CloudUpload, ImageAdd, Loader, PlusCircle, Trash, Upload } from "@styled-icons/boxicons-regular";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ImageItem } from "../../models/vehicle";

interface VehicleImagesProps {
  images: ImageItem[];
  vehicleUuid: string;
  onError: () => void;
}

export const VehicleImages = (props: VehicleImagesProps) => {
  const [images, setImages] = useState(props.images);
  const [files, setFiles] = useState<FileList>();
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [isUploading, setUploading] = useState(false);

  const upload = async () => {
    if (files) {
      setUploading(true);
      setUploadDisabled(true);
      let filesUploaded = 0;
      for (let i = 0; i < files.length; i++) {
        const body = new FormData();
        body.append("image", files.item(i)!);
        const response = await axios.post("https://api.imgbb.com/1/upload?key=377e325ba63f8f7a97b2769da1ef9b6d", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          const image: ImageItem = { vehicleUuid: props.vehicleUuid, url: response.data.data.image.url, thumbUrl: response.data.data.thumb.url };
          await update(image);
          filesUploaded++;
        } else {
          props.onError();
          console.error(response);
        }
      }
      if (filesUploaded === files.length) {
        const temp = images;
        temp?.sort();
        setImages(temp);
        setUploadDisabled(true);
      }
      setUploading(false);
    }
  };

  const update = async (image: ImageItem) => {
    const result = await fetch(`/api/vehicle/image`, {
      method: "POST",
      body: JSON.stringify(image),
    });
    if (result.status === 201) {
      const temp = images!;
      temp.push(image);
      setImages(temp);
    } else {
      props.onError();
      console.error(result);
    }
  };

  const remove = async (image: ImageItem) => {
    image.vehicleUuid = props.vehicleUuid;
    const result = await fetch(`/api/vehicle/image`, {
      method: "DELETE",
      body: JSON.stringify(image),
    });
    if (result.status === 200) {
      setImages(images!.filter((i) => i.uuid !== image.uuid));
    } else {
      props.onError();
      console.error(result);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-black text-xl leading-tight font-medium mb-4">Fahrzeugbilder</h5>
        {!isUploading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {images
              ? images.map((image) => (
                  <div key={`image-container-${image.uuid}`} className="bg-gray-light flex flex-col items-center pt-2 pb-2 rounded shadow">
                    <div>
                      <a href={image.url} key={`image-link-${image.uuid}`} target="_blank" rel="noreferrer">
                        <Image className="rounded" layout="intrinsic" src={image.thumbUrl} width={150} height={150} key={`image-${image.uuid}`} alt="Vehicle Image" />
                      </a>
                    </div>
                    <div className="flex">
                      <button onClick={() => remove(image)} className="flex items-center">
                        <Trash size="18" />
                        Löschen
                      </button>
                    </div>
                  </div>
                ))
              : "keine Bilder"}
          </div>
        ) : (
          <div className="w-full content-center justify-center items-center flex">
            <Loader size="32" className="animate-spin" />
          </div>
        )}
        <div className="flex flex-row items-center mt-8">
          <div className="w-full">
            <input
              type={"file"}
              className="w-full form-input h-12 rounded border-gray-light"
              accept="image/*"
              multiple
              onChange={(event) => {
                setFiles((event.target as HTMLInputElement).files!);
                setUploadDisabled(false);
              }}
            />
          </div>
          <div className="w-16">
            <button onClick={upload} disabled={uploadDisabled}>
              <CloudUpload className="text-black" size={48} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
