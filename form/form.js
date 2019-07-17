const password = document.getElementById('password');
const username = document.getElementById('username');

const loginUser = (username, password) => {
    const user = {
        userName: username.value,
        password: password.value
    };
    localStorage.setItem("User", JSON.stringify(user));
};
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', loginUser.bind(null, username, password));

