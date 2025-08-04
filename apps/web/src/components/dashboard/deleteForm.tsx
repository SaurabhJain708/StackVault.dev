export const DeleteForm = ({
  onDelete,
  Title,
  id,
}: {
  onDelete: (id: string) => void;
  Title: string;
  id: string;
}) => {
  return (
    <>
      <p>Are you sure you want to delete this {Title}?</p>
      <button
        onClick={() => {
          onDelete("id"); // Replace with actual ID
        }}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
      >
        Confirm Delete
      </button>
    </>
  );
};
