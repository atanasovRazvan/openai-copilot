import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CircularProgress } from "@mui/material";
import fetchResponse from "./openaiRequest";

const CodeSuggestionBox = ({ gptQuery }) => {

    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const headline = useMemo(() => '// Your suggestion will appear here', []);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }
        else {
            setIsLoading(true);
            fetchResponse("https://api.openai.com/v1/completions", process.env.OPENAI_API_KEY, gptQuery)
                .then((data) => {
                    setCode(data.choices[0].text);
                })
                .finally(() => setIsLoading(false));
        }
    }, [gptQuery])

    return (
        <div style={{position: "relative"}}>
            <CodeEditor
                value={`${headline}\n${code}`}
                language="js"
                minHeight="50vh"
                data-color-mode="dark"
                placeholder="Please enter JS code."
                onChange={(event) => setCode(event.target.value)}
                padding={15}
                disabled
                style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
            {
                isLoading
                    ? <CircularProgress style={{position: "absolute", right: "calc(50% - 40px)", top: "calc(50% - 40px)"}} />
                    : null
            }
        </div>
    )
}

export default CodeSuggestionBox;
