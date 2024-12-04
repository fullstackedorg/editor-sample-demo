import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import fs from "fs";

const countFile = "data/count.txt";
const idFile = "data/id.txt";
await fs.mkdir("data");

let id: string;
if (await fs.exists(idFile)) {
    id = await fs.readFile(idFile, { encoding: "utf8" });
} else {
    id = Math.floor(Math.random() * 10000).toString();
    await fs.writeFile(idFile, id);
}

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

type CountCRDT = {
    [id: string]: number;
};

// let throttler: ReturnType<typeof setTimeout> = null;
// const sendCount = (count: number) => {
//     if(throttler) clearTimeout(throttler);
    
//     throttler = setTimeout(() => {
//         broadcast(JSON.stringify({ id, count }));
//         throttler = null;
//     }, 750);
// };

const initialCount = await loadCount();
function Counter() {
    const [counter, setCounter] = useState<CountCRDT>({
        [id]: initialCount
    });

    // useEffect(() => {
    //     sendCount(counter[id]);
    // }, []);

    useEffect(() => {
        // window.onPush["peerData"] = (message: string) => {
        //     const peerCount = JSON.parse(message);

        //     if (counter[peerCount.id] === undefined) {
        //         sendCount(counter[id]);
        //     }

        //     counter[peerCount.id] = peerCount.count;
        //     setCounter({ ...counter });
        // };

        fs.writeFile(countFile, counter[id].toString());
    }, [counter]);

    const decr = () => {
        counter[id] -= 1;
        setCounter({ ...counter });
        sendCount(counter[id]);
    };
    const incr = () => {
        counter[id] += 1;
        setCounter({ ...counter });
        sendCount(counter[id]);
    };
    const reset = () => {
        ipc
            .fs.unlink(countFile)
            .then(() => {
                setCounter({
                    [id]: 0
                });
                sendCount(0);
            });
    };

    return (
        <>
            <div>
                <button onClick={decr}>
                    <Icon iconName={"minus"} />
                </button>
                <div>
                    {Object.values(counter).reduce((tot, count) => tot + count)}
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
