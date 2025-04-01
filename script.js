document.addEventListener("DOMContentLoaded", function () {
    const price = localStorage.getItem("price");
    document.getElementById('priceToPay').innerText = price;

    // Handle form submission for transaction ID
    const paymentForm = document.getElementById("paymentForm");
    const paymentStatus = document.getElementById("paymentStatus");

    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const transactionId = document.getElementById("transactionId").value;

        if (transactionId.trim() === "") {
            paymentStatus.textContent = "Please enter a valid transaction ID.";
            paymentStatus.style.color = "red";
        } else {
            // For now, simulate payment success
            paymentStatus.textContent = `Payment successful! Transaction ID: ${transactionId}`;
            paymentStatus.style.color = "green";

            // Store payment status
            localStorage.setItem("paymentStatus", "Success");

            // Redirect to confirmation page
            window.location.href = "confirmation.html";
        }
    });
});
