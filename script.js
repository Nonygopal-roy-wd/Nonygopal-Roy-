// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Login Functionality
document.getElementById('login').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('login-page').style.display = 'none';
      document.getElementById('chat-page').style.display = 'block';
    })
    .catch(error => console.error(error.message));
});

// Send Message
document.getElementById('sendMessage').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  db.ref('messages').push({
    sender: auth.currentUser.email,
    content: message
  });
  document.getElementById('messageInput').value = '';
});

// Fetch Messages
db.ref('messages').on('value', snapshot => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  snapshot.forEach(childSnapshot => {
    const message = childSnapshot.val();
    const div = document.createElement('div');
    div.textContent = `${message.sender}: ${message.content}`;
    messagesDiv.appendChild(div);
  });
});