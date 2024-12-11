import SimpleColorblindSelect from "./ColorblindSelect";
const MainWindow = () => {
  return (
    <main className="flex  flex-col items-center justify-center p-24 bg-green-400">
      <div className=" shadow-lg p-5 rounded-xl bg-yellow-300">
        <h1 className="text-2xl font-bold mb-8">Color Accessibility</h1>
        <SimpleColorblindSelect />
      </div>
    </main>
  );
};

export default MainWindow;
