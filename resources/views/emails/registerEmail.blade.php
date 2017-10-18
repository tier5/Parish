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
            Thank you for registraion on Parish. You has been subscriped under our Plan. Your plan information is given below

        </p>
        <p>
            Plan name: {{ $plan }} <br><br>
            Validity: {{ $subscription_starts ." to  " .$subscription_ends }} <br><br>
            Total: ${{ $amount }} / {{ $interval }}  <br><br>
            Your next billing date will be {{ $subscription_ends }}. <br><br>
        </p>
        <p> It will be a Auto deduction from your card on the next billing date.
        <p>
           For any queries please send mail : @ <a href="mailto:{{ $email }}"> {{ $email }} </a>
        </p>
    </body>
</html>