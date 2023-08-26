import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
export const MainForm = () => {
  const [todo, settodo] = useState();
  const [btn, setbtn] = useState("Save");
  const [todoUpdate, settodoUpdate] = useState();
  const [todoList, settodoList] = useState([]);
  const getTaskName = (e) => {
    settodo(e.target.value);
  };
  useEffect(() => {
    const updatedata = JSON.parse(localStorage.getItem("todolist"));
    if (updatedata) {
      settodoList(updatedata);
    }
  }, []);

  const deleteTodo = (arg) => {
    const newList = todoList.filter((ele) => ele.id !== arg);
    settodoList(newList);
    localStorage.setItem("todolist", JSON.stringify(newList));
    toast.success("Task Deleted Succcesfully");
    settodo("");
    settodoUpdate();
    setbtn("Save");
  };
  const editTodo = (arg) => {
    const newList = todoList.filter((ele) => ele.id == arg);
    settodo(newList[0].name);
    settodoUpdate(newList[0].id);
    setbtn("Update");
  };
  const handleClick = (e) => {
    if (!todo) {
      toast.error("Please write something");
    } else {
      if (todoUpdate) {
        const newList = todoList.filter((ele) =>
          ele.id == todoUpdate ? (ele.name = todo) : ele
        );
        settodoList(newList);
        toast.success("Task Updated Succcesfully");
      } else {
        settodoList([
          ...todoList,
          {
            id: uuidv4(),
            name: todo,
          },
        ]);
        toast.success("Task Added Succcesfully");
      }

      localStorage.setItem("todolist", JSON.stringify(todoList));

      settodo("");
      settodoUpdate();
      setbtn("Save");
    }
  };
  return (
    <>
      <div className="maindiv mt-3">
        <div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="What you want to do?"
              onChange={getTaskName}
              value={todo}
            />
            <label htmlFor="floatingInput">Task Name</label>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-info w-100"
          >
            {btn}
          </button>

          <div className="row mt-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task</th>
                  <th scope="col">Active</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {todoList &&
                  todoList?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{ele.name}</td>
                        <td>{ele.active ? "Pending" : "Pending"}</td>
                        <td>
                          <button
                            className="btn btn-success m-2"
                            onClick={() => {
                              editTodo(ele.id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure your want to delete?"
                                )
                              ) {
                                deleteTodo(ele.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
