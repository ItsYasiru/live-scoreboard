import classes from "./panel.module.sass";

const getValue = (id) => document.getElementById(id).value;

function requestHandler(data, reload = true) {
    data.token = localStorage.getItem("token");

    const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    fetch("/api/match", options);
    reload ? location.reload() : null;
}

function updateMatch() {
    const match = {
        schools: [
            {
                name: document.getElementById("school-1-name").innerHTML,
                score: {
                    tries: getValue("school-1-tries"),
                    conversions: getValue("school-1-conversions"),
                    penalties: getValue("school-1-penalties"),
                    dropgoals: getValue("school-1-dropgoals"),
                },
            },
            {
                name: document.getElementById("school-2-name").innerHTML,
                score: {
                    tries: getValue("school-2-tries"),
                    conversions: getValue("school-2-conversions"),
                    penalties: getValue("school-2-penalties"),
                    dropgoals: getValue("school-2-dropgoals"),
                },
            },
        ],
    };

    requestHandler({ data: match }, false);
}

function startMatch() {
    const match = {
        firstHalfAt: new Date().getTime(),
    };

    requestHandler({ data: match });
}

function halftime() {
    const match = {
        halftime: true,
        halftimeAt: new Date().getTime(),
    };

    requestHandler({ data: match });
}

function endHalftime() {
    const match = {
        halftime: false,
        secondHalfAt: new Date().getTime(),
    };

    requestHandler({ data: match });
}
function endMatch() {
    const match = {
        finishedAt: new Date().getTime(),
    };

    requestHandler({ data: match });
}
function clearMatch() {
    const match = {
        live: false,
    };

    requestHandler({ data: match });
}

function ControlPanel(props) {
    const { match } = props;
    if (!match) {
        return (
            <section className={classes.panel}>
                <h1>Control</h1>
                <span>
                    <p>
                        No match going on to control. <br /> Create one to
                        start!
                    </p>
                </span>
            </section>
        );
    }

    return (
        <section className={classes.panel}>
            <h1>Control</h1>
            <fieldset>
                <legend>{match.title.toUpperCase()}</legend>
                {`${match.schools.map((item) => item.name).join(" vs ")}`}
            </fieldset>

            {match.firstHalfAt ? (
                <>
                    <form onChange={updateMatch} className={classes.form}>
                        {match.schools.map((school, i) => (
                            <div key={i} className={classes.scoreView}>
                                <fieldset>
                                    <legend id={`school-${i + 1}-name`}>
                                        {school.name}
                                    </legend>
                                    <table>
                                        <tr>
                                            <td>
                                                <label
                                                    htmlFor={`school-${
                                                        i + 1
                                                    }-tries`}
                                                >
                                                    Tries
                                                </label>
                                            </td>
                                            <td>
                                                <input
                                                    id={`school-${i + 1}-tries`}
                                                    name={`school-${
                                                        i + 1
                                                    }-tries`}
                                                    type='number'
                                                    required
                                                    defaultValue={
                                                        school.score.tries
                                                    }
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <label
                                                    htmlFor={`school-${
                                                        i + 1
                                                    }-conversions`}
                                                >
                                                    Conversions
                                                </label>
                                            </td>
                                            <td>
                                                <input
                                                    required
                                                    id={`school-${
                                                        i + 1
                                                    }-conversions`}
                                                    name={`school-${
                                                        i + 1
                                                    }-conversions`}
                                                    type='number'
                                                    defaultValue={
                                                        school.score.conversions
                                                    }
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <label
                                                    htmlFor={`school-${
                                                        i + 1
                                                    }-penalties`}
                                                >
                                                    Penalties
                                                </label>
                                            </td>
                                            <td>
                                                <input
                                                    required
                                                    id={`school-${
                                                        i + 1
                                                    }-penalties`}
                                                    name={`school-${
                                                        i + 1
                                                    }-penalties`}
                                                    type='number'
                                                    defaultValue={
                                                        school.score.penalties
                                                    }
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <label
                                                    htmlFor={`school-${
                                                        i + 1
                                                    }-dropgoals`}
                                                >
                                                    Drop Goals
                                                </label>
                                            </td>
                                            <td>
                                                <input
                                                    required
                                                    id={`school-${
                                                        i + 1
                                                    }-dropgoals`}
                                                    name={`school-${
                                                        i + 1
                                                    }-dropgoals`}
                                                    type='number'
                                                    defaultValue={
                                                        school.score.dropgoals
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </table>
                                </fieldset>
                            </div>
                        ))}
                    </form>
                </>
            ) : null}

            <div className={classes.additionalControls}>
                {!match.firstHalfAt ? (
                    <button onClick={startMatch}>Start Match</button>
                ) : null}
                {!match.halftimeAt && match.firstHalfAt ? (
                    <button onClick={halftime}>Halftime</button>
                ) : null}
                {match.halftime ? (
                    <button onClick={endHalftime}>End Halftime</button>
                ) : null}
                {!match.finishedAt && match.halftimeAt && !match.halftime ? (
                    <button onClick={endMatch}>End Match</button>
                ) : null}
                {match.finishedAt ? (
                    <button onClick={clearMatch}>Clear Match</button>
                ) : null}
            </div>
        </section>
    );
}

export default ControlPanel;
