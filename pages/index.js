import moment from 'moment';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Timer from '../components/Timer';
import CardHolder from '../components/index/CardHolder';
import SchoolCard from '../components/index/SchoolCard';

import classes from '../styles/index.module.sass';


function IndexPage({ match }) {
    const router = useRouter();
    const refreshData = () => {
        console.log("Refreshing!")
        router.replace(router.asPath);
    }
    setTimeout(refreshData, 60 * 1000);

    const dateString = match.startsAt ? moment(match.startsAt).format('MMMM Do h:mm a') : null;
    return (
        <>
            <Head>
                <title>TCMU - Live Scoreboard{match.title ? ` ｜ ${match.title}` : undefined}</title>
                <link rel="icon" href="favicon.png" type="image/x-icon" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="TCMU - Live Scoreboard" />
                <meta property="og:description" content="Trinity college media unit live scoreboard." />
            </Head>

            <main className={classes.main}>
                <h1 className={classes.title}>{match.title}</h1>

                {(match) ?
                    <CardHolder>

                        <SchoolCard school={match.schools[0]} />

                        <div className={classes.matchDetails}>
                            {(!match.startedAt) ? <label>{dateString}</label> : null}
                            {(match.startedAt) ? <Timer startedAt={match.startedAt} finishedAt={match.finishedAt} /> : null}
                            {(match.startedAt && !match.halftimeAt) ? <label>1st Half</label> : null}
                            {(match.halftimeAt) ? <label>2st Half</label> : null}
                        </div>


                        <SchoolCard school={match.schools[1]} />
                    </CardHolder>
                    :
                    <label className={classes.noData}>No data available!</label>
                }

                <div className={classes.logoRail}>
                    <Image src='/images/TCMU-Logo-Dark.png' alt="TCMU Logo" width='80' height='23' />
                    <Image src='/images/College-Logo.png' alt="College Logo" width='72' height='41' />
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const { data, success } = await (await fetch("http://localhost:3000/api/match")).json();

    if (success) {
        return {
            props: {
                match: data
            }
        };
    };

};

export default IndexPage;
