import { parse } from "date-fns";
import { useEffect, useState } from "react";
import { Vehicle } from "../../models/vehicle";
import { AlertBar } from "../alertbar";
import { WarningBar } from "../warningbar";
import { VehicleConsumption } from "./consumption";
import { VehicleExpenses } from "./expenses";
import { VehicleImages } from "./images";
import { VehicleInformation } from "./information";
import { VehicleMilage } from "./milage";
import { ProgressIndicator } from "./progress-indicator";
import { VehicleTodos } from "./todos";

interface VehicleDetailsProps {
  uuid: string;
}

export const VehicleDetails = (props: VehicleDetailsProps) => {
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [warning, setWarning] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.uuid) {
      fetch(`/api/vehicle/${props.uuid}`)
        .then((res) => res.json())
        .then((data) => {
          setVehicle(data);
        });
    }
  }, [props.uuid]);

  const errorHandler = () => {
    setError(true);
  };

  const warningHandler = (message: string) => {
    setWarning(message);
  };

  return (
    <div>
      {error ? <AlertBar message="Das hat leider nicht geklappt" onClose={() => setError(false)} /> : <></>}
      {warning !== "" ? <WarningBar message={warning} onClose={() => setWarning("")} /> : <></>}
      <div>
        {vehicle ? (
          <div className="p-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <VehicleInformation information={vehicle.information} onError={errorHandler} />
              <VehicleTodos todos={vehicle.todos} vehicleUuid={vehicle.uuid} onError={errorHandler} onWarning={warningHandler} />
              <ProgressIndicator title="Nächste Hauptuntersuchung" deadline={parse(vehicle.tuv, "yyyy-mm", new Date())} years={2} />
              <ProgressIndicator title="Nächste Inspektion" deadline={parse(vehicle.inspection, "yyyy-mm-dd", new Date())} years={1} />
              <VehicleMilage milage={vehicle.milage} vehicleUuid={vehicle.uuid} onError={errorHandler} onWarning={warningHandler} />
              <VehicleConsumption consumption={vehicle.consumption} vehicleUuid={vehicle.uuid} onError={errorHandler} onWarning={warningHandler} />
            </div>
            <div className="mt-4 space-y-4">
              <VehicleExpenses expenses={vehicle.expenses} vehicleUuid={vehicle.uuid} onError={errorHandler} onWarning={warningHandler} />
              <VehicleImages />
            </div>
          </div>
        ) : (
          <div className="text-center p-8">Loading</div>
        )}
      </div>
    </div>
  );
};
