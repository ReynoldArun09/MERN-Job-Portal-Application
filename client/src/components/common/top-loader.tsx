import { useEffect, useState } from "react";

export default function TopLoader() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : prev));
    }, 100);

    if (progress >= 100) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  return (
    <section className="fixed top-0 left-0 w-full h-1 bg-gray-200">
      <div
        className="h-1 bg-blue-500 transition-transform"
        style={{ width: `${progress}%` }}
      ></div>
    </section>
  );
}
