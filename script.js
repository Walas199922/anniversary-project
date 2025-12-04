// Variáveis globais
let currentIndex = 0;
let autoScrolling = false;
let timelinePhotos = [];
let galleryPhotos = [];

// Data de início do relacionamento
const startDate = new Date('2023-03-27');

// Event listener principal
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initializeTimeline();
    loadTimelinePhotos();
    loadGalleryPhotos();
    
    // Auto scroll timeline
    setTimeout(startAutoScroll, 3000);
});

function updateCountdown() {
    const now = new Date();
    const difference = now - startDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function loadTimelinePhotos() {
    timelinePhotos = [
        { 
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/1.jpg',
            title: '27/03/2023',
            description: 'O nosso primeiro encontro'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/2.jpg',
            title: '01/04/2023',
            description: 'Nossa primeira foto juntos'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/3.jpg',
            title: '15/04/2023',
            description: 'Primeiro passeio especial'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/4.jpg',
            title: '30/04/2023',
            description: 'Um mês de amor'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/5.jpg',
            title: '27/05/2023',
            description: 'Dois meses juntos'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/6.jpg',
            title: '27/06/2023',
            description: 'Três meses de felicidade'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/7.jpg',
            title: '27/07/2023',
            description: 'Quatro meses incríveis'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/8.jpg',
            title: '27/08/2023',
            description: 'Cinco meses de amor verdadeiro'
        }
    ];
    
    updateTimelineDisplay();
}

function loadGalleryPhotos() {
    galleryPhotos = [
        'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/9.jpg',
        'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/10.jpg',
        'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/11.jpg',
        'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/images/12.jpg'
    ];
    
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    galleryPhotos.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<img src="${src}" alt="Foto ${index + 1}" onclick="openGalleryPhoto(${index})">`;
        gallery.appendChild(div);
    });
}

function initializeTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    timeline.addEventListener('wheel', (e) => {
        e.preventDefault();
        timeline.scrollLeft += e.deltaY;
        stopAutoScroll();
    });
}

function updateTimelineDisplay() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    timelinePhotos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'timeline-photo';
        if (index === currentIndex) photoDiv.classList.add('active');
        
        photoDiv.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" onclick="openPhotoModal('${photo.src}', '${photo.title}', '${photo.description}')">
            <div class="timeline-info">
                <h4>${photo.title}</h4>
                <p>${photo.description}</p>
            </div>
        `;
        
        timeline.appendChild(photoDiv);
    });
}

function startAutoScroll() {
    if (autoScrolling) return;
    
    autoScrolling = true;
    const interval = setInterval(() => {
        if (!autoScrolling) {
            clearInterval(interval);
            return;
        }
        
        currentIndex = (currentIndex + 1) % timelinePhotos.length;
        updateTimelineDisplay();
        
        const timeline = document.querySelector('.timeline');
        const activePhoto = timeline.querySelector('.timeline-photo.active');
        if (activePhoto) {
            activePhoto.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }, 4000);
}

function stopAutoScroll() {
    autoScrolling = false;
}

function nextPhoto() {
    stopAutoScroll();
    currentIndex = (currentIndex + 1) % timelinePhotos.length;
    updateTimelineDisplay();
    
    const timeline = document.querySelector('.timeline');
    const activePhoto = timeline.querySelector('.timeline-photo.active');
    if (activePhoto) {
        activePhoto.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}

function prevPhoto() {
    stopAutoScroll();
    currentIndex = (currentIndex - 1 + timelinePhotos.length) % timelinePhotos.length;
    updateTimelineDisplay();
    
    const timeline = document.querySelector('.timeline');
    const activePhoto = timeline.querySelector('.timeline-photo.active');
    if (activePhoto) {
        activePhoto.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}

// MODAL SYSTEM - VERSÃO SIMPLIFICADA
function openPhotoModal(src, title, description) {
    console.log('📸 Abrindo modal:', title);
    
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    
    if (!modal) {
        console.error('❌ Modal não encontrado!');
        return;
    }
    
    // Configurar conteúdo
    modalImg.src = src;
    modalTitle.textContent = title || '';
    modalDesc.textContent = description || '';
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Modal aberto!');
}

function closePhotoModal() {
    console.log('🔴 Fechando modal!');
    
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✅ Modal fechado!');
    }
}

function openGalleryPhoto(index) {
    const src = galleryPhotos[index];
    const title = `Foto da Galeria ${index + 1}`;
    const description = 'Momentos especiais nossos ❤️';
    
    openPhotoModal(src, title, description);
}

// Event listeners para fechar modal
document.addEventListener('DOMContentLoaded', function() {
    // Fechar ao clicar no X
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.onclick = closePhotoModal;
    }
    
    // Fechar ao clicar no overlay
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                closePhotoModal();
            }
        };
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePhotoModal();
        }
    });
});

// Função para abrir seção
function openSection(sectionName) {
    const sections = ['timeline', 'gallery', 'messages'];
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = section === sectionName ? 'block' : 'none';
        }
    });
    
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`nav button[onclick="openSection('${sectionName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Função para enviar mensagem
function sendMessage() {
    const input = document.getElementById('messageInput');
    const container = document.getElementById('messagesContainer');
    
    if (input.value.trim() === '') return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        <p>${input.value}</p>
        <span class="time">${new Date().toLocaleTimeString()}</span>
    `;
    
    container.appendChild(messageDiv);
    input.value = '';
    
    container.scrollTop = container.scrollHeight;
    
    // Resposta automática
    setTimeout(() => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message received';
        responseDiv.innerHTML = `
            <p>Eu te amo muito também! ❤️</p>
            <span class="time">${new Date().toLocaleTimeString()}</span>
        `;
        container.appendChild(responseDiv);
        container.scrollTop = container.scrollHeight;
    }, 2000);
}

// Enter para enviar mensagem
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

console.log('🚀 Script carregado com sucesso!');