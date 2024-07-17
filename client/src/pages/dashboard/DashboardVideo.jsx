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
        <div className="mb-4 overflow-hidden rounded-lg sm:mb-8 max-w-[50rem] ">
          <video className="w-full h-full" controls>
            <track kind={state.description} />
            <source src={state.source} />
          </video>
        </div>
        <section className="flex flex-col p-4 mb-4 bg-gray-200 rounded-lg sm:mb-6">
          <h2 className="mb-2 text-lg font-semibold">Description</h2>
          <p>{state.description}</p>
          <p className="mt-6 text-gray-500">{formatedDate}</p>
        </section>
      </div>
    </section>
  );
}
