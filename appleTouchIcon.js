import fs from "fs";
import https from "https";

const TARGET = "https://yaboywf.github.io";

const API = `https://api.microlink.io/?url=${encodeURIComponent(TARGET)}&screenshot=true&meta=false`;

https.get(API, res => {
    let data = "";
    res.on("data", chunk => data += chunk);

    res.on("end", () => {
        const json = JSON.parse(data);
        const screenshotUrl = json.data.screenshot.url;

        https.get(screenshotUrl, imgRes => {
            const file = fs.createWriteStream("./public/images/apple-touch-icon.png");
            imgRes.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("✔ Apple touch icon updated!");
            });
        });
    });
});
