import styles from "./PopUp.module.sass";

function PopUp(props) {
    const { href, children } = props;
    return (
        <a href={href} target='_blank' rel='noreferrer'>
            <label className={styles.main}>{children}</label>
        </a>
    );
}

export default PopUp;
