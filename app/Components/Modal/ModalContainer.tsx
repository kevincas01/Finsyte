import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
interface ModalContainerProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
const ModalContainer = ({
  title,
  children,
  isOpen,
  onClose,
}: ModalContainerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="relative z-50 bg-white border border-gray-200 rounded-md p-6 w-[500px] flex flex-col gap-5">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button className="cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
