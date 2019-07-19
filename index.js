const defaultCardArray = ["img/blue.jpg","img/blue.jpg","img/red.jpg",
    "img/red.jpg","img/yellow.png","img/yellow.png", "img/green.jpg", "img/green.jpg", "img/pink.jpg","img/pink.jpg",
    "img/grey.png", "img/grey.png","img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg"
];

const defaultCardArray6x6 = [
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
];

const defaultCardArray8x8 = [
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png"
];

let score = 0;
const keyUsers = "Users";
const keyUser = 'User';
const scoreContainer =  document.getElementById('score');

const createTableRecords = () => {
    let table = document.createElement('table');
    let tableWrapper = document.querySelector('.table-wrapper');


    table.setAttribute('id', 'records-table');

    let tr = document.createElement('tr');
    table.appendChild(tr);
    tr.appendChild(document.createElement('th'));
    tr.appendChild(document.createElement('th'));
    table.rows[0].cells[0].innerHTML = 'Username';
    table.rows[0].cells[1].innerHTML = 'Score';
    tableWrapper.appendChild(table);

    const users = JSON.parse(localStorage.getItem(keyUsers));
    if (users.length > 1) {
        users.sort((a, b) => {
            return b.score - a.score;
        })
    }
    let i = 1;
    users.forEach(elem => {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        table.rows[i].cells[0].textContent = elem.userName;
        table.rows[i].cells[1].innerHTML = elem.score;
        i++;
    });

};

const seeRecordsTable = () => {
    const table = document.getElementById('records-table');
    document.querySelector('.table-wrapper').classList.add('show-modal');
    if(document.body.contains(table)) {
        table.remove();
    } else  {
        createTableRecords();
    }
};

const windowOnClick = (e) => {
    if (e.target === document.querySelector('.table-wrapper')) {
        document.getElementById('records-table').remove();
        document.querySelector('.table-wrapper').classList.remove('show-modal');
    }
};
window.addEventListener('click', windowOnClick);

const addRecordToTable = () => {
    const user = JSON.parse(localStorage.getItem(keyUser));

    if (JSON.parse(localStorage.getItem(keyUsers) === null)) {
        const users = [user];
        localStorage.setItem(keyUsers, JSON.stringify(users));
    } else {
        let users = JSON.parse(localStorage.getItem(keyUsers));
        if (users.length < 3) {
            users.push(user);
        } else {
            let min = Math.min.apply(null, users.map(item => item.score));
            if (user.score > min) {
                users = users.filter(e => e.score !== min);
                users.push(user);
            }
        }
        localStorage.setItem(keyUsers, JSON.stringify(users));
    }
    createTableRecords();
};

const logOut = () => {
    window.location = './form/form.html';
};

const logOutBtn = document.getElementById('log-out');
logOutBtn.addEventListener('click', logOut);

const recordsBtn = document.getElementById('record-table');
recordsBtn.addEventListener('click', seeRecordsTable);

const changeDifficulty = () => {
    const radioButtons = document.getElementsByName('difficulty');
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change',e => {
            if(parseInt(e.currentTarget.value) === 6) {
                e.currentTarget.checked = true;
                createBoard();
            }
            else if(parseInt(e.currentTarget.value) === 8) {
                e.currentTarget.checked = true;
                createBoard();
            } else {
                e.currentTarget.checked = true;
                createBoard();
            }
        });
    });

};


createBoard();
changeDifficulty();



