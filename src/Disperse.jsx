import React, { useState } from "react";

const Disperse = () => {
    const [inputText, setInputText] = useState("");
    const [inputRows, setInputRows] = useState([]);
    const [error, setError] = useState("");
    const regex = /[\s,=]/;
    const alphaRegex = /[a-zA-Z]/g;

    const Submit = () => {
        let err = "";
        const duplicateValues = {};
        if (inputText != "") {
            inputText.split("\n").map((i, v) => {
                if (regex.test(i)) {
                    if (alphaRegex.test(i.split(regex)[1])) {
                        err += `Line ${v + 1} wrong amount ${"\n"}`;
                    }
                } else {
                    err += `Invalid Address at line ${v + 1} ${"\n"}`;
                }
                if (duplicateValues[i.split(regex)[0]] === undefined) {
                    duplicateValues[i.split(regex)[0]] = [v + 1];
                } else {
                    duplicateValues[i.split(regex)[0]].push(v + 1);
                }
            });
            Object.keys(duplicateValues).map((value) => {
                const indices = duplicateValues[value];
                if (indices.length > 1) {
                    err += `Address ${value} encountered duplicate in Line ${duplicateValues[
                        value
                    ].join(", ")} \n`;
                }
            });
            setError(err);
        }
    };

    function KeepFirst() {
        const removeDuplicateData = {};
        for (const item of inputText.split("\n")) {
            const [key, value] = item.split(regex);
            if (!removeDuplicateData[key]) {
                removeDuplicateData[key] = [value];
            }
        }
        setInputText(
            Object.entries(removeDuplicateData)
                .map(([key, value]) => `${key} ${value}`)
                .join("\n")
        );
        setError("");
    }

    function CombineBalance() {
        const mergedData = {};

        for (const line of inputText.split("\n")) {
            const [key, value] = line.split(regex);
            if (mergedData[key]) {
                mergedData[key] += parseInt(value);
            } else {
                mergedData[key] = parseInt(value);
            }
        }

        setInputText(
            Object.entries(mergedData)
                .map(([key, value]) => `${key} ${value}`)
                .join("\n")
        );
        setError("");
    }

    return (
        <div>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={Submit}>Submit</button>
            {error && (
                <p>
                    <button onClick={KeepFirst}>Keep First One</button> |{" "}
                    <button onClick={CombineBalance}>Combine Balances</button> <br />
                    <br />
                    {error}
                </p>
            )}
        </div>
    );
};

export default Disperse;