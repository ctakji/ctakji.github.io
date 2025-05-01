// 컴포넌트 로드 함수
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // 헤더가 로드된 후 현재 페이지 메뉴 활성화 및 햄버거 메뉴 이벤트 바인딩
        if (elementId === 'header') {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const menuLinks = document.querySelectorAll('.nav-links a');
            menuLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });

            // 햄버거 메뉴 이벤트 바인딩
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', function() {
                    hamburger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
                });

                // 모바일 메뉴 링크 클릭 시 메뉴 닫기
                const mobileLinks = navLinks.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        body.style.overflow = '';
                    });
                });

                // 화면 크기가 768px 이상일 때 메뉴 상태 초기화
                const resetMenu = () => {
                    if (window.innerWidth > 768) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        body.style.overflow = '';
                    }
                };

                // 리사이즈 이벤트 리스너
                window.addEventListener('resize', resetMenu);
            }
        }
    } catch (error) {
        console.error(`Error loading component: ${componentPath}`, error);
    }
}

// 페이지 로드 시 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
}); 