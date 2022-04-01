import classes from './CreateSection.module.sass';


async function createMatch(event) {
    const startsAt = new Date(`${document.getElementById("startsAtDate").value} ${document.getElementById("startsAtTime").value}`);

    const score = {
        tries: 0,
        conversions: 0,
        penalties: 0,
        dropgoals: 0
    };

    const match = {
        schools: [
            {
                name: document.getElementById("school1").value,
                score: score
            },
            {
                name: document.getElementById("school2").value,
                score: score
            }
        ],
        startsAt: startsAt.getTime(),
        endsAt: null,
        startedAt: null,
        endedAt: null,
        halftimeAt: null,
        live: true
    };

    const data = {
        data: match,
        token: "X"
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    await fetch("http://localhost:3000/api/match", options);
};

function CreateSection() {
    return (
        <section>
            <h1>Create</h1>
            <form className={classes.form} onSubmit={createMatch}>
                <span>
                    <label>Starts At</label>
                    <input required id="startsAtDate" name="startsAtDate" type="date" />
                    <input required id="startsAtTime" name="startsAtTime" type="time" />
                </span>

                <span>
                    <label htmlFor="school1">School 1</label>
                    <input required id="school1" name="school1" type="text" />

                    <label htmlFor="school2">School 2</label>
                    <input required id="school2" name="school2" type="text" />

                    <ul>
                        <h3>Valid school names</h3>

                        <li>TCK - Trinity College</li>
                        <li>DHA - Dharmaraja College</li>
                        <li>KNG - Kingswood College</li>
                        <li>RAH - Rahula College</li>
                        <li>SAC - St. Anthony&apos;s College</li>
                        <li>SUM - Sumangala College</li>
                        <li>SYL - St. Sylvester&apos;s College</li>
                        <li>VID - Vidyartha College</li>
                        <li>STC - St. Thomas College</li>
                    </ul>
                </span>

                <button onClick={createMatch}>Submit</button>
            </form>
        </section>
    );
};

export default CreateSection;
