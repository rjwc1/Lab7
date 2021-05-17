// script.js
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful. Scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// query selector for settings and header
const settingsPage = document.querySelector('img');
const homePage = document.querySelector('h1');

// Settings icon
settingsPage.addEventListener('click', () => {
  setState('Settings', 1, -1);
});

// Heading
homePage.addEventListener('click', () => {
  setState('Head', 1, -1);
});

// Back button
window.addEventListener('popstate', (event) => {
  if (event.state.page_id == 'Settings') {
    setState('Settings', 0, -1);
  } else if (event.state.page_id == 'Head') {
    setState('Head', 0, -1);
  } else if (event.state.page_id == 'Entry') {
    setState('Entry', 0, newPost);
  }
});

let index = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.id = ++index;
        newPost.addEventListener('click', () => {
          setState('Entry', 1, newPost);
        });

      });
    });
});