import { format, differenceInDays } from "date-fns";

interface ProgressIndicatorProps {
  title: string;
  deadline: Date;
  years: number;
}

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const days = differenceInDays(props.deadline, Date.now());
  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{props.title}</h5>
        <div className="w-full bg-gray-200 h-5">
          <div className="bg-green-600 h-5" style={{ width: (days / (props.years * 365)) * 100 }}></div>
        </div>
        <div>
          {format(props.deadline, "dd.mm.yyyy")} - Noch {days} Tage
        </div>
      </div>
    </div>
  );
};
