<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Sign-Up Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
        <h1 style="text-align: center; color: #FF5733;">New Sign-Up Request</h1>
        <p>Hello Admin,</p>
        <p>A new user has requested to sign up on DigiVet. Here are the details:</p>
        <ul>
            <li><strong>Name:</strong> {{ $name }}</li>
            <li><strong>Email:</strong> {{ $email }}</li>
            <li><strong>Role:</strong> {{ ucfirst($role) }}</li>
        </ul>
        <p>Please review and take the necessary action.</p>
        <p style="text-align: center;">Best regards, <br> The DigiVet System</p>
    </div>
</body>
</html>
