<?php
    $file = fopen("results.txt", 'a') or die("Ошибка при открытии файла");
    $log = $_GET["log"] . PHP_EOL;
    fputs($file, $log);
    fclose($file);
?>