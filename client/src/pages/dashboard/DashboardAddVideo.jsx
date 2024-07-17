export default function DashboardAddVideo() {
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
        <select className="px-2 py-4 rounded-lg" name="category">
          <option value="">category</option>
        </select>
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
