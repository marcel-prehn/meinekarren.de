import { XSquare } from "@styled-icons/boxicons-solid";

interface WarningBarProps {
  message: string;
  onClose: () => void;
}

export const WarningBar = (props: WarningBarProps) => {
  return (
    <div className="warning bg-yellow-100 rounded-lg py-4 px-4 my-4 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="warning">
      {props.message}
      <button type="button" className="btn-close box-content w-8 h-8 ml-auto text-yellow-900 border-none" onClick={props.onClose}>
        <XSquare />
      </button>
    </div>
  );
};
