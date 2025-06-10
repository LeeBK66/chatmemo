// 로그인 상태 확인
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

function logout() {
    // 로그인 상태 제거
    sessionStorage.removeItem('isLoggedIn');
    // 로그인 페이지로 이동
    window.location.href = 'index.html';
}

// textarea 자동 높이 조절
function adjustTextareaHeight() {
    const textarea = document.getElementById('message-input');
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// 현재 시간을 포맷팅하는 함수
function formatDateTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${month}/${day} ${hours}:${minutes}`;
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    const userName = sessionStorage.getItem('userName');
    
    if (message) {
        const chatDisplay = document.getElementById('chat-display');
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        
        // 이름과 메시지를 포함하는 HTML 생성
        messageElement.innerHTML = `
            <span class="message-name">${userName}</span>
            <span class="message-content">${message}</span>
        `;
        
        // 메시지를 메모장으로 이동할 수 있도록 클릭 이벤트 추가
        messageElement.onclick = function() {
            moveToMemo(userName, message);
        };
        
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        messageInput.value = '';
        messageInput.style.height = 'auto'; // 메시지 전송 후 textarea 높이 초기화
    }
}

function moveToMemo(userName, text) {
    const memoDisplay = document.getElementById('memo-display');
    const memoItem = document.createElement('div');
    memoItem.className = 'memo-item';
    
    // 메모 항목에 이름, 내용, 시간을 포함하는 HTML 생성
    memoItem.innerHTML = `
        <div class="memo-header">
            <span class="memo-name">${userName}</span>
            <span class="memo-time">${formatDateTime()}</span>
        </div>
        <div class="memo-content">${text}</div>
    `;
    
    memoDisplay.appendChild(memoItem);
    memoDisplay.scrollTop = memoDisplay.scrollHeight;
}

// Enter 키로 메시지 전송 (Shift + Enter는 줄바꿈)
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// textarea 입력 시 자동 높이 조절
document.getElementById('message-input').addEventListener('input', adjustTextareaHeight);
