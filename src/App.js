import React, {Fragment, useState} from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

function App() {
    const [users, setUsers] = useState([]);

    const addUserHandler = (username, age) => {
        setUsers((prevState) => {
            return [...prevState, {username: username, age: age,id:Math.random().toString()}]
        })
    }

    return (
        <Fragment>
            <AddUser onAddUser={addUserHandler}/>
            <UserList users={users}/>
        </Fragment>
    );
}

export default App;
