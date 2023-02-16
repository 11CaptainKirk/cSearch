import { Button } from "@mantine/core";
import browser from "browser-detect";

export default function FileLoad() {
    let fileHandle;
    let contents = "No file loaded";
    return (
        <>
            <Button
                onClick={async () => {
                    const user = browser();
                    if (user.name === "safari") {
                        alert("OH NO! You're using the Safari browser. This feature is not supported on Safari.");
                        return;
                    }
                    if (user.name === "chrome") {
                        // @ts-expect-error
                        [fileHandle] = await window.showOpenFilePicker(); // causes error because still experimental
                        const file = await fileHandle.getFile();
                        contents = await file.text();
                        //console.log(contents);
                    }
                }}>
                Open File Button
            </Button>
            <Button
                onClick={async () => {
                    let stream = await fileHandle.createWritable(); // causes error because still experimental
                    contents += "wow";
                    //console.log(contents);
                    await stream.write(contents);
                    await stream.close();
                }}>
                Save File Button
            </Button>
        </>
    );
}
