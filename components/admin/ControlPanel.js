import classes from './panel.module.sass';


const getValue = (id) => (document.getElementById(id).value);

function updateMatch() {
    const match = {
        schools: [
            {
                name: document.getElementById('school-1-name').innerHTML,
                score: {
                    tries: getValue('school-1-tries'),
                    conversions: getValue('school-1-conversions'),
                    penalties: getValue('school-1-penalties'),
                    dropgoals: getValue('school-1-dropgoals')
                }
            },
            {
                name: document.getElementById('school-2-name').innerHTML,
                score: {
                    tries: getValue('school-2-tries'),
                    conversions: getValue('school-2-conversions'),
                    penalties: getValue('school-2-penalties'),
                    dropgoals: getValue('school-2-dropgoals')
                }
            }
        ]
    };

    const data = {
        data: match,
        token: "X"
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    fetch("http://localhost:3000/api/match", options);
};

function startMatch() {
    const match = {
        startedAt: new Date().getTime()
    };

    const data = {
        data: match,
        token: "X"
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    fetch("http://localhost:3000/api/match", options);
};

function endMatch() {
    const match = {
        endedAt: new Date().getTime()
    };

    const data = {
        data: match,
        token: "X"
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    fetch("http://localhost:3000/api/match", options);
};

function halftime() {
    const match = {
        halftimeAt: new Date().getTime()
    };

    const data = {
        data: match,
        token: "X"
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    fetch("http://localhost:3000/api/match", options);
};


function ControlPanel(props) {
    const { match } = props;
    if (!match) {
        return (
            <section className={classes.panel}>
                <h1>Control</h1>
                <span>
                    No match going on to control.
                    <br />
                    Create one to start!
                </span>
            </section>
        )
    }

    return (
        <section className={classes.panel}>
            <h1>Control</h1>
            <span>
                <h3>{match.title}</h3>
                <h4>{`${match.schools.map((item) => item.name).join(' vs ')}`}</h4>
            </span>
            {
                match.startedAt ?
                    <>
                        <form onChange={updateMatch} className={classes.form}>
                            {match.schools.map((i, school) => (
                                <div key={i} className={classes.scoreView}>
                                    <h3 id={`school-${i + 1}-name`}>{school.name}</h3>

                                    <table>
                                        <tr>
                                            <td><label htmlFor={`school-${i + 1}-tries`}>Tries</label></td>
                                            <td><input required id={`school-${i + 1}-tries`} name={`school-${i + 1}-tries`} type="number" defaultValue={school.score.tries} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor={`school-${i + 1}-conversions`}>Conversions</label></td>
                                            <td><input required id={`school-${i + 1}-conversions`} name={`school-${i + 1}-conversions`} type="number" defaultValue={school.score.conversions} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor={`school-${i + 1}-penalties`}>Penalties</label></td>
                                            <td><input required id={`school-${i + 1}-penalties`} name={`school-${i + 1}-penalties`} type="number" defaultValue={school.score.penalties} /></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor={`school-${i + 1}-dropgoals`}>Drop Goals</label></td>
                                            <td><input required id={`school-${i + 1}-dropgoals`} name={`school-${i + 1}-dropgoals`} type="number" defaultValue={school.score.dropgoals} /></td>
                                        </tr>
                                    </table>
                                </div>
                            ))}
                        </form>
                    </> : null
            }

            <div className={classes.additionalControls}>
                {!match.startedAt ? <button onClick={startMatch}>Start Match</button> : null}
                {!match.halftimeAt && match.startedAt ? <button onClick={halftime}>Halftime</button> : null}
                {!match.endedAt && match.halftimeAt ? <button onClick={endMatch}>End Match</button> : null}
            </div>
        </section>
    );
};


export default ControlPanel;
