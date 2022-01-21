import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { makeStyles } from "@mui/styles";
import { Button, FormControl, OutlinedInput } from "@mui/material";

const useStyles = makeStyles({
  box: {
    width: "50ch",
    backgroundColor: "white",
    border: 10,
    borderRadius: 3,
    margin: "5px",
  },
  button: {
    width: "30ch",
    height: "7.2ch",
    border: 10,
    borderRadius: 3,
    margin: "7px",
  },
});

function App() {
  //This is react hook to temporarily store the todo without the backend.
  const [todos, setTodos] = useState([]);
  //Keep the input box empty before anything is typed
  const [input, setInput] = useState("");
  const classes = useStyles();

  //when the app loads, we need to listen to the db and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here ...fires when the app loads. useEffect((functions(/used as arrow function),dependencies(/when the array is empty it runs once when app.js loads, if there is variable inside it, it fires it off everytime the variable loads)))
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().task }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //event.preventDefault(); //This statement prevents the page from refreshing. we are controlling everything on the page and we are using react for this. so refreshing clears the state.

    /*this will fire off when we click the button(When ever there is onchange or onclick they typically fireoff events)
    We need to push the input now into the list.We do this using ES6
    we need to set the todo's to an array but we need to keep whatever is in the array without losing the previously exsisting values when newone is here
    we do that by spreading the array(...) A spread is like appending or pushing to the end of the current string
    in statement below, the placeholder for input would have been "here is the new todo" but the new todo is whatever we give in the input */
    db.collection("todos").add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]); // This only puts the contents on the page and contents go away when refreshed.
    setInput(""); // This clears the input field after submiting the task
  };

  return (
    <div className="App">
      <h1>ToDo App</h1>
      {/* we use form and submit button to make the enter button work and need not click on button everytime*/}
      <form>
        {/*To store the change of input state temporarily.The state is cleared when refreshed*/}
        <FormControl>
          <OutlinedInput
            className={classes.box}
            placeholder="Type Something..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          sx={{ mt: 0.5 }}
          className={classes.button}
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
        >
          Add Todo
        </Button>
      </form>

      {/*Using form, when clicked on submit the whole page gets refreshed and the content is lost again*/}
      <ul>
        {todos.map((todo) => (
          //prop is the text and it's value is todo
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
