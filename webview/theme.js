const themeSwitch = document.querySelector("#theme-switch input");

const startDark = !!parseInt(await rpc().theme.isDark());
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

    rpc().theme.saveDark(isDark ? "1" : "0");
});
