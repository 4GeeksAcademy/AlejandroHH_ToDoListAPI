import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/alejandrohh";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [taskInput, setTaskInput] = useState("");


  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(response => {
        setData(response);
      })
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    updateTasks();
  }, [data])

  const updateTasks = () => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(apiUrl, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };


  const deleteItems = (indexItem) => {
    setData((prevState) =>
    prevState.filter((element, index) => index !== indexItem))
  }



  const addTasks = () => {
    const newTask = { label: taskInput, done:false };
  
    const newData = [...data];
    newData.push(newTask);
  
    setData(newData)
    
  
    setTaskInput('');
  };
  

  return (
    <>
      <div className="col-5 text-center title">
        <h1 className="pulse">TODO LIST</h1>
        <br />
      </div>
      <div className="contenedor col-8 mx-auto  text-center pulse">
        <input
          className="me-3"
          type="text"
          placeholder="What I have to do?"
          value={taskInput}
          onChange={event => setTaskInput(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              if (taskInput.trim().length === 0) {
                alert('Please enter a task.');
              } else {
                addTasks();
                updateTasks();
              }
            }
          }}
        />


        <ul className="d-flex justify-content-center flex-column  ">
        {data.map((task, index)=> {
          return (
                  <li className="d-flex justify-content-center theLi " key={index}>{task.label}
                <FontAwesomeIcon icon={faEraser} onClick={() => deleteItems(index) } /> </li> 
          )
        })}
        </ul>

      </div>
    </>
  );
};

export default TodoList;
