<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Reset Password</title>
    </head>
    <body>
        <p>
            Hi, {{ $firstName . " " . $lastName }}
        </p>
        <p>
            You have requested for reset your password. please click on below link to reset your password.
        </p>
        <p>
          <a href='{{$url}}'> Click here to reset password </a>
        </p>
        <p>
           For any queries please send mail : @ <a href="mailto:{{ $email }}">
                {{ $email }}
            </a>
        </p>
    </body>
</html>