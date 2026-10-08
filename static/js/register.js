const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const firstName =
        document.getElementById("first_name").value;

    const lastName =
        document.getElementById("last_name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirm_password").value;

    const role =
        document.getElementById("role").value;

    const message =
        document.getElementById("message");


    // Check passwords

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/auth/register/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    password2: confirmPassword,
                    role: role

        })
            }
        );


        const data = await response.json();


        if (response.ok) {

            message.textContent =
                "Registration successful!";

            registerForm.reset();

            console.log(data);

        } else {

            console.log(data);

            message.textContent =
                "Registration failed.";

        }


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to server.";

    }

});