// 관리자 계정 (실제로는 서버에서 관리해야 함)
const ADMIN_NAME = "관리자";
const ADMIN_PASSWORD = "admin123";

function adminLogin() {
    const name = document.getElementById('admin-name').value;
    const password = document.getElementById('admin-password').value;

    if (!name || !password) {
        alert('이름과 비밀번호를 모두 입력해주세요.');
        return;
    }

    if (name === ADMIN_NAME && password === ADMIN_PASSWORD) {
        // 관리자 로그인 상태 저장
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('adminName', name);
        // 관리자 패널로 이동
        window.location.href = 'admin-panel.html';
    } else {
        alert('관리자 이름 또는 비밀번호가 올바르지 않습니다.');
    }
}

// Enter 키로 로그인
document.getElementById('admin-password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adminLogin();
    }
}); 