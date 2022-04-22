import moment from 'moment';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Timer from '../components/Timer';
import CardHolder from '../components/index/CardHolder';
import SchoolCard from '../components/index/SchoolCard';

import classes from '../styles/index.module.sass';


function IndexPage(props) {
    const { match } = props;

    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    setTimeout(refreshData, 60 * 1000);

    if (match) {
        const dateString = match.startsAt ? moment(match.startsAt).format('MMMM Do h:mm a') : null
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
                    <div className={classes.title}>
                        <h1>{match.title ? match.title : 'Live Scoreboard'}</h1>
                        {match.title ? <label>TCMU - Live Scoreboard</label> : null}
                    </div>

                    {(match) ?
                        <CardHolder>

                            <SchoolCard school={match.schools[0]} />

                            <div className={classes.matchDetails}>
                                {(!match.startedAt) ? <label>{dateString}</label> : null}
                                {(match.startedAt) ? <Timer startedAt={match.startedAt} finishedAt={match.finishedAt} /> : null}
                                {(match.startedAt && !match.halftimeAt) ? <label>1st Half</label> : null}
                                {(match.halftimeAt) ? <label>2nd Half</label> : null}
                            </div>


                            <SchoolCard school={match.schools[1]} />
                        </CardHolder>
                        :
                        <label className={classes.noData}>No data available!</label>
                    }

                    <div className={classes.logoRail}>
                        <Image src='/images/TCMU-Logo-Dark.png' alt="TCMU Logo" width='80' height='23' />
                        <Image src='/images/College-Logo.png' alt="College Logo" width='72' height='40' />
                    </div>
                </main>
            </>
        );
    } else {
        return (
            <>
                <Head>
                    <title>TCMU - Live Scoreboard</title>
                    <link rel="icon" href="favicon.png" type="image/x-icon" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="TCMU - Live Scoreboard" />
                    <meta property="og:description" content="Trinity college media unit live scoreboard." />
                </Head>

                <main className={classes.main}>
                    <div className={classes.title}>
                        <h2 style={{ margin: '20px', fontSize: '30px', fontWeight: '500' }}>Nothings going on come back later.</h2>
                    </div>


                    <div className={classes.logoRail}>
                        <Image src='/images/TCMU-Logo-Dark.png' alt="TCMU Logo" width='80' height='23' />
                        <Image src='/images/College-Logo.png' alt="College Logo" width='72' height='40' />
                    </div>
                </main>
            </>
        );
    }
};

export async function getServerSideProps() {
    const { data, success } = await (await fetch("https://live-scoreboard.vercel.app/api/match")).json();

    if (success) {
        return {
            props: {
                match: data
            }
        };
    };

};

export default IndexPage;
