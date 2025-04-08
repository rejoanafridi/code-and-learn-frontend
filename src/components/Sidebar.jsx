function Sidebar({ tutorials, onSelectTutorial }) {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Tutorials</h2>
      <ul>
        {tutorials.map((tutorial) => (
          <li
            key={tutorial._id}
            onClick={() => onSelectTutorial(tutorial._id)}
            className="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {tutorial.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;