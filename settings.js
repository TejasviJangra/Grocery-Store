
    // Fetch user details and pre-fill fields
    document.addEventListener('DOMContentLoaded', function () {
      const loggedInUser = sessionStorage.getItem('loggedInUser');
      const users = JSON.parse(localStorage.getItem('users')) || [];

      if (loggedInUser) {
        const currentUser = users.find(user => user.username === loggedInUser);
        if (currentUser) {
          document.getElementById('username').value = currentUser.username;
          document.getElementById('email').value = currentUser.email;
          document.getElementById('address').value = currentUser.address;
        }
      }
    });

    // Update profile function
    function updateProfile() {
      const loggedInUser = sessionStorage.getItem('loggedInUser');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.username === loggedInUser);

      if (currentUser) {
        currentUser.username = document.getElementById('username').value;
        currentUser.email = document.getElementById('email').value;
        currentUser.address = document.getElementById('address').value;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Profile updated successfully!');
      }
    }

    // Change password function
    function changePassword() {
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const loggedInUser = sessionStorage.getItem('loggedInUser');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.username === loggedInUser);

      if (currentUser && currentUser.password === currentPassword) {
        currentUser.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Password changed successfully!');
        window.location.href = 'settings.html'; // Redirect to settings page
      } else {
        alert('Incorrect current password!');
      }
    }

    // Update notifications function
    function updateNotifications() {
      const emailNotifications = document.getElementById('email-notifications').checked;
      const smsNotifications = document.getElementById('sms-notifications').checked;
      alert(`Notifications updated: Email - ${emailNotifications}, SMS - ${smsNotifications}`);
    }

    // Update privacy settings function
    function updatePrivacy() {
      const publicProfile = document.getElementById('public-profile').checked;
      const shareData = document.getElementById('share-data').checked;
      alert(`Privacy settings updated: Public Profile - ${publicProfile}, Share Data - ${shareData}`);
    }

    // Apply theme function
    function applyTheme() {
      const theme = document.getElementById('theme-select').value;
      alert(`Theme changed to: ${theme}`);
    }

    // Log out function
    function logOut() {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = 'login.html'; // Redirect to login page
    }
    function applyTheme() {
      const theme = document.getElementById('theme-select').value;
      const root = document.documentElement;
    
      switch (theme) {
        case 'light':
          root.style.setProperty('--bg-color', '#ffffff');
          root.style.setProperty('--text-color', '#333333');
          root.style.setProperty('--accent-color', '#007bb5');
          break;
        case 'dark':
          root.style.setProperty('--bg-color', '#1e1e1e');
          root.style.setProperty('--text-color', '#f5f5f5');
          root.style.setProperty('--accent-color', '#4444ff');
          break;
        case 'blue':
          root.style.setProperty('--bg-color', '#e6f7ff');
          root.style.setProperty('--text-color', '#003366');
          root.style.setProperty('--accent-color', '#0066cc');
          break;
        default:
          alert('Invalid theme selected.');
      }
    
      alert(`Theme changed to: ${theme}`);
    }
    