import { randomElement } from "../utils/random.js";

const countFile = "data/count.txt";
const themeFile = "data/theme.txt";

(async () => {
    if (!(await fs.exists("data"))) await fs.mkdir("data");
})();

export default {
    count: {
        async load() {
            if (!(await fs.exists(countFile))) return "0";

            return fs.readFile(countFile, { encoding: "utf8" });
        },
        save(count) {
            fs.writeFile(countFile, count.toString());
        },
        async reset() {
            if (await fs.exists(countFile)) return fs.unlink(countFile);
        }
    },
    theme: {
        async isDark() {
            if (!(await fs.exists(themeFile))) return "0";

            return fs.readFile(themeFile, { encoding: "utf8" });
        },
        saveDark(dark) {
            if (parseInt(dark)) {
                console.log(randomElement(chatGPTQuotes));
            }

            return fs.writeFile(themeFile, dark);
        }
    }
};

const chatGPTQuotes = [
    "In a world full of brightness, be the darkness.",
    "Life is too short for bright backgrounds. Choose the elegance of the dark side.",
    "Embrace the darkness; it's where clarity and style converge.",
    "Bright backgrounds are so last season. Real sophistication lies in the shadows.",
    "In the battle of light versus dark, the dark side always wins.",
    "Why settle for the light when you can bask in the beauty of darkness?",
    "Bright screens are for amateurs; professionals prefer the subtlety of dark mode.",
    "Elegance is an absence of light. Choose sophistication with dark mode.",
    "Bright ideas may come and go, but dark mode is a constant source of brilliance.",
    "The secret to productivity? A dark background and a focused mind."
];
