// 관리자 권한 확인
if (!sessionStorage.getItem('isAdmin')) {
    window.location.href = 'admin.html';
}

// 사용자 목록 (실제로는 서버에서 관리해야 함)
let users = JSON.parse(localStorage.getItem('users')) || [];

// 페이지 로드 시 사용자 목록 표시
window.onload = function() {
    displayUsers();
};

function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <span>${user.name}</span>
            <button onclick="deleteUser(${index})" class="delete-btn">삭제</button>
        `;
        userList.appendChild(userItem);
    });
}

function addUser() {
    const name = document.getElementById('new-name').value;
    const password = document.getElementById('new-password').value;

    if (!name || !password) {
        alert('이름과 비밀번호를 모두 입력해주세요.');
        return;
    }

    if (users.length >= 100) {
        alert('최대 사용자 수(100명)에 도달했습니다.');
        return;
    }

    if (users.some(u => u.password === password)) {
        alert('이미 사용 중인 비밀번호입니다.');
        return;
    }

    // 새 사용자 추가
    users.push({ name, password });
    localStorage.setItem('users', JSON.stringify(users));

    // 입력 필드 초기화 및 목록 갱신
    document.getElementById('new-name').value = '';
    document.getElementById('new-password').value = '';
    displayUsers();
}

function deleteUser(index) {
    if (confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
}

function logout() {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'admin.html';
} 