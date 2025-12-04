// Função para iniciar a jornada
function startJourney() {
    console.log('🎬 Iniciando jornada...');
    
    const welcomeModal = document.getElementById('welcomeModal');
    const mainContent = document.getElementById('mainContent');
    
    if (welcomeModal) {
        welcomeModal.style.display = 'none';
    }
    
    if (mainContent) {
        mainContent.classList.remove('main-content-hidden');
    }
    
    console.log('✅ Jornada iniciada!');
}

// Variáveis globais
let currentIndex = 0;
let autoScrolling = false;
let timelinePhotos = [];
let galleryPhotos = [];

// Data de início do relacionamento
const startDate = new Date('2024-12-05');

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
    
    document.getElementById('counter-days').textContent = days.toString().padStart(3, '0');
    document.getElementById('counter-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('counter-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function loadTimelinePhotos() {
    // Fotos correspondentes à timeline do HTML
    timelinePhotos = [
        { 
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/imagens/img_um.jpeg',
            title: '11/05/2024',
            description: 'Nossa Primeira Viagem - Nossa primeira viagem juntos, quando as coisas nem se quer eram oficiais, estávamos apenas curtindo o momento e seguindo a vida'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/imagens/img_dois.jpeg',
            title: '22/07/2024',
            description: 'Primeira Pescaria Juntos - Aqui as coisas mudaram totalmente, fizemos nossa primeira pescaria. Mostrei a você um dos meus hobbies favoritos e você embarcou nessa onda comigo'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/imagens/img_tres.jpeg',
            title: '21/12/2024',
            description: 'Show do Pai Chris - Esse, sem sombras de dúvidas foi um dos melhores momentos que tivemos juntos. O show do pai chris foi muito doido e mais uma vez, você me apoiou e incentivou a ir ver um artista que eu gosto bastante. Acredito que esse tenha sido um dos dias mais significantes e legais da nossa caminhada até aqui.'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/imagens/img_quatro.jpeg',
            title: '31/12/2024',
            description: 'O Golpe do Ano Novo - "Se não virarmos o ano namorando, você fica para trás, pois eu renovo tudo na minha vida", essa foi a frase mais vagabunda que vc me disse, mudou o ano e você só aplicou o golpe mesmo, mas no final das contas, valeu a pena.'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/imagens/img_cinco.jpeg',
            title: '24/03/2025',
            description: 'Viagem Oficial - Nesse ponto, tudo era oficial e fizemos uma incrível viagem. Fiquei com o pé atrás, mas você me convenceu que seria uma experiência boa, e no final das contas você estava certa. Viver isso ao seu lado foi muito gratificante.'
        },
        {
            src: 'https://raw.githubusercontent.com/walas199922/anniversary-project/main/public/imagens/img_seis.jpeg',
            title: '14/06/2025',
            description: 'Mundo Agitado - Nesse momento, eu queria levar você para um lado do meu mundo mais "agitado" totalmente diferente da calmaria que é a pesca, e como previsto, você detestou música eletrônica. O que restam são risadas e traumas'
        }
    ];
    
    setupTimelineClicks();
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

function setupTimelineClicks() {
    // Configurar cliques na timeline existente no HTML
    const timelineItems = document.querySelectorAll('.clickable-timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const photoIndex = parseInt(this.getAttribute('data-photo-index'));
            if (timelinePhotos[photoIndex]) {
                const photo = timelinePhotos[photoIndex];
                openPhotoModal(photo.src, photo.title, photo.description);
            }
        });
        
        // Adicionar estilo de cursor pointer
        item.style.cursor = 'pointer';
    });
    
    console.log('✅ Timeline clicks configurados para', timelineItems.length, 'itens');
}

function updateTimelineDisplay() {
    // Esta função agora não faz nada porque a timeline é estática no HTML
    // Mantemos para compatibilidade
    console.log('Timeline display já está no HTML');
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
    const modalImg = document.getElementById('currentPhoto');
    
    if (!modal) {
        console.error('❌ Modal não encontrado!');
        return;
    }
    
    if (!modalImg) {
        console.error('❌ Imagem do modal não encontrada!');
        return;
    }
    
    // Configurar conteúdo
    modalImg.src = src;
    modalImg.alt = `${title} - ${description}`;
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Modal aberto com sucesso!');
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
    // Fechar ao clicar no botão de fechar (que já tem onclick no HTML)
    const closeBtn = document.getElementById('fecharBtn');
    if (closeBtn) {
        console.log('✅ Botão de fechar encontrado no HTML');
    }
    
    // Fechar ao clicar no overlay (que já tem onclick no HTML)
    const modal = document.getElementById('photoModal');
    if (modal) {
        console.log('✅ Modal encontrado');
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePhotoModal();
        }
    });
    
    console.log('✅ Event listeners configurados');
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