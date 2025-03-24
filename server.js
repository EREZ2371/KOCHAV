const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

// שליפת החדשות
app.get('/fetch-news', async (req, res) => {
  try {
    const response = await axios.get('https://rss.walla.co.il/feed/22');
    const parser = new xml2js.Parser();
    const xmlData = response.data;

    parser.parseString(xmlData, (err, result) => {
      if (err) {
        return res.status(500).send('Error parsing XML');
      }
      
      const newsItems = result.rss.channel[0].item.map(item => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0]
      }));

      res.json(newsItems); // שלח את החדשות ללקוח
    });
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});

// הגדרת התיקייה של הקבצים הסטטיים (HTML, JS)
app.use(express.static('public'));

// התחלת השרת
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
