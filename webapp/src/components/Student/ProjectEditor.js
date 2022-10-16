import React, {useState, useRef} from "react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '../../css/UploadProject.css';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

    const onUnderlineClick = () => { 
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
        }

    const editor = useRef(null);
    const focusEditor = () => {
        editor.current.focus();
        }


    return (
        <div className="editor" onClick={focusEditor}>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button value="bold" aria-label="bold" onMouseDown={onBoldClick}>
                        <FormatBoldIcon />
                    </Button>
                    <Button value="italic" aria-label="italic" onMouseDown={onItalicClick}>
                        <FormatItalicIcon />
                    </Button>
                    <Button value="underlined" aria-label="underlined" onMouseDown={onUnderlineClick}>
                        <FormatUnderlinedIcon />
                    </Button>
                </ButtonGroup>
            </div>
            <Editor ref={editor}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    placeholder="Write your story here!" />
        </div>
    );
};

export default ProjectEditor;
