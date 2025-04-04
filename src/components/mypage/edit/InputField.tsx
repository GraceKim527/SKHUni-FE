interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  disabled?: boolean;
}

export const InputField = ({ label, type, id, placeholder, disabled }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-3 py-2 w-full h-10 text-xs font-normal leading-4 text-gray-700 rounded-lg border border-gray-300 outline-[#F4C430]  ${
          disabled ? 'bg-gray-200' : ''
        }`}
        disabled={disabled}
      />
    </div>
  );
};
