import Image from "next/image";
import { toTitleCase } from "../../utils/textFormatting";

import classes from "./SchoolCard.module.sass";

function SchoolCard(props) {
    const { match, school } = props;

    const { name, score } = school;

    let scoreTable = Array();

    switch (match.gamemode) {
        case "rugby": {
            score.total =
                score.tries * 5 +
                score.conversions * 2 +
                score.dropgoals * 3 +
                score.penalties * 3;

            scoreTable.push(
                ["tries", score.tries],
                ["conversions", score.conversions],
                ["penalties", score.penalties],
                ["dropgoals", score.dropgoals],
            );
            break;
        }
        case "cricket": {
            score.total = score.runs;

            scoreTable.push(
                ["runs", score.tries],
                ["wickets", score.conversions],
                ["overs", score.penalties],
            );
            break;
        }
    }

    console.log("Score table set!");
    console.log(scoreTable);

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
                    {scoreTable.map((items, i) => (
                        <tr key={i}>
                            {items.map((trItem, j) => (
                                <td key={j}>{toTitleCase(trItem)}</td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default SchoolCard;
