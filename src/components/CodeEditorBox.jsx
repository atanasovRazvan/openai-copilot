import React, {useEffect, useRef, useState} from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const CodeEditorBox = ({ setGptQuery }) => {

    const [code, setCode] = useState('// Seek suggestions by starting a comment with "$" and then write your prompt (give it aa few seconds)\n\n// Write your code below\n');
    const [openAIQuery, setOpenAIQuery] = useState('');
    const isInitialMount = useRef(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState("");

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
        setResult(eval(code));
        setIsModalOpen(true);
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
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    Your script ran without errors
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Result: {result}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CodeEditorBox;
