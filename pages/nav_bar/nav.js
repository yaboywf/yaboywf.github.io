const path = window.parent.location.pathname.replace("/", "").replace(".html", "");
if (path === "") {
    document.getElementById("index").setAttribute("active", "true");
    return;
}
document.getElementById(path).setAttribute("active", "true");