import { useState, useEffect } from "react";

export default function Alert({ text, type="general" }) {
  const [isVisible, setIsVisible] = useState(true);
  const duration = 3000; // Durata in millisecondi

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration]);

  const alertTypes = {
    general: "border-gray-500",
    success: "border-green-600 bg-green-100",
    problem: "border-red-500 bg-red-100",
    alert: "border-yellow-600 bg-yellow-100",
    delete: "border-red-800 bg-red-200",
  };

  return isVisible ? (
    <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`bg-white border-2 rounded-lg px-4 py-3 w-72 ${alertTypes[type]} overflow-y-auto`}
      >
        <p className="text-sm text-center">{text}</p>
      </div>
    </div>
  ) : null;
}