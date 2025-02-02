// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKNdunqp160Ue_xGDFmAtMRijtKh4DxsU",
    authDomain: "candle-89f92.firebaseapp.com",
    projectId: "candle-89f92",
    storageBucket: "candle-89f92.firebasestorage.app",
    messagingSenderId: "63732429438",
    appId: "1:63732429438:web:1d3f91e7797f0bdf135e2f",
    measurementId: "G-P0G8YMLL87"
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
