const path = window.parent.location.pathname.replace("/", "").replace(".html", "");
document.getElementById(path).setAttribute("active", "true");