
    async function login() {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'your-username',
            password: 'your-password',
          }),
        });
        const data = await response.json();
        if (data.token) {
          // Save the token to be used in subsequent requests
          window.location.href = '/';
        }
      } catch (err) {
        console.error(err);
      }
    }
 