import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
    // console.log(currentUser);
    // axios.get('/api/users/currentuser');

    return currentUser ? <h1>You are signin</h1> : <h1>You are not sign in</h1>
};

LandingPage.getInitialProps = async (context) => {
    console.log('LANDING PAGE!');
    const { data } = await buildClient(context).get('/api/users/currentuser')
    return data;
};

export default LandingPage;
