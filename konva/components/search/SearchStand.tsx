
interface SearchStandProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchStand = ({ value, onChange, placeholder = "Search by stand number..." }: SearchStandProps) => {
  return (
    <div className="absolute top-4 left-4 z-20 w-72">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-lg border-gray-300 focus:border-blue-500"
      />
    </div>
  );
};