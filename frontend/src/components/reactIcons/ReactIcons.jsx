import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaBook } from "react-icons/fa6";

const ReactIcons = () => {
  const trashIcon = <FaTrashAlt />;
  const editIcon = <MdEditSquare />;
  const closeIcon = <IoMdClose />;
  const emailIcon = <MdEmail />;
  const passwordIcon = <RiLockPasswordFill />;
  const userIcon = <FaUser />;
  const messageIcon = <MdMessage />;
  const bookIcon = <FaBook />;
  return { trashIcon, editIcon, closeIcon, emailIcon, passwordIcon, userIcon, messageIcon, bookIcon};
};

export default ReactIcons;
