import React from 'react';
import { Switch } from 'react-router-dom';
import './MainContainer.css';
import Landing from '../Landing/Landing';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Notebook from '../Notebook/Notebook';
import NewWorkout from '../NewWorkout/NewWorkout';
import History from '../History/History';
import AddExercise from '../AddExercise/AddExercise';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
// import ProgramList from '../../Components/ProgramList/ProgramList';
// import ProgramRoutines from '../ProgramRoutines/ProgramRoutines';

export default function MainContainer() {
    return (
        <div className="main-container">
            <Switch>
                <PublicOnlyRoute exact path='/' component={Landing} />
                <PublicOnlyRoute path='/signup' component={Signup} />
                <PublicOnlyRoute path='/login' component={Login} />
                <PrivateRoute path='/notebook' component={Notebook} />
                <PrivateRoute path='/new-workout/new' component={NewWorkout} />
                <PrivateRoute path='/:user_id/history' component={History} />
                <PrivateRoute path='/add-exercise' component={AddExercise} />
                {/* <PrivateRoute path='/:user_id/program-list' component={ProgramList} />
                <PrivateRoute path='/:user_id/:program-name' component={ProgramRoutines} /> */}
            </Switch>
            
        </div>
    )
}
