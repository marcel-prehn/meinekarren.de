import { differenceInDays, format, parse } from "date-fns";

interface ProgressIndicatorProps {
  title: string;
  type: string;
  deadline: string;
  years: number;
  onError: () => void;
}

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{props.title}</h5>
        <div className="w-full bg-gray-200 h-5">
          {props.deadline ? (
            <div className="bg-green-600 h-5" style={{ width: (differenceInDays(parse(props.deadline, "yyyy-mm-dd", new Date()), Date.now()) / (props.years * 365)) * 100 }}></div>
          ) : (
            ""
          )}
        </div>
        <div>
          {props.deadline ? (
            <div>
              {format(parse(props.deadline, "yyyy-mm-dd", new Date()), "dd.mm.yyyy")} - Noch {differenceInDays(parse(props.deadline, "yyyy-mm-dd", new Date()), Date.now())} Tage
            </div>
          ) : (
            <div className="mt-4">keine Daten</div>
          )}
        </div>
      </div>
    </div>
  );
};
