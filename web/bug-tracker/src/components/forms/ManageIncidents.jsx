import React, { useState } from "react";
import Navbar from "../../Navbar";
import DropDown from "./dropdowns";

export default function ManageIncident (props) {

	const [priority, setPriority] = useState('');
	const [user, setUser] = useState(null);
	const assignableUsers = ['GOKU', 'NAKU VADDHU'];
	const priorities = ['HIGH', 'MEDIUM', 'LOW'];

    function handleFormSubmit(e) {
    	console.log(e);
    	console.log('Form submit code ');
    }
	function handlePriorityChange(e) {
		if(e.target.value !== props.priority) {
			setPriority(e.target.value);
		}
	}
    function getAssignableUsers() {
		if(user) {
			return ['Remove Assignment', ...assignableUsers];
		}
		return ['Unassigned', ...assignableUsers];
	}

	function handleAssignUser(e) {
		const v = e.target.value;
		if(v === 'Remove Assignment' || v === 'Unassigned') {
			setUser(null);
		}
		else {
			setUser(v);
		}
	}

    return (
        <div>
            <Navbar userName={props.userName}/>
            <h1>Manage Incident</h1>
            <hr style={{"height": '2px'}}/>
            <table>
                <tr>
                    <td>
                        <h2>Title</h2>
                    </td>
                    <td>
                        <h3>{props.title}</h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>Description</h2>
                  	</td>
                  	<td>
                  		<textarea name="description" type="textarea"
                  		rows="8" cols="100">
                  		{props.description}
                        </textarea>
                  	</td>
                </tr>
                <tr>
                    <td>
                        <h2>Project Code</h2>
                    </td>
                	<td>
                		<h3>{props.projectCode}</h3>
					</td>
                </tr>
                <tr>
                	<td><h2>Priority</h2></td>
                	<td>
                		<DropDown options={priorities} removable={false} selected={priority}
                		setter={setPriority}/>
                    </td>
                </tr>
                <tr>
                	<td><h2>Assigned to</h2></td>
                	<td>
                		<DropDown options={assignableUsers} removable={true} selected={user}
                		setter={setUser}/>
                    </td>
                </tr>

                <tr>
                    <td></td>
                	<td style={{"text-align":"right"}}>
                	<form onSubmit = {handleFormSubmit}>
						<button type = {'submit'}>Submit changes</button>
					</form>
                    </td>
                </tr>
            </table>
        </div>
    );
}