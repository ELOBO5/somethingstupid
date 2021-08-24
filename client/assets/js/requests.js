document.querySelector('#post-form').addEventListener('submit', (e) => { formSubmitHandler(e) });

async function getAllPosts() {
    try {
        const response = await fetch(`http://localhost:3000/posts`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getPostsMatchingQuery(query) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${query}`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}
async function formSubmitHandler(e) {

    try {
        const resp = await postNewPost(e);
        const allData = await getAll();
        console.log(allData);
        renderPostModal(allData.title, allData.name, allData.message);
    } catch (err) {
        renderErrorModal(err);
    }
}

function renderPost(title, name, message) {
    console.log(`${title}, ${name}, ${message}`);
    const container = `<div class="post-entry"><h1>${title}</h1><h2>${name}</h2><p>${message}</p><div>`;
    const postContainer = document.querySelector('#posts-container');

    // NOTE: Danger here. Sanitise or use something else.
    postContainer.innerHTML += container;
}

function renderErrorModal(err) {
    // DO NOTHING
}

async function postNewPost(e) {
    e.preventDefault();

    try {

        const data = {
            title: e.target.title.value,
            name: e.target.name.value,
            message: e.target.message.value
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }

        await fetch('http://localhost:3000/posts', options);

        refreshPosts();

    } catch (err) {
        console.warn(err);
    }
}

async function refreshPosts(query = '') {
    let data;
    if (!query) data = await getAllPosts();
    else data = await getPostsMatchingQuery(query);
    const postContainer = document.querySelector('#posts-container');
    postContainer.innerHTML = '';
    for (post of data.posts) {
        renderPost(post.title, post.name, post.message);
    }
}

refreshPosts();
