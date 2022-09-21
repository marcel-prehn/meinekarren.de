import Image from "next/image";

export const VehicleImages = () => {
  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Fahrzeugbilder</h5>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <img src={"https://via.placeholder.com/150"} width={150} height={150} />
          <img src={"https://via.placeholder.com/150"} width={150} height={150} />
          <img src={"https://via.placeholder.com/150"} width={150} height={150} />
          <img src={"https://via.placeholder.com/150"} width={150} height={150} />
          <img src={"https://via.placeholder.com/150"} width={150} height={150} />
          <img src={"https://via.placeholder.com/150"} width={150} height={150} />
        </div>
      </div>
    </div>
  );
};
