const accessToken =
    localStorage.getItem("access_token");


if (!accessToken) {

    window.location.href = "/";

}


// Load complaints assigned to this staff member
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

                <td>${complaint.description}</td>

                <td>${complaint.priority}</td>

                <td>${complaint.status}</td>

                <td>
                    <button onclick="updateStatus(${complaint.id})">
                        Update Status
                    </button>
                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(error);

    }

}


// Logout
document.getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        window.location.href = "/";

    });


// Load complaints when page opens
loadComplaints();

async function updateStatus(complaintId) {

    // Create dropdown
    const select = document.createElement("select");

    const statuses = [
        {
            value: "pending",
            text: "Pending"
        },
        {
            value: "in_progress",
            text: "In Progress"
        },
        {
            value: "resolved",
            text: "Resolved"
        }
    ];

    statuses.forEach(function(status) {

        const option = document.createElement("option");

        option.value = status.value;
        option.textContent = status.text;

        select.appendChild(option);

    });


    // Create Save button
    const saveButton = document.createElement("button");

    saveButton.textContent = "Save";


    // Find the clicked button's cell
    const button = document.querySelector(
        `button[onclick="updateStatus(${complaintId})"]`
    );

    const cell = button.parentElement;


    // Replace button with dropdown + Save
    cell.innerHTML = "";

    cell.appendChild(select);
    cell.appendChild(saveButton);


    // Save status
    saveButton.onclick = async function() {

        const newStatus = select.value;

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/complaints/${complaintId}/update_status/`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization":
                            `Bearer ${accessToken}`
                    },

                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                console.error(data);

                alert("Unable to update status.");

                return;
            }


            alert("Status updated successfully!");

            // Reload complaints
            loadComplaints();

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

    };

}