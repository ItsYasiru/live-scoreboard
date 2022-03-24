import Image from 'next/image';

import classes from './SchoolCard.module.sass';


function SchoolCard({ school }) {
    const { name, image, score } = school;

    return (
        <div className={classes.main}>
            <div className={classes.crestHolder}>
                <Image src={image} alt="School Crest" width="100" height="160" />
            </div>

            <div className={classes.data}>
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
                        <td>{score.dropGoals}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default SchoolCard;
