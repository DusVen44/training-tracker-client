import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
export default function(props) {
    return (
      <div>
        <Calendar 
            onChange={props.onChange}
            value={props.value}/>
      </div>
    );
  
}