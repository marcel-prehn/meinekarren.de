import { XSquare } from "@styled-icons/boxicons-solid";

interface AlertBarProps {
  message: string;
  onClose: () => void;
}

export const AlertBar = (props: AlertBarProps) => {
  return (
    <div className="alert bg-red-100 rounded-lg py-4 px-4 my-4 text-base text-red-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
      {props.message}
      <button type="button" className="btn-close box-content w-8 h-8 ml-auto text-red-900 border-none" onClick={props.onClose}>
        <XSquare />
      </button>
    </div>
  );
};
