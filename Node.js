const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// הגדרת פורט
const PORT = process.env.PORT || 3000;

// קריאת קובץ עם מבזקים (במקרה הזה נניח שהקובץ נמצא בתיקיית public)
app.get('/api/breaking-news', (req, res) => {
    const newsFilePath = path.join(__dirname, 'news.json'); // נתיב לקובץ החדשות

    fs.readFile(newsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("שגיאה בקריאת הקובץ:", err);
            return res.status(500).send("שגיאה בשרת");
        }

        // המידע בקובץ json (דוגמה: {"news": [{"title": "מבזק ראשון", "link": "https://example.com"}]})
        const news = JSON.parse(data);

        // שולחים את המידע ללקוח
        res.json(news);
    });
});

// השרת יאזין לפורט המוגדר
app.listen(PORT, () => {
    console.log(`השרת רץ על פורט ${PORT}`);
});
