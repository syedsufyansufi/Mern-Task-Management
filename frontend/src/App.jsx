import Card from "./components/Card";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold text-indigo-600">Task Manager Frontend 🚀</h1>
      <Card title="Sample Task">
        <p className="text-gray-600">This is a test card styled with Tailwind.</p>
      </Card>
    </div>
  );
}

export default App;
