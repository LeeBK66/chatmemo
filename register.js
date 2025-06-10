// 사용자 목록 (실제로는 서버에서 관리해야 함)
let users = JSON.parse(localStorage.getItem('users')) || [];

function register() {
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!name || !password || !confirmPassword) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
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

    alert('회원가입이 완료되었습니다.');
    window.location.href = 'index.html';
}

// Enter 키로 회원가입
document.getElementById('confirm-password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        register();
    }
}); 