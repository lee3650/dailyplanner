import './App.css'
import WorkingArea from './components/WorkingArea'
import { EventData, Time } from './model/EventData';

const test_data = [
    new EventData("wraparound event", new Time(11, 10), new Time(12, 30)), 
    new EventData("test event 2", new Time(13, 30), new Time(14, 0)), 
    new EventData("test event 3", new Time(15, 20), new Time(15, 40)), 
    new EventData("test event", new Time(13, 10), new Time(13, 30)), 
    new EventData("midnight event", new Time(0, 10), new Time(1, 30)), 
]; 

function App() {

  return (
    <div>
      <WorkingArea data={test_data}>

      </WorkingArea>
    </div>
  )
}

export default App
