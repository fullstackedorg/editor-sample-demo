import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { randomElement } from "../utils/random.js";

function Icon(props) {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        fetch(`assets/images/${props.iconName}.svg`)
            .then((res) => res.text())
            .then(setIcon);
    }, []);

    return <span dangerouslySetInnerHTML={{ __html: icon }} />;
}

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        rpc()
            .count.load()
            .then((savedCount) => setCount(parseInt(savedCount)));
    }, []);

    useEffect(() => {
        if (count) rpc().count.save(count.toString());

        if (count % 3 === 1) console.log(randomElement(chatGPTQuotes));
    }, [count]);

    const decr = () => setCount(count - 1);
    const incr = () => setCount(count + 1);
    const reset = () =>
        rpc()
            .count.reset()
            .then(() => setCount(0));

    return (
        <>
            <div>
                <button onClick={decr}>
                    <Icon iconName={"minus"} />
                </button>
                <div>{count}</div>
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

const chatGPTQuotes = [
    "Clicking that button like a boss – one press at a time!",
    "You're on fire! Keep clicking, and let the counting games begin.",
    "Clicking away like a champion. You're the true counter extraordinaire!",
    "Counting with precision – one click at a time. You've got this!",
    "Clicking faster than a caffeinated hummingbird. You're unstoppable!",
    "Clickity-click! You're the maestro of the counter symphony.",
    "Counting clicks like it's an Olympic sport. Gold medal vibes!",
    "Keep calm and click on. You're making history, one button at a time.",
    "Click, click, hooray! You're the click master, no doubt.",
    "You've got the Midas touch – but with a counter button. Click it all to gold!",
    "Clicking like it's going out of style. Spoiler: it's not!",
    "Counting clicks like a mathematician with a sense of humor. Go, you!",
    "Clicking with the precision of a ninja – silent but deadly accurate.",
    "Button-clicking virtuoso in action! Encore, encore!",
    "Clicking away, leaving a trail of smiles and counting triumphs.",
    "Clicking so fast, you might break the internet. Proceed with awesomeness!",
    "Counting clicks like a rockstar. Your fans are cheering!",
    "Clicking like there's no tomorrow. Spoiler alert: Tomorrow, you'll still be clicking!",
    "You're not just clicking; you're creating a masterpiece of counts!",
    "Clicking so smoothly, it's like butter – but without the mess.",
    "Clicking brilliance in progress! The world needs more counters like you.",
    "Counting clicks like a pro – because amateurs are for the faint-hearted.",
    "Clicking with finesse and style. You're the James Bond of counters!",
    "Click, click, hooray! The world is a better place with your counting skills.",
    "Clicking through life with flair and humor. Keep it up!",
    "Counting clicks like it's a dance. You've got the perfect moves!",
    "Click, click, hooray! The world is a better place with your counting skills.",
    "Counting clicks like a boss. Your finger must be in training!",
    "Clicking like it's the coolest thing you'll do today. Spoiler: it is!",
    "Click, laugh, repeat. Your clicking journey is pure joy!",
    "Counting clicks with the enthusiasm of a kid in a candy store. Keep that joy alive!",
    "Clicking like a pro – because amateurs are for beginners.",
    "Button clicking level: Expert. You're acing this game!",
    "Clicking away, making numbers look good. Keep up the fantastic work!",
    "Counting clicks like it's an art form. Picasso would be proud!",
    "Clicking with style, grace, and a touch of humor. That's how it's done!",
    "Clicking buttons with the precision of a surgeon. You're saving lives, one click at a time!"
];
