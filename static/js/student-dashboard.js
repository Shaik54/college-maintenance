const accessToken =
    localStorage.getItem("access_token");


/* Check login */

if (!accessToken) {

    window.location.href = "/";

}


/* =========================
   LOAD MY COMPLAINTS
========================= */

async function loadComplaints() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/complaints/",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${accessToken}`
                }
            }
        );


        if (!response.ok) {

            throw new Error(
                "Unable to load complaints"
            );

        }


        const complaints =
            await response.json();


        const table =
            document.getElementById(
                "complaintsTable"
            );


        table.innerHTML = "";


        complaints.forEach(function (complaint) {

            const row =
                document.createElement("tr");


            row.innerHTML = `
                <td>${complaint.id}</td>

                <td>${complaint.title}</td>

                <td>${complaint.priority}</td>

                <td>${complaint.status}</td>

                <td>${complaint.created_at}</td>
            `;


            table.appendChild(row);

        });

    } catch (error) {

        console.error(error);

    }

}


/* =========================
   CREATE COMPLAINT
========================= */

const complaintForm =
    document.getElementById("complaintForm");


complaintForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const title =
            document.getElementById("title").value;

        const description =
            document.getElementById("description").value;

        const category =
            document.getElementById("category").value;

        const location =
            document.getElementById("location").value;

        const priority =
            document.getElementById("priority").value;

        const message =
            document.getElementById("message");


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/complaints/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${accessToken}`
                    },

                    body: JSON.stringify({

                        title: title,

                        description: description,

                        category: category,

                        location: location,

                        priority: priority

                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(data);

                message.textContent =
                    "Failed to create complaint.";

                return;

            }


            message.textContent =
                "Complaint created successfully!";


            /* Clear form */

            complaintForm.reset();


            /* Refresh complaint list */

            loadComplaints();


        } catch (error) {

            console.error(error);

            message.textContent =
                "Something went wrong.";

        }

    }
);


/* =========================
   LOGOUT
========================= */

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href = "/";

    }
);


async function loadCategories() {

    const response = await fetch(
        "http://127.0.0.1:8000/api/departments/categories/",
        {
            headers: {
                "Authorization":
                    `Bearer ${accessToken}`
            }
        }
    );

    const categories = await response.json();

    const categorySelect =
        document.getElementById("category");

    categories.forEach(function(category) {

        const option =
            document.createElement("option");

        option.value = category.id;

        option.textContent = category.name;

        categorySelect.appendChild(option);

    });
}


async function loadLocations() {

    const response = await fetch(
        "http://127.0.0.1:8000/api/departments/locations/",
        {
            headers: {
                "Authorization":
                    `Bearer ${accessToken}`
            }
        }
    );

    const locations = await response.json();

    const locationSelect =
        document.getElementById("location");

    locations.forEach(function(location) {

        const option =
            document.createElement("option");

        option.value = location.id;

        option.textContent =
            `${location.building} - ${location.name}`;

        locationSelect.appendChild(option);

    });
}

/* Load complaints when page opens */

loadCategories();
loadLocations();
loadComplaints();