const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {

        // Login
        const response = await fetch(
            "http://127.0.0.1:8000/api/auth/login/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            // Store JWT tokens
            localStorage.setItem(
                "access_token",
                data.access
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh
            );

            // Get current user's information
            const userResponse = await fetch(
                "http://127.0.0.1:8000/api/auth/me/",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.access}`
                    }
                }
            );

            const userData = await userResponse.json();

            console.log(userData);

            // Store user information
            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );

            // Redirect according to role
            if (userData.role === "admin") {

                window.location.href = "/admin-dashboard/";

            } else if (userData.role === "staff") {

                window.location.href = "/staff-dashboard/";

            } else if (userData.role === "student") {

                window.location.href = "/student-dashboard/";

            } else {

                message.textContent = "Invalid user role.";
            }

        } else {

            message.textContent =
                data.detail || "Invalid email or password.";

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to server.";
    }

});