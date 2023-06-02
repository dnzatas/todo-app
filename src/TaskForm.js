import { useState } from "react";

export default function TaskForm({onAdd}){
    const [name, SetName] = useState('');

    function handleSubmit(ev){
        ev.preventDefault();
        onAdd(name);
        SetName('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input type='text' 
                   value={name}
                   onChange={ev => SetName(ev.target.value)} 
                   placeholder="Next task..." />
        </form>
    );
}