// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Change email logic
document.getElementById('change-email-btn').addEventListener('click', () => {
    const newEmail = document.getElementById('new-email').value;

    // Reauthenticate the user (You may need additional checks here)
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        // User's current password here
        'current-password'
    );

    user.reauthenticateWithCredential(credential)
        .then(() => {
            // Change email
            user.updateEmail(newEmail)
                .then(() => {
                    // Email updated successfully
                    console.log('Email changed successfully');
                    alert('Email changed successfully. Please sign in again with your new email.');
                    // Sign the user out after changing email
                    firebase.auth().signOut();
                })
                .catch((error) => {
                    console.error('Change email error:', error);
                    alert('Failed to change email. Please try again.');
                });
        })
        .catch((error) => {
            console.error('Reauthentication error:', error);
            alert('Failed to reauthenticate. Please sign in again.');
        });
});

// Change password logic
document.getElementById('change-password-btn').addEventListener('click', () => {
    const newPassword = document.getElementById('new-password').value;

    const user = firebase.auth().currentUser;

    user.updatePassword(newPassword)
        .then(() => {
            // Password updated successfully
            console.log('Password changed successfully');
            alert('Password changed successfully. Please sign in again with your new password.');
            // Sign the user out after changing password
            firebase.auth().signOut();
        })
        .catch((error) => {
            console.error('Change password error:', error);
            alert('Failed to change password. Please try again.');
        });
});

// Delete account logic
document.getElementById('delete-account-btn').addEventListener('click', () => {
    const user = firebase.auth().currentUser;

    // Ask for confirmation before deleting the account
    const confirmation = confirm("Are you sure you want to delete your account? This action is irreversible and will permanently delete your data.");

    if (confirmation) {
        user.delete()
            .then(() => {
                // Account deleted successfully
                console.log('Account deleted successfully');
                alert('Your account has been deleted.');
                // Redirect
