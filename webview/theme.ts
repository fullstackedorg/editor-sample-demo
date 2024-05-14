const themeSwitch = document.querySelector<HTMLInputElement>("#theme-switch input");

declare var rpc: any;

const themeFile = "data/theme.txt";
await rpc().fs.mkdir("data");

async function loadTheme() {
    if (!(await rpc().fs.exists(themeFile))) return "0";

    return await rpc().fs.readFile(themeFile, { encoding: "utf8" });
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

    rpc().fs.writeFile(themeFile, isDark ? "1" : "0");
});

export {}

