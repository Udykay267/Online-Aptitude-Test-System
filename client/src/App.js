import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [timer, setTimer] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    const res = await axios.get('http://localhost:5000/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(res.data);
    fetchSubjects();
  };

  const fetchSubjects = async () => {
    const res = await axios.get('http://localhost:5000/api/exam/subjects');
    setSubjects(res.data);
  };

  const startSubject = (subject) => {
    setActiveSubject(subject);
    setTimer(subject.timeLimitMinutes * 60);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="p-6">
      {!user ? <button onClick={login}>Login with Google</button> :
        <div>
          <h1>Welcome {user.name}</h1>
          {!activeSubject ? (
            <div>
              <h2>Select a subject to start</h2>
              {subjects.map(subj => (
                <button key={subj._id} onClick={() => startSubject(subj)}>
                  {subj.name} ({subj.timeLimitMinutes} min)
                </button>
              ))}
            </div>
          ) : (
            <div>
              <h2>{activeSubject.name}</h2>
              <p>Time Left: {Math.floor(timer / 60)}:{timer % 60}</p>
              {/* Questions would go here */}
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default App;