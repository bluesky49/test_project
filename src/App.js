import Sidebar from './component/sidebar';
import ContentView from './component/contentView';
import './App.scss';
import { DataProvider } from './context';

function App() {
  return (
    <DataProvider>
      <Sidebar />
      <ContentView />
    </DataProvider>
  );
}

export default App;
