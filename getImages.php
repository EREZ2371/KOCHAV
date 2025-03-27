<?php
$directory = 'images'; // שם התיקייה
$images = [];

// פתיחת תיקיית התמונות
if ($handle = opendir($directory)) {
    while (false !== ($entry = readdir($handle))) {
        // אם קובץ הוא תמונה (תמונה בלבד לא תכיל נקודות כמו קבצים אחרים)
        if (in_array(pathinfo($entry, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
            $images[] = $directory . '/' . $entry; // הוספת שם הקובץ לרשימה
        }
    }
    closedir($handle);
}

// החזרת התמונה כ- JSON
echo json_encode(['images' => $images]);
?>
