import config from '../config';
import TokenService from './token-service';

const apiService = {
    getAllExercises() {
        return fetch(`${config.API_ENDPOINT}/exercises`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
        .catch(error => {
            alert('Could not connect to Exercise List', error)
        })        
    }
};