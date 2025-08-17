export default function Card({ title, children }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-80">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
