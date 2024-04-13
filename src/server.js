
const emailjs = require("emailjs-com");
export function sendMail(formDetails) {
    const name = formDetails["firstName"] + " " + formDetails["lastName"];
    const email = formDetails["email"];
    const message = formDetails["message"];
    const phone = formDetails["phone"];

    emailjs
        .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            name: name,
            email: email,
            message: message,
            phone: phone
        }, {
            publicKey: 'YOUR_PUBLIC_KEY',
        })
        .then(
            () => {
                console.log('SUCCESS!');
                return true;
            },
            (error) => {
                console.log('FAILED...', error.text);
                return false;
            },
        );
};
