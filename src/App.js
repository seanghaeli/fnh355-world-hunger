import './App.css';
import DownButton from './components/DownButton';
import Underworld from './components/Underworld';
import World from './components/World';

function App() {
  return (
    <div>
        <World/>
        <div className='childClass downbutton'>
          <DownButton/>
        </div>
        <Underworld className='fullheight'/>
    </div>
  );
}

export default App;