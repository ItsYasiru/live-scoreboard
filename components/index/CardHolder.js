import classes from "./CardHolder.module.sass";

function Component(props) {
    const { title, children } = props;

    return (
        <fieldset className={classes.main}>
            <legend>{title}</legend>
            {children}
        </fieldset>
    );
}

export default Component;
