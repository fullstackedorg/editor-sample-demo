import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import fs from "fs";

const countFile = "data/count.txt";
await fs.mkdir("data");

function Icon(props: { iconName: string }) {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        fetch(`assets/images/${props.iconName}.svg`)
            .then((res) => res.text())
            .then(setIcon);
    }, []);

    return <span dangerouslySetInnerHTML={{ __html: icon }} />;
}

async function loadCount() {
    if (!(await fs.exists(countFile))) return 0;
    return parseInt(await fs.readFile(countFile, { encoding: "utf8" }));
}

const initialCount = await loadCount();
function Counter() {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        fs.writeFile(countFile, count.toString());
    }, [count]);

    const decr = () => {
        setCount(count - 1);
    };
    const incr = () => {
        setCount(count + 1);
    };
    const reset = async () => {
        await fs.unlink(countFile);
        setCount(0);
    };

    return (
        <>
            <div>
                <button onClick={decr}>
                    <Icon iconName={"minus"} />
                </button>
                <div>
                    {count}
                </div>
                <button onClick={incr}>
                    <Icon iconName={"plus"} />
                </button>
            </div>
            <button onClick={reset}>
                <Icon iconName={"reset"} />
            </button>
        </>
    );
}

createRoot(document.getElementById("counter")).render(<Counter />);
