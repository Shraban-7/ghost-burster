// Function to check if the user has a JWT token (is authenticated)
const isUserAuthenticated = () => {
            // Get all cookies and split them into an array
            const cookies = document.cookie.split(';');

            // Loop through the cookies to find the JWT token
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                // Trim spaces from name and value to handle whitespace inconsistencies
                const cookieName = name.trim();
                const cookieValue = value.trim();
                // Check if the cookie name is "jwt" and if it has a non-empty value
                if (cookieName === "jwt" && cookieValue !== "") {
                    return true;
                }
            }

            return false;
        };

        

// Function to update the navigation items and buttons based on user authentication
const updateNavigation = () => {
  const isAuthenticated = isUserAuthenticated();
  const navigationElement = document.getElementById("navigation");
  const buttonsElement = document.querySelector(".col-md-3.text-end");

  if (isAuthenticated) {
    // User is authenticated, show 'me' and 'logout'
    navigationElement.innerHTML = `
                    <li><a href="/" class="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="/ghosts/list" class="nav-link px-2">Ghost</a></li>
                    <li><a href="/ghosts/create" class="nav-link px-2">Ghost create</a></li>
                    <li><a href="/bookings/list" class="nav-link px-2">Booking</a></li>
                `;
    buttonsElement.innerHTML = `
                    <a href="/users/logout" class="btn btn-outline-primary me-2">Logout</a>
                    <a href="/users/me" class="btn btn-primary">me</a>
                `;
  } else {
    // User is not authenticated, show 'Login' and 'Register'
    navigationElement.innerHTML = `
                    <li><a href="/" class="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="/ghosts/list" class="nav-link px-2">Ghost</a></li>
                    <li><a href="/ghosts/create" class="nav-link px-2">Ghost create</a></li>
                    <li><a href="/bookings/list" class="nav-link px-2">Booking</a></li>
                `;
    buttonsElement.innerHTML = `
                    <a href="/users/login" class="btn btn-outline-primary me-2">Login</a>
                    <a href="/users/register" class="btn btn-primary">Sign-up</a>
                `;
  }
};

// Call the function to update the navigation when the page loads
updateNavigation();
