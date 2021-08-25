document.querySelector("#post-form").addEventListener("submit", (e) => {
    formSubmitHandler(e);
});

document.querySelector("#search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    refreshPosts(e.target.query.value);
    document.querySelector("#query").value = '';
});

async function getAllPosts() {
    try {
        const response = await fetch(`http://localhost:3000/posts`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getPostsMatchingQuery(query) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${query}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function formSubmitHandler(e) {
    try {
        const resp = await postNewPost(e);
        const allData = await getAllPosts();
        renderPostModal(allData.title, allData.name, allData.message);
    } catch (err) {
        renderErrorModal(err);
    }
}

function renderPost(title, name, message) {
    const container = `<div class="post-entry"><h1>${title}</h1><h2>${name}</h2><p>${message}</p><div>`;
    const postContainer = document.querySelector("#posts-container");

    // TODO: Sanitise.
    postContainer.innerHTML += container;
}

function renderErrorModal(err) {
    // TODO: render error message
    console.warn(err);
}

async function postNewPost(e) {
    e.preventDefault();

    try {
        const data = {
            title: e.target.title.value,
            name: e.target.name.value,
            message: e.target.message.value,
        };

        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        };

        await fetch("http://localhost:3000/posts", options);

        refreshPosts();
    } catch (err) {
        console.warn(err);
    }
}

async function refreshPosts(query = '') {
    let data;
    if (!query) { data = await getAllPosts(); console.log('query empty'); }
    else { data = await getPostsMatchingQuery(query) }
    const postContainer = document.querySelector("#posts-container");
    postContainer.innerHTML = "";
    let sortedPost = data.posts.reverse();
    for (post of sortedPost) {
        renderPost(post.title, post.name, post.message);
    }
}

refreshPosts();
