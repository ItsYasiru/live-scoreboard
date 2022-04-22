import classes from "./panel.module.sass";

function setToken(event) {
    const tokenField = document.getElementById("token");

    const token = tokenField.value;
    localStorage.setItem("token", token);

    tokenField.value = "";
    const oldInner = event.target.innerHTML;
    event.target.innerHTML = "Token set!";

    setTimeout(() => (event.target.innerHTML = oldInner), 2000);
}

function LoginPanel(props) {
    return (
        <section className={classes.panel}>
            <h1>Settings</h1>
            <fieldset>
                <legend>Auth</legend>
                <input id='token' placeholder='Token' type='password' />
                <button onClick={setToken}>Set Token</button>
            </fieldset>
        </section>
    );
}

export default LoginPanel;
