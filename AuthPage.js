// src/AuthPage.js
import React, { useState } from "react";
import { auth, db, provider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import "./auth.css"; // Optional: if you want to separate CSS

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForms = () => setIsLogin(!isLogin);

  const handleSignup = async () => {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const phone = document.getElementById("signupPhone").value;
    const referral = document.getElementById("signupReferral").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      await set(ref(db, "users/" + user.uid), {
        name,
        email,
        phone,
        referral,
        uid: user.uid,
      });

      alert(`Signup successful! Referral: ${referral}`);
      setIsLogin(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await set(ref(db, "users/" + user.uid), {
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber || "",
        referral: "GoogleSignUp",
        uid: user.uid,
      });

      alert("Google Sign-up successful!");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Google Sign-up failed: " + error.message);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img
            src="https://i.postimg.cc/MGvTHFhR/20250609-193748.png"
            alt="Logo"
            style={{ width: 200, height: 200 }}
          />
        </div>

        {isLogin ? (
          <>
            <h2 style={styles.heading}>Welcome Back</h2>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>email</span>
              <input id="loginEmail" type="email" placeholder="Email" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>lock</span>
              <input id="loginPassword" type="password" placeholder="Password" style={styles.input} />
            </div>
            <button onClick={handleLogin} style={styles.button}>Login</button>
            <div style={styles.link} onClick={toggleForms}>Don't have an account? Sign Up</div>
            <a className="toggle-link" href="forget.html" style={styles.link}>Forgot Password?</a>
          </>
        ) : (
          <>
            <h2 style={styles.heading}>Create Account</h2>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>person</span>
              <input id="signupName" type="text" placeholder="Full Name" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>email</span>
              <input id="signupEmail" type="email" placeholder="Email" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>phone</span>
              <input id="signupPhone" type="tel" placeholder="Phone Number" style={styles.input} />
            </div>
            <input id="signupReferral" type="hidden" value="2581463978" />
            <div style={styles.note}>Referral Code: Z2486244</div>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>lock</span>
              <input id="signupPassword" type="password" placeholder="Password" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <span className="material-icons" style={styles.icon}>lock_open</span>
              <input id="signupConfirmPassword" type="password" placeholder="Confirm Password" style={styles.input} />
            </div>
            <button onClick={handleSignup} style={styles.button}>Sign Up</button>
            <button onClick={handleGoogleSignup} style={{ ...styles.button, background: "#00E676", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span className="material-icons">account_circle</span> Sign up with Google
            </button>
            <div style={styles.link} onClick={toggleForms}>Already have an account? Login</div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "#00C853",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#fff",
    color: "#333",
    padding: "30px 25px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  heading: {
    color: "#00C853",
    fontSize: 24,
    marginBottom: 10,
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "10px 15px",
    margin: "10px 0",
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
    color: "#00C853",
  },
  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  note: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#00C853",
    color: "white",
    fontWeight: 600,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    marginTop: 15,
  },
  link: {
    marginTop: 15,
    fontSize: 13,
    color: "#00C853",
    cursor: "pointer",
  },
};
