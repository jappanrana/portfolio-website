// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Request permission for notifications
messaging
  .requestPermission()
  .then(() => {
    console.log("Notification permission granted.");
    return messaging.getToken();
  })
  .then((token) => {
    console.log("Token:", token);
  })
  .catch((err) => {
    console.log("Unable to get permission to notify.", err);
  });

// Handle blow button click
document.getElementById("blowButton").addEventListener("click", () => {
  const flame = document.querySelector(".flame");
  flame.style.animation = "none"; // Stop flicker animation
  flame.style.transform = "translateX(-50%) scale(0)"; // Blow out flame
  flame.style.transition = "transform 0.5s";

  // Send Firebase notification
  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "key=YOUR_SERVER_KEY",
    },
    body: JSON.stringify({
      to: "DEVICE_TOKEN", // Replace with the device token of the app
      notification: {
        title: "Candle Blown!",
        body: "Someone blew out the candle!",
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Notification sent:", data))
    .catch((error) => console.error("Error sending notification:", error));
});
