// 이미지 모달 관련 함수
function openModal(imgSrc) {
    document.getElementById('imageModal').style.display = 'block';
    document.getElementById('modalImage').src = imgSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// ESC 키로 모달 닫기
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 모달 외부 클릭시 닫기
document.getElementById('imageModal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
}); 