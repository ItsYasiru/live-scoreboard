import classes from './CardHolder.module.sass';


function Component({ children }) {
    return (
        <div className={classes.main}>
            {children}
        </div>
    );
};

export default Component;
