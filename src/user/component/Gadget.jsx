export default function Gadget({ title, value, children }) {
  return (
    <div className="w-full bg-white p-3 rounded-lg shadow-xl flex sm:flex-col justify-between items-center space-x-1">
      <span className="text-gray-600 sm:text-lg font-semibold">{title}</span>
      <span>{value}</span>
      {children}
    </div>
  );
}