import React, {useRef, useState} from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
    const usernameRef=useRef();
    const ageRef=useRef();
    const [error, setError] = useState();


    const addUserHandler = (event) => {
        event.preventDefault()
        const enteredUsername=usernameRef.current.value;
        const enteredAge=ageRef.current.value;
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)
        usernameRef.current.value='';
        ageRef.current.value='';
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Wrapper>
            {error && <ErrorModal onDismiss={errorHandler} title={error.title} message={error.message}/>}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={usernameRef}/>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" ref={ageRef}/>

                    <Button type={"submit"}>Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
}

export default AddUser;