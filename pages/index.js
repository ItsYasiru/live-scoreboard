import moment from "moment";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Timer from "../components/Timer";
import CardHolder from "../components/index/CardHolder";
import SchoolCard from "../components/index/SchoolCard";

import classes from "../styles/index.module.sass";

const URL = process.env.URL + "/api/match";

function IndexPage(props) {
    const { match } = props;

    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };
    setTimeout(refreshData, 60 * 1000);

    const dateString = match
        ? moment(match.startsAt).format("MMMM Do h:mm a")
        : null;
    return (
        <>
            <Head>
                <title>TCMU - Live Scoreboard</title>
                <link rel='icon' href='favicon.png' type='image/x-icon' />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='TCMU - Live Scoreboard' />
                <meta
                    property='og:description'
                    content='Trinity college media unit live scoreboard.'
                />
            </Head>

            <main className={classes.main}>
                {match ? (
                    <CardHolder
                        title={
                            <div className={classes.title}>
                                <h1>
                                    {match.title
                                        ? match.title
                                        : "Live Scoreboard"}
                                </h1>
                                {match.title ? (
                                    <label>TCMU - Live Scoreboard</label>
                                ) : null}
                            </div>
                        }
                    >
                        <SchoolCard school={match.schools[0]} />

                        {!match.finishedAt ? (
                            <div className={classes.matchDetails}>
                                {!match.firstHalfAt ? (
                                    <label>{dateString}</label>
                                ) : null}

                                {match.firstHalfAt ? (
                                    <Timer
                                        firstHalfAt={
                                            match.secondHalfAt
                                                ? match.secondHalfAt
                                                : match.firstHalfAt
                                        }
                                        finishedAt={
                                            match.halftimeAt && match.halftime
                                                ? match.halftimeAt
                                                : match.finishedAt
                                        }
                                        offset={100}
                                    />
                                ) : null}

                                {match.firstHalfAt &&
                                !match.halftimeAt &&
                                !match.halftime ? (
                                    <label>1st Half</label>
                                ) : null}

                                {match.halftime ? (
                                    <label>Halftime</label>
                                ) : null}

                                {match.halftimeAt && !match.halftime ? (
                                    <label>2nd Half</label>
                                ) : null}
                            </div>
                        ) : null}

                        <SchoolCard school={match.schools[1]} />
                    </CardHolder>
                ) : (
                    <label className={classes.noData}>
                        Came back later, nothing is going on!
                    </label>
                )}

                <div className={classes.logoRail}>
                    <Image
                        src='/images/TCMU-Logo-Dark.png'
                        alt='TCMU Logo'
                        width='80'
                        height='23'
                    />
                    <Image
                        src='/images/College-Logo.png'
                        alt='College Logo'
                        width='72'
                        height='40'
                    />
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const { data, success } = await (await fetch(URL)).json();

    if (success) {
        return {
            props: {
                match: data,
            },
        };
    }
}

export default IndexPage;
