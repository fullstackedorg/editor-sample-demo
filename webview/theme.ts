import fs from "fs";

const themeSwitch = document.querySelector<HTMLInputElement>(
    "#theme-switch input"
);

const themeFile = "data/theme.txt";
await fs.mkdir("data");

async function loadTheme() {
    if (!(await fs.exists(themeFile))) {
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? "1" : "0";
    }

    return fs.readFile(themeFile, { encoding: "utf8" });
}

const startDark = !!parseInt(await loadTheme());
if (startDark) {
    document.documentElement.classList.add("dark");
    themeSwitch.checked = false;
}

themeSwitch.addEventListener("change", (e) => {
    const isDark = !(e.currentTarget as HTMLInputElement).checked;
    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    fs.writeFile(themeFile, isDark ? "1" : "0");
});
