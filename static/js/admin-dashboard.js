const accessToken = localStorage.getItem("access_token");
 
// Check if user is logged in
if (!accessToken) {
    window.location.href = "/";
}


// ==============================
// LOAD DASHBOARD DATA
// ==============================

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/dashboard/",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load dashboard");
        }

        const data = await response.json();

        document.getElementById("totalComplaints").textContent =
            data.total_complaints;

        document.getElementById("pendingComplaints").textContent =
            data.pending;

        document.getElementById("inProgressComplaints").textContent =
            data.in_progress;

        document.getElementById("resolvedComplaints").textContent =
            data.resolved;

        document.getElementById("unassignedComplaints").textContent =
            data.unassigned;

    } catch (error) {

        console.error(error);

    }
}


// ==============================
// LOAD STAFF WORKLOAD
// ==============================

async function loadStaffWorkload() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/dashboard/staff-workload/",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load staff workload");
        }

        const data = await response.json();

        const container =
            document.getElementById("staffWorkload");

        container.innerHTML = "";

        data.staff_workload.forEach(function (staff) {

            const staffElement =
                document.createElement("p");

            staffElement.textContent =
                `${staff.email} - ${staff.assigned_complaints} complaints`;

            container.appendChild(staffElement);

        });

    } catch (error) {

        console.error(error);

    }
}


// ==============================
// LOGOUT
// ==============================

document.getElementById("logoutBtn").addEventListener(
    "click",
    function () {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        window.location.href = "/";

    }
);


// ==============================
// LOAD COMPLAINTS
// ==============================

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
            throw new Error("Unable to load complaints");
        }

        const complaints = await response.json();

         

        const table =
            document.getElementById("complaintsTable");

        table.innerHTML = "";

        complaints.forEach(function (complaint) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${complaint.id}</td>

                <td>${complaint.title}</td>

                <td>${complaint.category_name}</td>

                <td>${complaint.department_name}</td>

                <td>${complaint.location_name}</td>

                <td>${complaint.priority}</td>

                <td>${complaint.status}</td>

                <td>
                    ${
                        complaint.assigned_to
                            ? complaint.assigned_to
                            : "Unassigned"
                    }
                </td>

                <td>
                    <button
                        onclick="assignComplaint(${complaint.id})">
                        Assign
                    </button>
                </td>
            `;

            table.appendChild(row);

        });

    } catch (error) {

        console.error(error);

    }
}


// ==============================
// ASSIGN COMPLAINT
// ==============================

async function assignComplaint(complaintId) {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/auth/staff/",
            {
                method: "GET",
                headers: {
                    "Authorization":
                        `Bearer ${accessToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to get staff");
        }

        const staffList =
            await response.json();

        if (staffList.length === 0) {

            alert(
                "No maintenance staff available."
            );

            return;
        }


        // Create dropdown
        const select =
            document.createElement("select");

        select.id = "staffSelect";


        staffList.forEach(function (staff) {

            const option =
                document.createElement("option");

            option.value = staff.id;

            option.textContent =
                staff.email;

            select.appendChild(option);

        });


        // Create confirm button
        const confirmButton =
            document.createElement("button");

        confirmButton.textContent =
            "Confirm";


        confirmButton.onclick =
            async function () {

                const staffId =
                    select.value;

                await assignStaff(
                    complaintId,
                    staffId
                );

            };


        // Find the Action cell
        const button =
            document.querySelector(
                `button[onclick="assignComplaint(${complaintId})"]`
            );

        const row =
            button.parentElement;


        // Replace Assign button
        row.innerHTML = "";

        row.appendChild(select);

        row.appendChild(confirmButton);

    } catch (error) {

        console.error(error);

        alert(
            "Unable to load maintenance staff."
        );

    }
}


// ==============================
// ASSIGN STAFF
// ==============================

async function assignStaff(
    complaintId,
    staffId
) {

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/complaints/${complaintId}/assign/`,
            {
                method: "PATCH",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${accessToken}`

                },

                body: JSON.stringify({

                    assigned_to: staffId

                })

            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(data);

            alert(
                "Unable to assign complaint."
            );

            return;

        }


        alert(
            "Complaint assigned successfully!"
        );


        // Reload complaints
        loadComplaints();

        // Refresh dashboard
        loadDashboard();

        loadStaffWorkload();


    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong."
        );

    }
}


// ==============================
// RUN FUNCTIONS
// ==============================

loadDashboard();

loadStaffWorkload();

loadComplaints();