import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const countFile = "data/count.txt";
await rpc().fs.mkdir("data");

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

function Counter() {
    const [count, setCount] = useState({
        value: 0,
        fromPeer: false
    });

    useEffect(() => {
        loadCount().then((savedCount) =>
            setCount({
                value: savedCount,
                fromPeer: false
            })
        );

        window.onPush["peerData"] = (count: string) => {
            setCount({
                value: parseInt(count),
                fromPeer: true
            });
        };
    }, []);

    useEffect(() => {
        if (count.value) rpc().fs.writeFile(countFile, count.value.toString());

        if (count.fromPeer) return;

        rpc().broadcast(count.value.toString());
    }, [count]);

    const decr = () =>
        setCount({
            value: count.value - 1,
            fromPeer: false
        });
    const incr = () =>
        setCount({
            value: count.value + 1,
            fromPeer: false
        });
    const reset = () =>
        rpc()
            .fs.unlink(countFile)
            .then(() =>
                setCount({
                    value: 0,
                    fromPeer: false
                })
            );

    return (
        <>
            <div>
                <button onClick={decr}>
                    <Icon iconName={"minus"} />
                </button>
                <div>{count.value}</div>
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
