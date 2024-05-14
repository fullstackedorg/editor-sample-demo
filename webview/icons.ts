document.querySelectorAll(".icon").forEach(async (icon) => {
    // @ts-ignore
    const iconName = Array.from(icon.classList.values())
        .filter((iconClass) => iconClass !== "icon")
        .at(0);
    icon.innerHTML = await (
        await fetch(`assets/images/${iconName}.svg`)
    ).text();
});

