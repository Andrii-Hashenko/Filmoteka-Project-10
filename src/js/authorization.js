import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';
import getRefs from './get-refs';
import { watched, queue } from './modal-movie-details';
import { translateItems } from './localization';
import { translateMsg } from './translate';
import messages from './languages/notiflix.json';

const userCreatedMsg = messages.auth.created;
const failureMsg = messages.auth.failure;
const loginMsg = messages.auth.login;
const loginFailMsg = messages.auth.loginFail;
const logWithGoogle = messages.auth.logwith.google;
const logWithFacebook = messages.auth.logwith.facebook;
const logWithGithub = messages.auth.logwith.github;
const logoutMsg = messages.auth.logout;

const firebaseConfig = {
  apiKey: "AIzaSyD7WECfyM6dTqk4SuatXK2A4h1ZIXobEp0",
  authDomain: "filmoteka-project-10.firebaseapp.com",
  projectId: "filmoteka-project-10",
  storageBucket: "filmoteka-project-10.appspot.com",
  messagingSenderId: "624096364756",
  appId: "1:624096364756:web:3c0bcaa1b226f1ccf8d341",
  measurementId: "G-PNMNJZXNGX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerFb = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();
const db = getDatabase();
const refs = getRefs();
refs.logoutBtn.style.display = 'none';

const instance = basicLightbox.create(
  `
  <div class="modal">
    <div class="modal-auth-container">
      <div class="login-signup-container">
        <h3 class="auth-container-title" data-key="form-name">Log in</h3>
        <button id="openSignUpModalBtn" class="sign-up-btn" data-key="sign-up">Sign up</button>
      </div>
      <button type="button" id="close-modal-btn">
        <svg width="25" height="25">
          <use href="/drafts/sprite.ba1893dc.svg#close-btn"></use>
        </svg>
      </button>
        <p class="auth-container-text" data-key="description">To log in, enter your email address and password</p>
        <input type="email" placeholder="E-mail" class="email-input" id="login-email" data-key="email">
        <input type="password" placeholder="Password" class="passw-input" id="login-password" data-key="password">
        <button class="login-btn" id="loginBtn" data-key="modal-login">Log in</button>
        <p class="auth-google-text" data-key="authorization">Authorization with social networks</p>
        <div class="auth-social">
          <ul class="social-list">
            <li class="social-items">
              <a id="login-google" class="social-login-btn">
                <svg width="25" height="25">
                  <use href="/drafts/sprite.ba1893dc.svg#icon-google"></use>
                </svg>
              </a>
            </li>
            <li class="social-items">
              <a id="login-fb" class="social-login-btn fb-btn">
                <svg width="25" height="25">
                  <use href="/drafts/sprite.ba1893dc.svg#facebook"></use>
                </svg>
              </a>
            </li>
            <li class="social-items">
              <a id="login-github" class="social-login-btn git-btn">
                <svg width="25" height="25">
                  <use href="/drafts/sprite.ba1893dc.svg#icon-github"</use>
                </svg>
              </a>
            </li>            
          </ul>
        </div>
      </div>
  </div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('#close-modal-btn').onclick = instance.close;
    },
  },
);

const instance2 = basicLightbox.create(
  `
  <div class="modal">
  <div class="modal-auth-container">
    <div class="login-signup-container">
      <h3 class="auth-container-title" data-key="sign-up">Sign up</h3>
      <button id="alreadyHaveAccount" class="login-up-btn" data-key="form-name">Log in</button>
    </div>
      <button type="button" id="close-modal-btn">
        <svg width="25" height="25">
          <use href="/drafts/sprite.ba1893dc.svg#close-btn"></use>
        </svg>
      </button>
        <input type="email" placeholder="E-mail" class="email-input sign-up" id="sign-email" data-key="email">
        <input type="password" placeholder="Password" class="passw-input" id="sign-password" data-key="password">
    <button class="login-btn" id="signUp" data-key="sign-up-btn">Sign up</button>
  </div>

</div>
`,
  {
    onShow: instance => {
      instance.element().querySelector('#close-modal-btn').onclick = instance.close;
    },
  },
);

refs.openSignInModalBtn.addEventListener('click', openSigInModal);
refs.logoutBtn.addEventListener('click', logOutUser);

function openSigInModal() {
  instance2.close();
  instance.show();
  const openSignUpModalBtn = document.querySelector('#openSignUpModalBtn');
  openSignUpModalBtn.addEventListener('click', openSignUpModal);

  const loginBtn = document.querySelector('#loginBtn');
  loginBtn.addEventListener('click', loginUser);

  const loginGoogle = document.querySelector('#login-google');
  loginGoogle.addEventListener('click', loginWithGoogle);

  const loginFb = document.querySelector('#login-fb');
  loginFb.addEventListener('click', loginWithFacebook);

  const loginGithub = document.querySelector('#login-github');
  loginGithub.addEventListener('click', loginWithGithub);
  translateItems('.modal-auth-container [data-key]');
}

function openSignUpModal() {
  instance.close();
  instance2.show();
  const alreadyHaveAccount = document.querySelector('#alreadyHaveAccount');
  alreadyHaveAccount.addEventListener('click', openSigInModal);

  const signUpBtn = document.querySelector('#signUp');
  signUpBtn.addEventListener('click', signUpUser);
  translateItems('.modal-auth-container [data-key]');
}

function signUpUser() {
  let email = document.getElementById('sign-email').value;
  let password = document.getElementById('sign-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // const user = userCredential.user;
      Notify.success(translateMsg(userCreatedMsg), { position: 'center-top' });
      instance2.close();
    })
    .catch(error => {
      Notify.failure(translateMsg(failureMsg), { position: 'center-top' });
      console.log(error);
    });
}

function loginUser() {
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      Notify.success(translateMsg(loginMsg), { position: 'center-top' });
      instance.close();
    })
    .catch(error => {
      Notify.failure(translateMsg(loginFailMsg), { position: 'center-top' });
      console.log(error);
    });
}

function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success(translateMsg(logWithGoogle), { position: 'center-top' });
    })
    .catch(error => {
      Notify.failure(translateMsg(failureMsg), { position: 'center-top' });
      console.log(error);
    });
}

function loginWithFacebook() {
  signInWithPopup(auth, providerFb)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success(translateMsg(logWithFacebook), { position: 'center-top' });
    })
    .catch(error => {
      Notify.failure(translateMsg(failureMsg), { position: 'center-top' });
      console.log(error);
    });
}

function loginWithGithub() {
  signInWithPopup(auth, providerGithub)
    .then(result => {
      showUserDetails(result.user);
      instance.close();
      Notify.success(translateMsg(logWithGithub), { position: 'center-top' });
    })
    .catch(error => {
      Notify.failure(translateMsg(failureMsg), { position: 'center-top' });
      console.log(error);
    });
}

function logOutUser() {
  signOut(auth)
    .then(() => {
      Notify.success(translateMsg(logoutMsg), { position: 'center-top' });
      refs.userDetails.innerHTML = '';
      refs.openSignInModalBtn.style.display = 'block';
      refs.logoutBtn.style.display = 'none';
      location.reload();
    })
    .catch(error => {
      Notify.failure(translateMsg(failureMsg), { position: 'center-top' });
      console.log(error);
    });
}

function showUserDetails(user) {
  if (user.photoURL) {
    refs.userDetails.innerHTML = `
  <img class="user-img" src="${user.photoURL}" width=25"px">
  <p class="user-name">${user.displayName}</p>`;
  } else {
    refs.userDetails.innerHTML = `<p class="user-email">${user.email}</p>`;
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    const libraryBtn = document.querySelector('.menu_item_slide');
    libraryBtn.classList.remove('position');
    showUserDetails(user);
    refs.openSignInModalBtn.style.display = 'none';
    refs.logoutBtn.style.display = 'block';
    const { displayName, email, uid, photoURL } = user;
    writeUserData(displayName, email, uid, photoURL);
    
  } else {
    const libraryBtn = document.querySelector('.menu_item_slide');
    libraryBtn.classList.add('position');
  }
});

function writeUserData(displayName, email, uid, photoURL) {
  set(ref(db, 'users/' + uid), {
    Name: displayName,
    Email: email,
    Watched: watched,
    Queue: queue,
  });
}

function readUserData(auth) {
  const userId = auth.currentUser.uid;
  return onValue(ref(db, '/users/' + userId), snapshot => {}, {
    onlyOnce: true,
  });
}
