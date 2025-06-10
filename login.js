// 사용자 목록 (실제로는 서버에서 관리해야 함)
let users = JSON.parse(localStorage.getItem('users')) || [];

// 초기 사용자가 없으면 기본 사용자 추가
if (users.length === 0) {
    users.push({
        name: "홍길동",
        password: "123456"
    });
    localStorage.setItem('users', JSON.stringify(users));
}

// 환영 메시지 표시 함수
function showWelcomeMessage(name) {
    // 환영 메시지 요소 생성
    const welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-message';
    welcomeDiv.textContent = `${name}님 환영합니다!`;
    document.body.appendChild(welcomeDiv);

    // 1초 후 메시지 제거
    setTimeout(() => {
        welcomeDiv.remove();
    }, 1000);
}

function login() {
    const password = document.getElementById('password').value;

    if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
    }

    const user = users.find(u => u.password === password);
    
    if (user) {
        // 환영 메시지 표시
        showWelcomeMessage(user.name);
        
        // 로그인 상태 저장
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userName', user.name);
        
        // 1초 후 채팅방으로 이동
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 1000);
    } else {
        alert('비밀번호가 올바르지 않습니다.');
    }
}

// Enter 키로 로그인
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        login();
    }
}); 