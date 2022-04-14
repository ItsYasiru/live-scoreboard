import classes from './panel.module.sass';


function updateMatch() {
    console.log("Updating match!");
};


function ControlPanel(props) {
    const { match } = props;

    const [school1, school2] = match.schools;

    return (
        <section className={classes.panel}>
            <h1>Control</h1>
            <form className={classes.form}>
                <div className={classes.scoreView}>
                    <h3>{school1.name}</h3>

                    <table>
                        <tr>
                            <td><label htmlFor='school-1-tries'>Tries</label></td>
                            <td><input required id='school-1-tries' name='school-1-tries' type="number" value={school1.score.tries} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor='school-1-conversions'>Conversions</label></td>
                            <td><input required id='school-1-conversions' name='school-1-conversions' type="number" value={school1.score.conversions} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor='school-1-penalties'>Penalties</label></td>
                            <td><input required id='school-1-penalties' name='school-1-penalties' type="number" value={school1.score.penalties} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor='school-1-dropgoals'>Drop Goals</label></td>
                            <td><input required id='school-1-dropgoals' name='school-1-dropgoals' type="number" value={school1.score.dropgoals} /></td>
                        </tr>
                    </table>
                </div>

                <div className={classes.scoreView}>
                    <h3>{school2.name}</h3>

                    <table>
                        <tr>
                            <td><label htmlFor='school-2-tries'>Tries</label></td>
                            <td><input required id='school-2-tries' name='school-2-tries' type="number" value={school2.score.tries} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor='school-2-conversions'>Conversions</label></td>
                            <td><input required id='school-2-conversions' name='school-2-conversions' type="number" value={school2.score.conversions} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor='school-2-penalties'>Penalties</label></td>
                            <td><input required id='school-2-penalties' name='school-2-penalties' type="number" value={school2.score.penalties} /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor='school-2-dropgoals'>Drop Goals</label></td>
                            <td><input required id='school-2-dropgoals' name='school-2-dropgoals' type="number" value={school2.score.dropgoals} /></td>
                        </tr>
                    </table>
                </div>

                <div className={classes.additionalControls}>
                    <button onClick={updateMatch}>Start</button>
                    <button onClick={updateMatch}>Halftime</button>
                </div>

                <button onClick={updateMatch}>Update</button>
            </form>
        </section>
    );
};


export default ControlPanel;
