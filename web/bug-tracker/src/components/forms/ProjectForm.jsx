import React, { useState } from "react";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";

export default function ProjectForm (props) {

    const [projectName, setProjectName] = useState('');
    const [projectCode, setprojectCode] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(e) {
        e.preventDefault();
        const payload = {
            "name": projectName,
            "code": projectCode,
            "projectManagerId": projectManager
        };
        try {
            const response = await fetch('http://localhost:8080/api/create/projects', {
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
    };

    return (
        <div>
            <Navbar userName={props.userName}/>
            <h1 style={{"textAlign": "center"}}>Create Project</h1>
            <hr style={{"height": '2px'}}/>
            <table style={{}}>
            <tr>
                    <td>
                        <h2>Project Name</h2>
                    </td>
                    <td>
                        <input name="projectName" value = {projectName} onChange={(e) => setProjectName(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>Project Code</h2>
                    </td>
                    <td>
                        <input name="projectCode" value = {projectCode} onChange={(e) => setprojectCode(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>Project Manager</h2>
                    </td>
                    <td>
                        <input name="projectManager" value = {projectManager} onChange={(e) => setProjectManager(e.target.value)}/>
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
    )

}
// Project Name	Project Code	Project Manager

