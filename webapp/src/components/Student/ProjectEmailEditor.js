import React from "react";
import { ReactMultiEmail, isEmail } from 'react-multi-email';

const ProjectEmailEditor = (props) => {

    const [emails, setEmails] = props.emailsAttributes;
    
    return (
        <div>
            <h3>Email</h3>
            <ReactMultiEmail
            emails={emails}
            onChange={setEmails}
            validateEmail={email => {
                return isEmail(email)
                
            }}
            getLabel={(
                email,
                index,
                removeEmail,
            ) => {
                return (
                <div data-tag key={index}>
                    {email}
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => removeEmail(index)}></button>
                </div>
                );
            }}
            />
            <br />
        </div>
        );

};

export default ProjectEmailEditor;
