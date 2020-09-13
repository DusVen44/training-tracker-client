import React from 'react';
import { Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Notebook from '../Notebook/Notebook';
import NewWorkout from '../NewWorkout/NewWorkout';
import History from '../History/History';
import AddExercise from '../AddExercise/AddExercise';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';

export default function MainContainer() {
    return (
        <div className="main-container">
            <Switch>
                <PublicOnlyRoute exact path='/' component={Landing} />
                <PublicOnlyRoute path='/signup' component={Signup} />
                <PublicOnlyRoute path='/login' component={Login} />
                <PrivateRoute path='/notebook' component={Notebook} />
                <PrivateRoute path='/new-workout/:routine_id' component={NewWorkout} />
                <PrivateRoute path='/history/:user_id' component={History} />
                <PrivateRoute path='/add-exercise' component={AddExercise} />
            </Switch>
            
        </div>
    )
}
