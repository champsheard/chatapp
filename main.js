// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference the sign-in and sign-up forms
const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');

// Show the sign-up form when the user clicks "Sign Up" link
document.getElementById('sign-up-link').addEventListener('click', () => {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

// Show the sign-in form when the user clicks "Sign In" link
document.getElementById('sign-in-link').addEventListener('click', () => {
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
});

// Sign-up form submission
document.getElementById('signup-btn').addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Create a new user with Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            console.log('User signed up:', user);
            // Add any additional logic or redirection here
        })
        .catch((error) => {
            // Handle errors
            console.error('Sign-up error:', error);
        });
});

// Sign-in form submission
document.getElementById('signin-btn').addEventListener('click', () => {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Sign in with Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user);
            // Add any additional logic or redirection here
        })
        .catch((error) => {
            // Handle errors
            console.error('Sign-in error:', error);
        });
});

// Sign-out logic
document.getElementById('sign-out-btn').addEventListener('click', () => {
    // Sign out the current user
    firebase.auth().signOut().then(() => {
        // Sign-out successful, you can redirect or update UI as needed
        console.log('User signed out');
    }).catch((error) => {
        // Handle errors
        console.error('Sign-out error:', error);
    });
});

// Password reset logic
document.getElementById('reset-password-btn').addEventListener('click', () => {
    const email = prompt('Enter your email to reset your password:');

    if (email) {
        // Send a password reset email
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent
                console.log('Password reset email sent');
                alert('Check your email for a password reset link.');
            })
            .catch((error) => {
                // Handle errors
                console.error('Password reset error:', error);
                alert('Password reset failed. Please check the email address and try again.');
            });
    }
});
