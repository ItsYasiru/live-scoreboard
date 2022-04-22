import classes from './panel.module.sass';


const getValue = (id) => (document.getElementById(id).value);

async function createMatch(event) {
    const startsAt = new Date(`${document.getElementById("startsAtDate").value} ${document.getElementById("startsAtTime").value}`);

    const score = {
        tries: 0,
        conversions: 0,
        penalties: 0,
        dropgoals: 0
    };

    const match = {
        title: getValue("title"),
        schools: [
            {
                name: getValue("school-1").slice(0, 3),
                score: score
            },
            {
                name: getValue("school-2").slice(0, 3),
                score: score
            }
        ],
        startsAt: startsAt.getTime(),
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

    fetch("https://live-scoreboard.vercel.app/api/match", options);
};

function CreatePanel() {
    let options = [
        'TCK - Trinity College',
        'DHA - Dharmaraja College',
        'KNG - Kingswood College',
        'RAH - Rahula College',
        'SAC - St. Anthony&apos;s College',
        'SUM - Sumangala College',
        'SYL - St. Sylvester&apos;s College',
        'VID - Vidyartha College',
        'STC - St. Thomas College'
    ]
    return (
        <section className={classes.panel}>
            <h1>Create</h1>
            <form className={classes.form}>
                <span>
                    <label>Title</label>
                    <input required id="title" name="title" />

                    <label>Starts At</label>
                    <input required id="startsAtDate" name="startsAtDate" type="date" />
                    <input required id="startsAtTime" name="startsAtTime" type="time" />
                </span>

                <span>
                    <label htmlFor="school-1">School 1</label>
                    <select required id="school-1" name="school-1">
                        {options.map((item, i) => <option key={i}>{item}</option>)}
                    </select>

                    <label htmlFor="school-2">School 2</label>
                    <select required id="school-2" name="school-1">
                        {options.map((item, i) => (<option key={i}>{item}</option>))}
                    </select>
                </span>

                <button onClick={createMatch}>Create Match</button>
            </form>
        </section>
    );
};

export default CreatePanel;
