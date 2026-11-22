
/* ==========================================
   ROYAL CRIMSON SMP
   Firebase Authentication System
   ========================================== */

// Firebase Configuration
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

// ==========================================
// MEMBER LOGIN
// ==========================================

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const credential =
        await auth.signInWithEmailAndPassword(email, password);

      const token = await credential.user.getIdTokenResult(true);

      alert("Welcome back to the Royal Crimson SMP!");

      if (token.claims.admin === true) {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "member-dashboard.html";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to sign in: " + error.message);
    }
  });
}

// ==========================================
// MEMBER REGISTRATION
// ==========================================

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email =
      document.getElementById("new-email").value.trim();

    const password =
      document.getElementById("new-password").value;

    try {
      // Create Firebase account
      const credential =
        await auth.createUserWithEmailAndPassword(email, password);

      // Send email verification
      await credential.user.sendEmailVerification();

      // Welcome message
      alert(
        "Welcome to the Royal Crimson SMP!\n\n" +
        "Your account has been created successfully.\n\n" +
        "A verification email has been sent to:\n" +
        email + "\n\n" +
        "Please check your inbox and confirm your email address.\n\n" +
        "With royal regards,\n" +
        "King Legoman1927"
      );

      // Clear registration form
      signupForm.reset();

    } catch (error) {
      console.error("Registration error:", error);

      alert(
        "We couldn't create your account.\n\n" +
        error.message
      );
    }
  });
}

// ==========================================
// RESEND VERIFICATION EMAIL
// ==========================================

async function resendVerificationEmail() {
  const user = auth.currentUser;

  if (!user) {
    alert("Please sign in first.");
    return;
  }

  if (user.emailVerified) {
    alert("Your email is already verified!");
    return;
  }

  try {
    await user.sendEmailVerification();

    alert("A new verification email has been sent!");

  } catch (error) {
    console.error("Verification error:", error);
    alert("Unable to send verification email: " + error.message);
  }
}

console.log("Royal Crimson SMP authentication is ready!");
