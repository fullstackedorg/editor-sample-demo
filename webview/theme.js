const themeSwitch = document.querySelector("#theme-switch input");

const themeFile = "data/theme";
await rpc().fs.mkdir("data");

async function loadTheme(){
    if(!(await rpc().fs.exists(themeFile)))
        return "0";

    return await rpc().fs.readFile(themeFile, { encoding: "utf8" });
}

const startDark = !!parseInt(await loadTheme());
if (startDark) {
    document.documentElement.classList.add("dark");
    themeSwitch.checked = false;
}


themeSwitch.addEventListener("change", (e) => {
    const isDark = !e.currentTarget.checked;
    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    rpc().fs.writeFile(themeFile, isDark ? "1" : "0");
});
