import React, {useState} from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState();

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    }

    const addUserHandler = (event) => {
        event.preventDefault()
        if (username.trim().length === 0 || age.trim().length === 0) {
            setError({
                title:"Invalid input",
                message:"Please enter a valid name and age (non-empty values)."
            });
            return;
        }
        if (+age < 1) {
            setError({
                title:'Invalid age',
                message:'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser(username, age)
        setUsername("");
        setAge("");
    }

    const errorHandler=()=>{
        setError(null);
    }

    return (
        <div>
            {error && <ErrorModal onDismiss={errorHandler} title={error.title} message={error.message}/>}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={usernameChangeHandler}/>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={age} onChange={ageChangeHandler}/>

                    <Button type={"submit"}>Add User</Button>
                </form>
            </Card>
        </div>
    );
}

export default AddUser;