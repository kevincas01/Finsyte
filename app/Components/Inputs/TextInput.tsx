import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface TextInputProps {
  label: string;
  placeholder: string;
  icon?: "email" | "lock" | "person"|"search";
}

const iconMap = {
  email: EmailOutlinedIcon,
  lock: LockOutlinedIcon,
  person: PersonOutlineIcon,
  search:SearchOutlinedIcon
};

const TextInput = ({ label, placeholder, icon }: TextInputProps) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
        {IconComponent && <IconComponent className="text-gray-500 mr-2" />}
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-gray-800"
        />
      </div>
    </div>
  );
};

export default TextInput;
