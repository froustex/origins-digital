import { useLoaderData } from "react-router-dom";
import AddCategory from "../../components/AddCategory";

export const loader = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error("error while trying to get all categories");
    } else {
      return data;
    }
  } catch (error) {
    throw new Error("error while trying to get all categories");
  }
};

export default function DashboardAddVideo() {
  const categories = useLoaderData();
  return (
    <div className="page">
      <form className="flex flex-col w-full gap-8 mt-8">
        <input
          className="px-2 py-2 rounded-lg"
          type="text"
          placeholder="title"
        />
        <textarea
          className="px-2 py-2 resize-none min-h-[8rem]"
          name="description"
          placeholder="description"
        />
        <div className="flex flex-col items-center justify-between gap-y-8 sm:gap-0 sm:flex-row">
          <select
            className="px-2 py-4 rounded-lg w-full sm:w-[50%]"
            name="category"
          >
            <option value="">category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          <AddCategory />
        </div>
        <select className="px-2 py-4 rounded-lg" name="isPrivate">
          <option value="public">public</option>
          <option value="private">private</option>
        </select>
        <input type="file" name="file" />
        <button
          className="text-white bg-primary hover:bg-primary/80"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}