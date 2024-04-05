import React, { useState } from "react";
import Navbar from "../../Navbar";
import DropDown from "./dropdowns";
import { Route, useNavigate } from "react-router-dom";

export default function IncidentForm (props) {

    const [title, settitle] = useState('');
    const [description, setDescription] = useState('');
	const [project, setProjectCode] = useState('');
	const [priority, setPriority] = useState('');
	const priorities = ['HIGH', 'MEDIUM', 'LOW'];
    const navigate = useNavigate();
    function setTitle(e) {
        settitle(e.target.value);
    }
    async function handleFormSubmit(e) {
        e.preventDefault();
    	console.log(e);
    	console.log('Form submit code ');
        const payload = {
            "title": title,
            "description": description,
            "projectId": project,
            "typeId": "Bug",
            "priority": priority,
            "assignedDeveloperId": props.userName
          };
        try {
            const response = await fetch('http://localhost:8080/api/create/Tickets', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            alert('Failed to create Project');
          }    
          else {
            alert('Project created Successfully');
            navigate('/home');
          }
        } catch (error){
            alert(error);
        }
    }

    return (
        <div>
            <Navbar userName={props.userName}/>
            <h1 style={{"textAlign": "center"}}>Create Incident</h1>
            <hr style={{"height": '2px'}}/>
            <table>
                <tr>
                    <td>
                        <h2>Title</h2>
                    </td>
                    <td>
                        <input name="title" value = {title} onChange={setTitle}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>Description</h2>
                  	</td>
                  	<td>
                  		<textarea name="description" type="textarea"
                  		onChange={(e) => setDescription(e.target.value)} rows="4" cols="50">

                        </textarea>
                  	</td>
                </tr>
                <tr>
                    <td>
                        <h2>Project Code</h2>
                    </td>
                	<td>
                		<input name="project code"
                		onChange={(e) => setProjectCode(e.target.value)}/>
					</td>
                </tr>
                <tr>
                	<td><h2>Priority</h2></td>
                	<td>
						<DropDown options={priorities} removable={false} selected={priority}
                		setter={setPriority}></DropDown>
                    </td>
                </tr>
                <tr>
                    <td></td>
                	<td style={{"textAlign":"left"}}>
                	<form onSubmit = {handleFormSubmit}>
						<button type = {'submit'}>Click to submit</button>
					</form>
                    </td>
                </tr>
            </table>
        </div>
    );
}