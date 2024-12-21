<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные

$surname = $data['surname'];
$name = $data['name'];
$fath = $data['fath'];

$tel = $data['tel'];
$email = $data['mail'];

$city = $data['city'];
$street = $data['street'];
$house = $data['house'];
$flat = $data['flat'];
$index = $data['index'];

$msg = $data['msg'];

$ord = $data['ord'];

// Контент письма
$title = 'Заявка с сайта'; // Название письма
$body = 
'<p>Фамилия: <strong>'.$surname.'</strong></p>'.
'<p>Имя: <strong>'.$name.'</strong></p>'.
'<p>Отчество: <strong>'.$fath.'</strong></p>'.

'<p>Телефон: <strong>'.$tel.'</strong></p>'.
'<p>Почта: <strong>'.$email.'</strong></p>'.

'<p>Город: <strong>'.$city.'</strong></p>'.
'<p>Улица: <strong>'.$street.'</strong></p>'.
'<p>Дом: <strong>'.$house.'</strong></p>'.
'<p>Квартира: <strong>'.$flat.'</strong></p>'.
'<p>Индекс: <strong>'.$index.'</strong></p>'.

'<p>Сообщение: <strong>'.$msg.'</strong></p>'.

'<p>Заказ: <strong>'.$ord.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
  $mail->Username   = 'Specture2023@yandex.ru'; // Логин на почте
  $mail->Password   = 'tzejqqrdsxtdersl'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('Specture2023@yandex.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('Specture2023@yandex.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение отправлено успешно!');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
}
