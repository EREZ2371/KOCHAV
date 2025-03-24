<?php
// כותרות כדי לאפשר קריאות CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/xml; charset=UTF-8");

// כתובת ה-RSS של Ynet חדשות
$rss_url = "https://www.ynet.co.il/Integration/StoryRss1854.xml";

// אתחול cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $rss_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // במקרים שבהם יש בעיות SSL

// ביצוע הבקשה ושמירת התוצאה
$response = curl_exec($ch);

// בדיקת שגיאות
if ($response === false) {
    http_response_code(500);
    echo "Error fetching RSS feed: " . curl_error($ch);
} else {
    echo $response;
}

// סגירת החיבור
curl_close($ch);
?>
