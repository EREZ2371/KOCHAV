const express = require('express');
const fs = require('fs');
const path = require('path');

/* ===== תוספות (לא נוגע בקיים) ===== */
const fetch = require('node-fetch');
const RSSParser = require('rss-parser');
const cors = require('cors');
/* ================================= */

const app = express();

/* ===== תוספת: מאפשר קריאה מהדפדפן ===== */
app.use(cors());
/* ===================================== */

// הגדרת פורט
const PORT = process.env.PORT || 3000;

/* ==================================================
   הקוד המקורי שלך – לא שונה בכלל
================================================== */
app.get('/api/breaking-news', (req, res) => {
    const newsFilePath = path.join(__dirname, 'news.json');

    fs.readFile(newsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("שגיאה בקריאת הקובץ:", err);
            return res.status(500).send("שגיאה בשרת");
        }

        const news = JSON.parse(data);
        res.json(news);
    });
});

/* ==================================================
   תוספת חדשה בלבד – RSS גלובס
================================================== */
app.get('/api/globes', async (req, res) => {
    const GLOBES_RSS =
        "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=2";

    try {
        const response = await fetch(GLOBES_RSS, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/xml"
            }
        });

        const xml = await response.text();
        const parser = new RSSParser();
        const feed = await parser.parseString(xml);

        const items = feed.items.slice(0, 20).map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate || ""
        }));

        res.json({ items });
    } catch (err) {
        console.error("שגיאה בגלובס:", err);
        res.status(500).json({ error: "טעינת גלובס נכשלה" });
    }
});

/* ==================================================
   הפעלת השרת – לא שונה
================================================== */
app.listen(PORT, () => {
    console.log(`השרת רץ על פורט ${PORT}`);
});
