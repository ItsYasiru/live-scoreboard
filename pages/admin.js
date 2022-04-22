import Head from 'next/head';
import CreatePanel from '../components/admin/CreatePanel';
import ControlPanel from '../components/admin/ControlPanel';

import classes from '../styles/admin.module.sass';


function AdminPage({ match }) {
    return (
        <>
            <Head>
                <title>TCMU - Live Scoreboard ｜ Admin</title>
                <link rel="icon" href="favicon.png" type="image/x-icon" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="TCMU - Live Scoreboard" />
                <meta property="og:description" content="Trinity college media unit live scoreboard." />
            </Head>

            <main className={classes.main}>
                <CreatePanel className={classes.none} />
                {match ? <ControlPanel match={match} /> : null}
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

export default AdminPage;
