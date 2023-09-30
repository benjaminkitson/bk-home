export const Cell = ({ isSnek }) => {
  return (
    <div
      className={`mb-1 mr-1 h-4 w-4 rounded-sm border border-white ${
        isSnek ? "bg-blue-500" : "bg-white opacity-30"
      }`}
    ></div>
  );
};
