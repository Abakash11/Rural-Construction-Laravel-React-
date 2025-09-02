<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body> 
    Dear , {{$msg['name']}} <br><br>
    Thanks for contacting Rural Constructionn We’ve received your message and will get back shortly.
    <br>
    Your message summary <br>
    - Message: {{ $msg['message'] }} <br>
</body>
</html>