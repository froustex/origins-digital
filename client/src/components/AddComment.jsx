import { Form } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AddComment() {
  const { auth } = useAuth();
  return (
    <Form className="flex flex-col w-full gap-4 mb-8 sm:gap-0 sm:flex-row">
      <textarea
        type="text"
        name="text"
        placeholder="add a comment..."
        className={
          auth
            ? `w-[90%] bg-transparent border-b border-gray-600 rounded-none resize-none`
            : `w-[90%] bg-transparent border-b border-gray-600 rounded-none resize-none cursor-not-allowed`
        }
        disabled={auth}
      />
      <button
        className={
          auth
            ? `inline-block sm:block self-start sm:self-end p-1 px-4 m-0 sm:ml-2 text-white h-fit bg-primary w-fit sm:w-[10%]`
            : `inline-block sm:block self-start sm:self-end p-1 px-4 m-0 sm:ml-2 text-white h-fit bg-gray-400 w-fit sm:w-[10%]`
        }
        type="submit"
        disabled={auth}
      >
        Send
      </button>
    </Form>
  );
}
