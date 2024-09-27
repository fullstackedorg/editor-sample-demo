import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const countFile = "data/count.txt";
const idFile = "data/id.txt";
await rpc().fs.mkdir("data");

let id: string;
if (await rpc().fs.exists(idFile)) {
    id = await rpc().fs.readFile(idFile, { encoding: "utf8" });
} else {
    id = Math.floor(Math.random() * 10000).toString();
    await rpc().fs.writeFile(idFile, id);
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
    if (!(await rpc().fs.exists(countFile))) return 0;

    return parseInt(await rpc().fs.readFile(countFile, { encoding: "utf8" }));
}

type CountCRDT = {
    [id: string]: number;
};

const initialCount = await loadCount();
const calcTotalCount = (counter: CountCRDT) =>
    Object.values(counter).reduce((tot, count) => tot + count);
function Counter() {
    const [counter, setCounter] = useState<CountCRDT>({
        [id]: initialCount
    });

    useEffect(() => {
        window.onPush["peerData"] = (message: string) => {
            const { id, count } = JSON.parse(message);
            counter[id] = count;
            setCounter({ ...counter });
        };
        
        rpc().broadcast(JSON.stringify({ id, count: counter[id] }))
    }, []);

    useEffect(() => {
        console.log(counter);
        rpc().fs.writeFile(countFile, counter[id].toString());
    }, [counter]);

    const decr = () => {
        counter[id] -= 1;
        setCounter({ ...counter });
        rpc().broadcast(JSON.stringify({ id, count: counter[id] }))
    };
    const incr = () => {
        counter[id] += 1;
        setCounter({ ...counter });
        rpc().broadcast(JSON.stringify({ id, count: counter[id] }))
    }
    const reset = () => {
        rpc().fs.unlink(countFile)
            .then(() => {
                setCounter({
                    [id]: 0
                });
                rpc().broadcast(JSON.stringify({ id, count: 0 }))
            })
    }

    return (
        <>
            <div>
                <button onClick={decr}>
                    <Icon iconName={"minus"} />
                </button>
                <div>{calcTotalCount(counter)}</div>
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
