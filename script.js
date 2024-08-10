document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Simple admin login check
    if (username === 'admin' && password === 'admin123') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('navbar').style.display = 'flex';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
        loadDashboard();
    } else {
        alert('Invalid login credentials');
    }
});

document.getElementById('logoutBtn').addEventListener('click', function () {
    document.getElementById('login').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
});

document.getElementById('themeSwitch').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
    this.nextElementSibling.textContent = this.checked ? 'Light Mode' : 'Dark Mode';
});

document.getElementById('loginThemeSwitch').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
    this.nextElementSibling.textContent = this.checked ? 'Light Mode' : 'Dark Mode';
});

let cars = [];

function loadDashboard() {
    updateCarList();
}

document.getElementById('carForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const carId = document.getElementById('carId').value;
    const carName = document.getElementById('carName').value;
    const carYear = document.getElementById('carYear').value;
    const carPrice = document.getElementById('carPrice').value;

    if (carId) {
        // Update existing car
        const car = cars.find(c => c.id === carId);
        car.name = carName;
        car.year = carYear;
        car.price = carPrice;
    } else {
        // Add new car
        const newCar = {
            id: Date.now().toString(),
            name: carName,
            year: carYear,
            price: carPrice
        };
        cars.push(newCar);
    }

    $('#carModal').modal('hide');
    updateCarList();
});

function updateCarList() {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';
    cars.forEach(car => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <span>${car.name} (${car.year}) - $${car.price}</span>
            <div>
                <button class="btn btn-sm btn-primary" onclick="editCar('${car.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCar('${car.id}')">Delete</button>
            </div>
        `;
        carList.appendChild(listItem);
    });
}

function editCar(id) {
    const car = cars.find(c => c.id === id);
    document.getElementById('carId').value = car.id;
    document.getElementById('carName').value = car.name;
    document.getElementById('carYear').value = car.year;
    document.getElementById('carPrice').value = car.price;
    $('#carModal').modal('show');
}

function deleteCar(id) {
    cars = cars.filter(c => c.id !== id);
    updateCarList();
}