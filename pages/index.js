import Head from 'next/head';
import Image from 'next/image';
import Timer from '../components/Timer';
import CardHolder from '../components/CardHolder';
import SchoolCard from '../components/SchoolCard';

import classes from '../styles/index.module.sass';


function IndexPage({ match }) {
    return (
        <>
            <Head>
                <title>TCMU - Live Scoreboard</title>
                <link rel="icon" href="favicon.png" type="image/x-icon" />
            </Head>
            <main className={classes.main}>
                <div className={classes.logo}>
                    <Image src='/TCMU-Logo-Dark.png' alt="TCMU Logo" width='161' height='47' />
                </div>

                <CardHolder>
                    <SchoolCard school={match.schools[0]} />
                    <Timer match={match} />
                    <SchoolCard school={match.schools[1]} />
                </CardHolder>
            </main>
        </>
    );
};

export function getServerSideProps() {
    return {
        props: {
            match: {
                startTime: null,
                endTime: null,
                started: null,
                halfTime: null,
                schools: [
                    {
                        name: "Trinity",
                        image: "/TCK.png",
                        score: {
                            tries: 4,
                            conversions: 3,
                            penalties: 0,
                            dropGoals: 0
                        }
                    },
                    {
                        name: "St. Thomas",
                        image: "/TCK.png",
                        score: {
                            tries: 1,
                            conversions: 2,
                            penalties: 2,
                            dropGoals: 0
                        }
                    }
                ],
            }
        }
    };
};

export default IndexPage;
