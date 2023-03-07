import React, {useEffect, useMemo, useRef, useState} from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button} from "@mui/material";

const CodeEditorBox = ({ setGptQuery }) => {

    const [code, setCode] = useState('// Seek suggestions by starting a comment with "$" and then write your prompt (give it aa few seconds)\n\n// Write your code below\n');
    const [openAIQuery, setOpenAIQuery] = useState('');
    const isInitialMount = useRef(true);

    useEffect(() => {
        let timeout;
        if(isInitialMount.current){
            isInitialMount.current = false;
        }
        else {
            timeout = setTimeout(() => {
                setGptQuery(openAIQuery);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    },[openAIQuery])

    const handleClick = () => {
        eval(code);
    }

    const handleChange = async (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        if (newCode.toString().includes('//$')){
            setOpenAIQuery(newCode.split("//$").pop().split("\n")[0]);
        }
    }

    return (
        <div>
            <CodeEditor
                value={code}
                language="js"
                minHeight="46vh"
                data-color-mode="dark"
                placeholder="Please enter JS code."
                onChange={handleChange}
                padding={15}
                style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
            <Button style={{height: "4vh", position: "relative", right: "calc(36.72px - 50%)"}} onClick={handleClick}>Run</Button>
        </div>
    )
}

export default CodeEditorBox;
