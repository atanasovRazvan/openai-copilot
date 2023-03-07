import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Grid, Paper} from "@mui/material";
import CodeEditorBox from "./components/CodeEditorBox";
import CodeSuggestionBox from "./components/CodeSuggestionBox";

const App = () => {

    const [gptQuery, setGptQuery] = useState('');

    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Paper>
                    <CodeEditorBox setGptQuery={setGptQuery}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <CodeSuggestionBox gptQuery={gptQuery}/>
                </Paper>
            </Grid>
        </Grid>
    )
};
ReactDOM.render(<App />, document.getElementById("app"));
