//Type rfec and click enter to autocomplete a component
//A component is written once that can be used multiple times in multiple places and we use single piece of code to change that component
//props helps us to differentiate one component from the other. todo is the prop here. We can even call it as props.text or todo.text instead of props.todo
//case sensitive. Be careful. Also divide code into components and this helps in rendering

import {
  Button,
  FormControl,
  List,
  ListItem,
  OutlinedInput,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import Modal from "@mui/material/Modal";
import "./Todo.css";
import React, { useState } from "react";
import db from "./firebase";
import { DeleteForever } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  box: {
    width: "50ch",
    backgroundColor: "white",
    border: 10,
    borderRadius: 3,
    margin: "5ch",
  },
  button: {
    width: "30ch",
    height: "7ch",
    border: 10,
    borderRadius: 3,
    margin: "5ch",
    backgroundColor: "white",
    display: "inline-flex",
  },
  paper: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 10,
    borderRadius: 3,
    color: "Black",
    height: 200,
    padding: "10px 30px",
  },
});

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [selected, setSelected] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // }
  const updateTodo = () => {
    //update the todo with new input text
    db.collection("todos").doc(props.text.id).set(
      {
        task: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h2>Update Todo</h2>
          <form>
            <FormControl className={classes.box}>
              <OutlinedInput
                placeholder={props.text.text}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
            <Button
              className={classes.button}
              sx={{ flexShrink: 0.5 }}
              disabled={!input}
              type="submit"
              onClick={updateTodo}
              variant="contained"
            >
              Update Todo
            </Button>
          </form>
        </div>
      </Modal>
      <div>
        <List>
          <ListItem className={classes.button}>
            <ToggleButton
              fullWidth="true"
              sx={{ width: 1 / 2 }}
              color="success"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              {props.text.text}
            </ToggleButton>
          </ListItem>
        </List>
        {/*<FormControlLabel control={<Checkbox />} label={props.text.text} />*/}
        <Button className={classes.button} onClick={(e) => setOpen(true)}>
          Edit
        </Button>
        <DeleteForever
          onClick={(event) =>
            db.collection("todos").doc(props.text.id).delete()
          }
        />
      </div>
    </>
  );
}

export default Todo;
