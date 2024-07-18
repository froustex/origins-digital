import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DashboardVideo() {
  const [formatedDate, setFormatedDate] = useState();
  const { state } = useLocation();

  useEffect(() => {
    const date = new Date(state.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  return (
    <section className="page">
      <div>
        <h1 className="mb-4 sm:mb-8">{state.title}</h1>
        <div className="w-full mb-4 overflow-hidden rounded-lg sm:mb-8">
          <video className="w-full h-full" controls>
            <track kind={state.description} />
            <source src={state.source} />
          </video>
        </div>
        <section className="flex flex-col p-4 mb-4 bg-gray-200 rounded-lg sm:mb-6">
          <h2 className="mb-2 text-sm font-semibold sm:text-lg">Description</h2>
          <p className="text-sm sm:text-base">{state.description}</p>
          <p className="mt-4 text-sm text-gray-500 sm:mt-6 sm:text-base">
            {formatedDate}
          </p>
        </section>
      </div>
    </section>
  );
}
