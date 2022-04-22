import Image from "next/image";

import classes from "./SchoolCard.module.sass";

function SchoolCard({ school }) {
    const { name, score } = school;

    const total =
        score.tries * 5 +
        score.conversions * 2 +
        score.dropgoals * 3 +
        score.penalties * 3;
    score.total = total;

    return (
        <div className={classes.main}>
            <div className={classes.crestHolder}>
                <Image
                    src={`/images/crests/${name}.png`}
                    alt='School Crest'
                    width='100'
                    height='160'
                />
            </div>

            <div className={classes.data}>
                <h2>{score.total}</h2>
                <h1>{name}</h1>
                <table>
                    <tr>
                        <td>Tries</td>
                        <td>{score.tries}</td>
                    </tr>
                    <tr>
                        <td>Conversions</td>
                        <td>{score.conversions}</td>
                    </tr>
                    <tr>
                        <td>Penalties</td>
                        <td>{score.penalties}</td>
                    </tr>
                    <tr>
                        <td>Drop Goals</td>
                        <td>{score.dropgoals}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default SchoolCard;
