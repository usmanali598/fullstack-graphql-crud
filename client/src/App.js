import './App.css';
import React, {useState} from 'react';

function App() {
  const [infoItems, setInfoItems] = useState([]);
  const [value, setValue] = React.useState("");
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
    },
    {
      text: "Meet friend for lunch",
    },
    {
      text: "Build really cool todo app",
    }
  ]);

  const addItems = (items) => {
    const val = items.target.textContent;
    setInfoItems([...infoItems, val]);
  }

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const handleSubmitTime = e => {
    e.preventDefault();
    if (!timeValue) return;
    addTimeText(timeValue);
    setTimeValue("");
  }

  const [timeItems, setTimeItems] = useState([]);
  const [timeValue, setTimeValue] = React.useState("");
  const [timeText, setTimeText] = React.useState([
    {
      time: "Learn about React",
    },
    {
      time: "Meet friend for lunch",
    },
    {
      time: "Build really cool todo app",
    }
  ]);

  const addTimes = (items)=>{
    const val = items.target.textContent;
    setTimeItems([...timeItems, val]);
  }

  const addTimeText = time => {
    const newTodos = [...timeText, { time }];
    setTimeText(newTodos);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  }

  return (
    <div className="container">
      <div className="left">
      <h1>Info</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </form>
          {todos && todos.map(it => <button onClick={e => addItems(e)}>{it.text}</button>)}
          <p></p>
          {infoItems && infoItems.map(it => <tr><td>{it}</td></tr>)}
      </div>
      <div className="right">
          <h1>Time</h1>
          <form onSubmit={handleSubmitTime}>
            <input
              type="text"
              className="input"
              value={timeValue}
              onChange={e => setTimeValue(e.target.value)}
            />
          </form>
          {timeText && timeText.map(it => <button onClick={e => addTimes(e)}>{it.time}</button>)}
        <p></p>
          {timeItems && timeItems.map(it => <tr><td>{it}</td></tr>)}
      </div>
    </div>
  );
}

export default App;
