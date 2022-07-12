import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/buildClient'
import Header from '../components/header'

// export default ({ Component, pageProps }) => {
//     return <div>
//         <h1>sdadsa</h1>
//         <Component {...pageProps} />
//         </div>
// };

function _app({ Component, pageProps, currentUser }) {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
    )
}

_app.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)

    }
    return { pageProps, ...data };
}

export default _app