import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CircularProgress } from "@mui/material";
import { Configuration, OpenAIApi } from "openai";

const CodeSuggestionBox = ({ gptQuery }) => {

    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const headline = useMemo(() => '// Your suggestion will appear here', []);
    const isInitialMount = useRef(true);
    const api = useMemo(() =>
        new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        }))
    , []);

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }
        else {
            setIsLoading(true);
            const completion = api.createCompletion({
                model: "text-davinci-003",
                prompt: `${gptQuery}, in JavaScript`,
                max_tokens: 1000,
                temperature: 0,
                top_p: 1,
                n: 1,
                stream: false,
                logprobs: null,
            });
            completion.then((res) => {
                console.log(res.data);
                console.log(res.data.choices[0]);
                setCode(res.data.choices[0].text);
            })
                .finally(() => setIsLoading(false))
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
