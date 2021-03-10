import { Switch, Route, Redirect } from 'react-router-dom';
import HomeScreen from '../Screens/HomeScreen';
import Login from '../Screens/Login';
import Profile from '../Screens/Profile';

const AppRoutes = () => {
    const name = localStorage.getItem('username');
    console.log(!name);
    return (
        <>
            {!name ? (
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Redirect to="/" />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/dashboard" component={HomeScreen} />
                    <Route path="/profile" component={Profile} />

                    <Redirect to="/dashboard" />
                </Switch>
            )}
        </>
    );
};

export default AppRoutes;
