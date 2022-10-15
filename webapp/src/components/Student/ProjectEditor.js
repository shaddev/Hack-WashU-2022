import React, {useState, useRef} from "react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '../../css/UploadProject.css'

const ProjectEditor = (props) => {

    const [editorState, setEditorState] = props.editorAttributes;

     const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        console.log(newState)
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const onItalicClick = () => { 
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
        }
    
    const onBoldClick = () => { 
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
        }

    const editor = useRef(null);
    const focusEditor = () => {
        editor.current.focus();
        }


    return (
        <div className="editor" onClick={focusEditor}>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary" onMouseDown={onItalicClick}>
                        <strong><em>I</em></strong>
                    </button>
                    <button type="button" className="btn btn-secondary" onMouseDown={onBoldClick} >
                        <strong>B</strong>
                    </button>
                </div>
            </div>
            <Editor ref={editor}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    placeholder="Write something!" />
        </div>
    );
};

export default ProjectEditor;
