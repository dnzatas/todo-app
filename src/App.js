import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useEffect, useState } from 'react';

function App() {
  const current = new Date();
  const day = current.toLocaleString('en-us',{day:'numeric'});
  const month = current.toLocaleString('en-us',{month:'long'});
  const year = current.toLocaleString('en-us',{year:'numeric'});
  const currentDate = `${day} ${month} ${year}`;

  const [tasks, setTasks] = useState([]);

  const complete = tasks.filter(task => task.done).length;
  const total = tasks.length ? (complete ? (complete !== tasks.length ? `${complete} / ${tasks.length}` : 'Good Job!') : '') : "Let's Do Something";
  

  useEffect(() => {
    if(tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  },[]);

  function addTask(name){
    setTasks(prev => {
      return [...prev, {name:name, done:false}];
    });
  }

  function updateDone(taskIndex, newDone){
    setTasks(prev => {
      const newTask = [...prev];
      newTask[taskIndex].done = newDone;
      return newTask;
    });
  }

  function renameTask(taskIndex, newName){
    setTasks(prev => {
      const newTask = [...prev];
      newTask[taskIndex].name = newName;
      return newTask;
    })
  }

  function deleteTask(taskIndex){
    setTasks(prev => {
      return prev.filter((taskOnject, index) => index !== taskIndex);
    })
  }

  return (
    <main>
      <h1>{currentDate}</h1>
      <TaskForm onAdd={addTask}/>
      {
        tasks.map((task, index) => (
        <Task {...task} 
              onToggle={done => updateDone(index, done)}
              onRename={newName => renameTask(index, newName)}
              onDelete = {() => deleteTask(index)} />
        ))
      }
      <h1 className='status'>{total}</h1>
    </main>
  );
}

export default App;
