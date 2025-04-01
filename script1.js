document.addEventListener("DOMContentLoaded", function () {
    // Define the predefined user data (acting as a 'database')
    const users = {
        "SCM23CS224": { name: "SANDRA", password: "SANDRA" },
        "SCM23CS242": { name: "SIVAJA", password: "SIVAJA" },
        "SCM23CS254": { name: "SREYA", password: "SREYA" },
        "SCM23CS260": { name: "SREELAKSHMI", password: "SREELAKSHMI" }
    };

    // Price variables
    let price = 0;  // Default price

    // Function to update the price based on selected route and way
    function updatePrice() {
        const selectedRoute = document.getElementById("route").value;
        const selectedWay = document.getElementById("way").value;

        // Determine the base price based on the selected route
        if (selectedRoute === "Towards Ernakulam") {
            price = 190;
        } else if (selectedRoute === "Towards Thrissur") {
            price = 150;
        } else {
            price = 0;  // If no route is selected, price should be 0
        }

        // If One way is selected, halve the price
        if (selectedWay === "One Way") {
            price = price / 2;
        }

        // Display the updated price
        document.getElementById("priceDisplay").innerText = `Price: ₹${price}`;
    }

    // Listen for changes on the route select dropdown
    const routeSelect = document.getElementById("route");
    if (routeSelect) {
        routeSelect.addEventListener("change", updatePrice);
    }

    // Listen for changes on the way select dropdown
    const waySelect = document.getElementById("way");
    if (waySelect) {
        waySelect.addEventListener("change", updatePrice);
    }

    // Login Form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();  // Remove leading/trailing spaces
            const regNumber = document.getElementById("regNumber").value.trim();  // Remove leading/trailing spaces
            const password = document.getElementById("password").value.trim();  // Remove leading/trailing spaces

            console.log("Name entered: ", name);
            console.log("Register Number entered: ", regNumber);
            console.log("Password entered: ", password);

            // Debugging: Check if the input matches exactly with the users data
            if (users[regNumber]) {
                console.log("User found: ", users[regNumber]);
            } else {
                console.log("User not found for regNumber: ", regNumber);
            }

            // Check if the user exists in our simulated database
            if (users[regNumber] && users[regNumber].password === password && users[regNumber].name.toUpperCase() === name.toUpperCase()) {
                // Store name, regNumber, and password in localStorage
                localStorage.setItem("name", name);
                localStorage.setItem("regNumber", regNumber);
                localStorage.setItem("password", password);
                console.log("Login successful, redirecting to routes.html...");
                window.location.href = "routes.html";  // Redirect to routes page
            } else {
                console.log("Login failed");
                alert("Invalid name, register number, or password. Please try again.");
            }
        });
    }

    // Route Selection Form
    const routeForm = document.getElementById("routeForm");
    if (routeForm) {
        routeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const selectedRoute = document.getElementById("route").value;
            const selectedWay = document.getElementById("way").value;
            const selectedDate = document.getElementById("date").value; // Get the selected date

            if (selectedRoute && selectedWay && selectedDate) {
                // Store details in localStorage
                localStorage.setItem("route", selectedRoute);
                localStorage.setItem("way", selectedWay);
                localStorage.setItem("price", price);
                localStorage.setItem("date", selectedDate); // Store the selected date

                // Redirect to the payment page
                window.location.href = "payment.html";
            } else {
                alert("Please select route, way, and date.");
            }
        });
    }

    // Check if the user is authenticated (i.e., if details exist in localStorage)
    if (document.getElementById("routeForm") && (!localStorage.getItem("name") || !localStorage.getItem("regNumber") || !localStorage.getItem("password"))) {
        // If not authenticated, redirect back to the login page (index.html)
        window.location.href = "index.html";
    }
});
