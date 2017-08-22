<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Registration</title>
    </head>
    <body>
        <p>
            Hi, {{ $firstName . " " . $lastName }}
        </p>
        <p>
            Thank you for registraion on Parish.
        </p>
        <p>
          
        </p>
        <p>
           For any queries please send mail : @ <a href="mailto:{{ $email }}">
                {{ $email }}
            </a>
        </p>
    </body>
</html>