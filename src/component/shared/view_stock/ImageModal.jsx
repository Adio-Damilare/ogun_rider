import { Modal } from "antd";
import PropTypes, { bool } from "prop-types";
import { IoIosClose } from "react-icons/io";
import DocumentFilePreview from "../file_preview/DocumentFilePreview";
import { cn } from "@nextui-org/react";

const ImageModal = ({ isOpen, onClose, src, isDoc }) => {
  if (!src) {
    return null;
  }

  const fileType = src?.split(".")?.at(-1);

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={() => onClose()}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      //   className="bg-transparent"
      closeIcon={
        <span className="bg-red-500 p- rounded-full">
          <IoIosClose className="text-white" size={30} />
        </span>
      }
    >
      <div className={cn(!isDoc && "h-80")}>
        {isDoc ? (
          <DocumentFilePreview fileUrl={src} fileType={fileType} />
        ) : (
          <img
            className="object-contain object-top w-full h-full "
            alt="Image"
            src={src}
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  src: PropTypes.any,
  isDoc: bool,
};
