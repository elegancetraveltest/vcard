// Check if the browser supports service workers and PWA functionality
if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser install prompt
    event.preventDefault();

    // Store the event for later use
    deferredPrompt = event;

    // Show the install button
    const installApp = document.getElementById('installApp');
    installApp.style.display = 'block';

    // Add click event listener to trigger the install prompt
    installApp.addEventListener('click', () => {
      // Trigger the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }

        // Reset the deferredPrompt
        deferredPrompt = null;
      });

      // Hide the button
      installApp.style.display = 'none';
    });
  });

  // Check if the PWA is already installed
  window.addEventListener('appinstalled', () => {
    const installApp = document.getElementById('installApp');
    installApp.style.display = 'none';
  });
}
       window.addEventListener('load', () => {
          registerSW();
        });
     
        // Register the Service Worker
        async function registerSW() {
          if ('serviceWorker' in navigator) {
            try {
              await navigator
                    .serviceWorker
                    .register('serviceworker.js');
            }
            catch (e) {
              console.log('SW registration failed');
            }
          }
        }
        function isAppleDevice() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
      // Показване на бутона само ако потребителят използва Apple устройство
        if (isAppleDevice()) {
            document.write('<button onclick="addToHomeScreen()">Save vCARD</button>');
        }
        function addToHomeScreen() {
            alert("Please tap the Apple share button and then select 'Add to Home Screen' to save this vCARD.");
        }
        