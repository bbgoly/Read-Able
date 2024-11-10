import TTSComponent from "./components/TTScomponent";
import FontChangeComponent from "./components/FontChangeComponent";
import FontSizeComponent from "./components/FontSizeComponent";
import ReadingModeComponent from "./components/ReadingModeComponent";
import TaskManager from "./components/TaskManager";
import DyslexiaAssist from "./components/DyslexiaRuler";

import "./App.css";

function App() {
  return (
    <>
        <TaskManager />
        <TTSComponent />
        <FontChangeComponent/>
		<FontSizeComponent/>
		<ReadingModeComponent/>
        <DyslexiaAssist/>
    </>
  )
}

export default App;
