import TTSComponent from "./components/TTScomponent";
import FontChangeComponent from "./components/FontChangeComponent";
import FontSizeComponent from "./components/FontSizeComponent";
import ReadingModeComponent from "./components/ReadingModeComponent";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <>
        <TaskManager />
        <TTSComponent />
        <FontChangeComponent/>
		<FontSizeComponent/>
		<ReadingModeComponent/>
    </>
  )
}

export default App;
