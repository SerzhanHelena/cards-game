const password = document.getElementById('password');
const username = document.getElementById('username');

const loginUser = (username, password) => {
    const user = {
        userName: username.value,
        password: password.value
    };
    const users = [];
    users.push(user);
    localStorage.setItem("User", JSON.stringify(user));
    localStorage.setItem("Users", JSON.stringify(users));
};
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', loginUser.bind(null, username, password));

