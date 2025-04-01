document.addEventListener("DOMContentLoaded", function () {
    // Predefined user data (acting as a 'database')
    const users = {
        "SCM23CS224": { name: "SANDRA", password: "SANDRA" },
        "SCM23CS242": { name: "SIVAJA", password: "SIVAJA" },
        "SCM23CS254": { name: "SREYA", password: "SREYA" },
        "SCM23CS260": { name: "SREELAKSHMI", password: "SREELAKSHMI" }
    };

    // Price variables
    let price = 0;  // Default price

    // Update price based on selected route and way
    function updatePrice() {
        const selectedRoute = document.getElementById("route").value;
        const selectedWay = document.getElementById("way").value;

        if (selectedRoute === "Towards Ernakulam") {
            price = 190;
        } else if (selectedRoute === "Towards Thrissur") {
            price = 150;
        } else {
            price = 0;  // Default price if no route selected
        }

        // Halve the price if One Way is selected
        if (selectedWay === "One Way") {
            price = price / 2;
        }

        // Display the updated price
        document.getElementById("priceDisplay").innerText = `Price: ₹${price}`;
    }

    // Listen for route and way changes
    const routeSelect = document.getElementById("route");
    if (routeSelect) {
        routeSelect.addEventListener("change", updatePrice);
    }

    const waySelect = document.getElementById("way");
    if (waySelect) {
        waySelect.addEventListener("change", updatePrice);
    }

    // Login Form Handling
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const regNumber = document.getElementById("regNumber").value.trim();
            const password = document.getElementById("password").value.trim();

            // Check if the user exists and credentials match
            if (users[regNumber] && users[regNumber].password === password && users[regNumber].name.toUpperCase() === name.toUpperCase()) {
                // Store user details in localStorage
                localStorage.setItem("name", name);
                localStorage.setItem("regNumber", regNumber);
                localStorage.setItem("password", password);
                console.log("Login successful, redirecting to routes.html...");
                window.location.href = "routes.html";  // Redirect to routes page
            } else {
                alert("Invalid name, register number, or password. Please try again.");
            }
        });
    }

    // Route Selection Form Handling
    const routeForm = document.getElementById("routeForm");
    if (routeForm) {
        routeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const selectedRoute = document.getElementById("route").value;
            const selectedWay = document.getElementById("way").value;
            const selectedDate = document.getElementById("date").value;

            if (selectedRoute && selectedWay && selectedDate) {
                // Store route details in localStorage
                localStorage.setItem("route", selectedRoute);
                localStorage.setItem("way", selectedWay);
                localStorage.setItem("price", price);
                localStorage.setItem("date", selectedDate);  // Store selected date

                // Redirect to payment page
                window.location.href = "payment.html";
            } else {
                alert("Please select route, way, and date.");
            }
        });
    }

    // Check if the user is authenticated on the payment page
    if (document.getElementById("paymentForm") && (!localStorage.getItem("name") || !localStorage.getItem("regNumber") || !localStorage.getItem("password"))) {
        // If not authenticated, redirect back to the login page
        window.location.href = "index.html";
    }

    // Payment Handling on the payment page
    const paymentForm = document.getElementById("paymentForm");
    const paymentStatus = document.getElementById("paymentStatus");

    if (paymentForm) {
        paymentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const transactionId = document.getElementById("transactionId").value;

            if (transactionId.trim() === "") {
                paymentStatus.textContent = "Please enter a valid transaction ID.";
                paymentStatus.style.color = "red";
            } else {
                // Simulate payment success
                paymentStatus.textContent = `Payment successful! Transaction ID: ${transactionId}`;
                paymentStatus.style.color = "green";

                // Store payment status in localStorage
                localStorage.setItem("paymentStatus", "Success");

                // Redirect to confirmation page
                window.location.href = "confirmation.html";
            }
        });
    }

    // Display price on payment page
    const priceToPay = localStorage.getItem("price");
    if (priceToPay) {
        document.getElementById('priceToPay').innerText = `Price to Pay:  `;
    }
});
