import classes from "./panel.module.sass";
import { toTitleCase } from "../../utils/textFormatting";

const getValue = (id) => document.getElementById(id).value;

async function createMatch(event) {
    const startsAt = new Date(
        `${document.getElementById("startsAtDate").value} ${
            document.getElementById("startsAtTime").value
        }`,
    );

    const score = {
        tries: 0,
        conversions: 0,
        penalties: 0,
        dropgoals: 0,
    };

    const match = {
        gamemode: getValue("gamemode").toLowerCase(),
        title: getValue("title"),
        schools: [
            {
                name: getValue("school-1").slice(0, 3),
                score: score,
            },
            {
                name: getValue("school-2").slice(0, 3),
                score: score,
            },
        ],
        startsAt: startsAt.getTime(),
        live: true,
    };

    const data = {
        data: match,
        token: localStorage.getItem("token"),
    };

    const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    fetch("/api/match", options);
    location.reload();
}

function CreatePanel() {
    let schools = [
        "TCK - Trinity College",
        "DHA - Dharmaraja College",
        "KNG - Kingswood College",
        "RAH - Rahula College",
        "SAC - St. Anthony&apos;s College",
        "SUM - Sumangala College",
        "SYL - St. Sylvester&apos;s College",
        "VID - Vidyartha College",
        "STC - St. Thomas College",
    ];

    let gamemodes = ["rugby", "cricket"];

    return (
        <section className={classes.panel}>
            <h1>Create</h1>
            <form className={classes.form}>
                <span>
                    <label>Title</label>
                    <input required id='title' name='title' />

                    <label>Gamemode</label>
                    <select required id='gamemode' name='gamemode'>
                        {gamemodes.map((item, i) => (
                            <option key={i}>{toTitleCase(item)}</option>
                        ))}
                    </select>

                    <label>Starts At</label>
                    <input
                        required
                        id='startsAtDate'
                        name='startsAtDate'
                        type='date'
                    />
                    <input
                        required
                        id='startsAtTime'
                        name='startsAtTime'
                        type='time'
                    />
                </span>

                <span>
                    <label htmlFor='school-1'>School 1</label>
                    <select required id='school-1' name='school-1'>
                        {schools.map((item, i) => (
                            <option key={i}>{item}</option>
                        ))}
                    </select>

                    <label htmlFor='school-2'>School 2</label>
                    <select required id='school-2' name='school-1'>
                        {schools.map((item, i) => (
                            <option key={i}>{item}</option>
                        ))}
                    </select>
                </span>

                <button onClick={createMatch} type='button'>
                    Create Match
                </button>
            </form>
        </section>
    );
}

export default CreatePanel;
