const form = document.querySelector("#post-form");

form.addEventListener("submit", submitPost);

// Fetch all posts as soon as app is loaded
getAllPosts();

function getAllPosts() {
  fetch("http://localhost:3000/posts")
    .then((r) => r.json())
    .catch(console.warn);
}

// Create post

function submitPost(e) {
  e.preventDefault();

  let postData = {
    title: e.target.title.value,
    name: e.target.name.value,
    message: e.target.message.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: { "Content-Type": "application/json" },
  };

  fetch("http://localhost:3000/posts", options)
    .then((r) => r.json())
    .then(() => e.target.reset())
    .catch(console.warn);
}
