import { twMerge } from "tailwind-merge";

type Props = {
  error?: string | null;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  error,
  label,
  placeholder,
  defaultValue,
  onChange,
}: Props) => {
  return (
    <div className={"flex flex-col"}>
      <label
        htmlFor="playlist-name"
        className="block mb-2 text-sm font-medium text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id="playlist-name"
        className={twMerge(
          "bg-gray-50 border text-sm rounded-lg block w-full p-2.5 outline-0 bg-background",
          error ? "border-red-500" : "border-gray-300",
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        maxLength={50}
      />
      {error && <p className={"text-red-500 text-xs mt-1"}>{error}</p>}
    </div>
  );
};
