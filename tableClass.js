class TableClass {
    constructor() {
        this.keyUsers = 'Users';
        this.keyUser = 'User';
    }

    static get table() {
        return  document.getElementById('records-table');
    }
   
    createTableRecords() {
        const table = document.createElement('table');
        table.setAttribute('id', 'records-table');
        const tableWrapper = document.querySelector('.table-wrapper');
        const tr = document.createElement('tr');
        table.appendChild(tr);
        tr.appendChild(document.createElement('th'));
        tr.appendChild(document.createElement('th'));
        table.rows[0].cells[0].innerHTML = 'Username';
        table.rows[0].cells[1].innerHTML = 'Score';
        tableWrapper.appendChild(table);

        const users = JSON.parse(localStorage.getItem(this.keyUsers));
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

    seeRecordsTable() {
        TableClass.table;
        document.querySelector('.table-wrapper').classList.add('show-modal');
        this.createTableRecords();
    };

    addRecordToTable() {
        const user = JSON.parse(localStorage.getItem(this.keyUser));

        if (JSON.parse(localStorage.getItem(this.keyUsers) === null)) {
            const users = [user];
            localStorage.setItem(this.keyUsers, JSON.stringify(users));
        } else {
            let users = JSON.parse(localStorage.getItem(this.keyUsers));
            if (users.length < 3) {
                users.push(user);
            } else {
                let min = Math.min.apply(null, users.map(item => item.score));
                if (user.score > min) {
                    users = users.filter(e => e.score !== min);
                    users.push(user);
                }
            }
            localStorage.setItem(this.keyUsers, JSON.stringify(users));
        }
        this.createTableRecords();
    };
}