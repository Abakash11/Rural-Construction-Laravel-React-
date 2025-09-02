<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
**Name:** {{ $msg['name'] }}  <br>
**Email:** {{ $msg['email'] }}  <br>
**Phone:** {{ $msg['phone'] ?? '—' }} <br> 
**Message:** {{ $msg['message'] }}<br>
</body>
</html>