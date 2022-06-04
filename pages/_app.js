import Script from "next/script";

import "../styles/_app.sass";

function App({ Component, pageProps }) {
    return (
        <>
            <Script
                src='https://kit.fontawesome.com/1f97a9749c.js'
                crossOrigin='anonymous'
            ></Script>
            <Component {...pageProps} />
        </>
    );
}

export default App;
