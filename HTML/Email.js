const EMAIL_TEMPLATE = (link, name)=>{
    return `
    <!DOCTYPE html>
    <html>
        <head>

            <meta charset="utf-8">
            <title>Activition Code</title>

            <style>
                
            </style>

        </head>
        <body>

            <p>Hi ${name}, Thank you for signing up for Starplus games. Please click on the button below to verify your email</p>

            <a href=${link}>
                Click me!
            </a>

            <p>Best, <br>Starplus Team</p>
            
        </body>
    </html>
    `
}

module.exports = EMAIL_TEMPLATE