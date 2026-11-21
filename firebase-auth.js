// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJO3ZaNIbPaUGcWNc188lMQu-vxmtJoBE",
  authDomain: "royal-crimson-smp-fca07.firebaseapp.com",
  projectId: "royal-crimson-smp-fca07",
  storageBucket: "royal-crimson-smp-fca07.firebasestorage.app",
  messagingSenderId: "808848347213",
  appId: "1:808848347213:web:ecaa27424b84750ae40c04",
  measurementId: "G-1KH5B89S3X"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Authentication
const auth = firebase.auth();

console.log("Royal Crimson SMP Firebase connected!");
// Member Login
document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
   .then(async (credential) => {
  alert("Welcome back to Royal Crimson SMP!");

  const token = await credential.user.getIdTokenResult(true);

  if (token.claims.admin === true) {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "member-dashboard.html";
  }
})
    .catch(error => {
      alert(error.message);
    });
});

// Create Account
document.getElementById("signup-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("new-email").value;
  const password = document.getElementById("new-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Your Royal Crimson SMP account has been created!");
    })
    .catch(error => {
      alert(error.message);
    });
});
