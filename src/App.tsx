import React, { useState } from "react";
import "bootswatch/dist/lumen/bootstrap.min.css";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };
  const addTask = (task: string) => {
    const theTask: ITask[] = [...tasks, { name: task, done: false }];
    setTasks(theTask);
  };
  const isDone = (indice:number)=>{
    const theCurrentTasks: ITask[] = [...tasks];
    theCurrentTasks[indice].done = !theCurrentTasks[indice].done;
    setTasks(theCurrentTasks)
  }
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <h1 className="text-center">TASK APP</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                />
                <button className="btn btn-primary btn-block mt-2">Save</button>
              </form>
            </div>
          </div>

          {tasks.map((item: ITask, i: number) => (
            <div className="card car-body mt-2 text-center" key={i} id={i+""}>
              <h2 className={item.done ? "text-muted" : ""} style={{textDecoration: item.done ? "line-through" : ""}}>{item.name.toUpperCase()}</h2>
              <h3>{item.done ? "👍" : "👎"}</h3>
              <div className="p-3">
                <button onClick={()=>isDone(i)} className="btn btn-warning btn-block">
                  {item.done ? 'HECHO ✓' : 'NO HECHO X'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
