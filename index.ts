import "./webview/counter";
import "./webview/icons";
import "./webview/theme";

import platform from "platform";
document.querySelector<HTMLSpanElement>("#platform").innerText = platform;