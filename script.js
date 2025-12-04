// Função global para iniciar a jornada - DEVE ESTAR NO TOPO!
function startJourney() {
    console.log('🎬 FUNÇÃO startJourney() CHAMADA!');
    
    const welcomeModal = document.getElementById('welcomeModal');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.getElementById('startJourneyBtn');
    
    console.log('🔍 Elementos:', { welcomeModal, mainContent, startBtn });
    
    if (!welcomeModal || !mainContent || !startBtn) {
        console.error('❌ Elementos não encontrados!', { welcomeModal, mainContent, startBtn });
        return;
    }
    
    // Animação do botão
    startBtn.style.transform = 'scale(0.95)';
    startBtn.textContent = 'Iniciando...';
    startBtn.disabled = true;
    
    console.log('⏳ Iniciando sequência de animação...');
    
    // Fechar modal e mostrar conteúdo
    setTimeout(() => {
        console.log('🎭 Adicionando fade-out ao modal...');
        welcomeModal.classList.add('fade-out');
        
        setTimeout(() => {
            console.log('🚫 Escondendo modal...');
            welcomeModal.style.display = 'none';
            
            // Mostrar conteúdo principal
            console.log('📱 Mostrando conteúdo principal...');
            mainContent.classList.remove('main-content-hidden');
            mainContent.classList.add('main-content-visible');
            
            console.log('✨ Classes do mainContent:', mainContent.className);
            
            // Aguardar transição e iniciar timeline + música
            setTimeout(() => {
                console.log('🚀 Tentando carregar funções auxiliares...');
                
                if (typeof showGuidanceMessage === 'function') {
                    console.log('📢 Chamando showGuidanceMessage...');
                    showGuidanceMessage();
                } else {
                    console.warn('⚠️ showGuidanceMessage não encontrada!');
                }
                
                if (typeof animateTimeline === 'function') {
                    console.log('🎬 Chamando animateTimeline...');
                    animateTimeline();
                } else {
                    console.warn('⚠️ animateTimeline não encontrada!');
                }
                
                // Tocar música após interação do usuário
                console.log('🎵 Iniciando música após clique do usuário!');
                const audioPlayer = document.getElementById('bgMusic') || document.getElementById('audioPlayer');
                if (audioPlayer) {
                    console.log('🔊 Áudio encontrado:', audioPlayer);
                    audioPlayer.volume = 0.6;
                    audioPlayer.loop = true;
                    audioPlayer.muted = false;
                    
                    audioPlayer.play().then(() => {
                        console.log('✅ Música tocando perfeitamente!');
                    }).catch((error) => {
                        console.error('❌ Erro ao tocar música:', error);
                    });
                } else {
                    console.warn('⚠️ Elemento de áudio não encontrado!');
                }
            }, 500);
        }, 1000);
    }, 200);
}

// Dados das fotos e frases organizados por data cronológica
const photos = [
    // 11-05-2024 (img_um)
    {
        src: 'https://raw.githubusercontent.com/Walas199922/anniversary-project/2a710c127f409f6984d1b9943083abbcc94e39a1/img_um.jpeg',
        caption: 'Nossa primeira viagem juntos, quando as coisas nem se quer eram oficiais, estávamos apenas curtindo o momento e seguindo a vida',
        date: '2024-05-11'
    },
    // 22-07-2024 (img_dois)
    {
        src: 'https://raw.githubusercontent.com/Walas199922/anniversary-project/2a710c127f409f6984d1b9943083abbcc94e39a1/img_dois.jpeg',
        caption: 'Aqui as coisas mudaram totalmente, fizemos nossa primeira pescaria. Mostrei a você um dos meus hobbies favoritos e você embarcou nessa onda comigo',
        date: '2024-07-22'
    },
    // 21-12-2024 (img_seis)
    {
        src: 'https://raw.githubusercontent.com/Walas199922/anniversary-project/2a710c127f409f6984d1b9943083abbcc94e39a1/img_seis.jpeg',
        caption: 'Esse, sem sombras de dúvidas foi um dos melhores momentos que tivemos juntos. O show do pai chris foi muito doido e mais uma vez, você me apoiou e incentivou a ir ver um artista que eu gosto bastante. Acredito que esse tenha sido um dos dias mais significantes e legais da nossa caminhada até aqui.',
        date: '2024-12-21'
    },
    // 31-12-2024 (img_cinco)
    {
        src: 'https://raw.githubusercontent.com/Walas199922/anniversary-project/2a710c127f409f6984d1b9943083abbcc94e39a1/img_cinco.jpeg',
        caption: 'Se não virarmos o ano namorando, você fica para trás, pois eu renovo tudo na minha vida", essa foi a frase mais vagabunda que vc me disse, mudou o ano e você só aplicou o golpe mesmo, mas no final das contas, valeu a pena.',
        date: '2024-12-31'
    },
    // 24-03-2025 (img_tres)
    {
        src: 'https://raw.githubusercontent.com/Walas199922/anniversary-project/2a710c127f409f6984d1b9943083abbcc94e39a1/img_tres.jpeg',
        caption: 'Nesse ponto, tudo era oficial e fizemos uma incrível viagem. Fiquei com o pé atrás, mas você me convenceu que seria uma experiência boa, e no final das contas você estava certa. Viver isso ao seu lado foi muito gratificante.',
        date: '2025-03-24'
    },
    // 14-06-2025 (img_quatro)
    {
        src: 'https://raw.githubusercontent.com/Walas199922/anniversary-project/2a710c127f409f6984d1b9943083abbcc94e39a1/img_quatro.jpeg',
        caption: 'Nesse momento, eu queria levar você para um lado do meu mundo mais "agitado" totalmente diferente da calmaria que é a pesca, e como previsto, você detestou música eletrônica. O que restam são risadas e traumas',
        date: '2025-06-14'
    }
];

// Variáveis globais (serão inicializadas no DOMContentLoaded)
let modal, modalImage, captionText, closeBtn, galleryDots, audioPlayer;
let currentPhotoIndex = 0;
let viewedPhotos = new Set(); // Para rastrear fotos visualizadas
let messageShown = false; // Para evitar que a mensagem apareça várias vezes

// Função para filtrar fotos disponíveis baseadas na data atual
function getAvailablePhotos() {
    const currentDate = new Date();
    return photos.filter(photo => {
        const photoDate = new Date(photo.date);
        return photoDate <= currentDate;
    });
}

// Obter fotos disponíveis
const availablePhotos = getAvailablePhotos();

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM carregado! Inicializando variáveis...');
    
    // Inicializar elementos globais do DOM
    modal = document.getElementById('photoModal');
    modalImage = document.getElementById('modalImage');
    captionText = document.getElementById('caption');
    closeBtn = document.querySelector('.close');
    galleryDots = document.querySelector('.gallery-dots');
    audioPlayer = document.getElementById('bgMusic') || document.getElementById('audioPlayer');
    
    console.log('🔍 Elementos inicializados:', { modal, audioPlayer, galleryDots });
    
    // Garantir que a página sempre comece no topo
    window.scrollTo(0, 0);
    
    // Garantir que o modal de boas-vindas apareça PRIMEIRO
    const welcomeModal = document.getElementById('welcomeModal');
    const mainContent = document.getElementById('mainContent');
    
    // Forçar estado inicial correto
    welcomeModal.style.display = 'flex';
    welcomeModal.style.zIndex = '3000';
    mainContent.classList.add('main-content-hidden'); // Garantir que esteja escondido
    
    // Preparar elementos sem mostrá-los ainda
    createGalleryDots();
    updatePhoto();
    initializeShootingStars();
    startRelationshipCounter(); // Iniciar contador (mas não visível ainda)
    initMessages(); // Inicializar sistema de mensagens (mas não visível ainda)
    initClickableTimeline(); // Tornar timeline clicável (mas não visível ainda)
    
    // Mostrar modal de boas-vindas inicialmente (sem event listener)
    // showWelcomeModal(); // Removido - agora usamos onclick direto
    
    // Preparar áudio para autoplay quando a timeline aparecer
    if (audioPlayer) {
        // Configuração inicial do áudio
        audioPlayer.volume = 0.6;
        audioPlayer.loop = true;
        
        // Tentar desmutar o áudio quando estiver carregado
        audioPlayer.addEventListener('canplaythrough', () => {
            console.log('Áudio carregado e pronto para reprodução');
        });
        
        // Força unmute quando a timeline estiver pronta
        setTimeout(() => {
            if (audioPlayer.muted) {
                audioPlayer.muted = false;
                console.log('Áudio desmutado');
            }
        }, 6000); // Após o modal + um pouco mais
    }
});

// Criar pontos da galeria
function createGalleryDots() {
    availablePhotos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentPhotoIndex = index;
            updatePhoto();
        });
        galleryDots.appendChild(dot);
    });
}

// Modal
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setupPhotoZoom(); // Configurar zoom nas fotos
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Navegação de fotos
prevPhotoBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + availablePhotos.length) % availablePhotos.length;
    updatePhoto();
});

nextPhotoBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % availablePhotos.length;
    updatePhoto();
});

// Suporte para teclas de seta
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        currentPhotoIndex = (currentPhotoIndex - 1 + availablePhotos.length) % availablePhotos.length;
        updatePhoto();
    } else if (e.key === 'ArrowRight') {
        currentPhotoIndex = (currentPhotoIndex + 1) % availablePhotos.length;
        updatePhoto();
    } else if (e.key === 'Escape') {
        closeModalFunc();
    }
});

// Atualizar foto
function updatePhoto() {
    const photo = availablePhotos[currentPhotoIndex];
    currentPhoto.src = photo.src;
    currentPhoto.alt = photo.caption;
    
    // Marcar foto como visualizada
    viewedPhotos.add(currentPhotoIndex);
    
    // Verificar se todas as fotos foram visualizadas e mensagem ainda não foi mostrada
    if (viewedPhotos.size === availablePhotos.length && !messageShown) {
        messageShown = true; // Marcar como mostrada para evitar repetição
        // Não mostrar mensagem especial mais
    }
    
    // Atualizar dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPhotoIndex);
    });
}

// Função para mostrar mensagens de orientação
function showGuidanceMessage() {
    createGuidanceElement();
    updateGuidanceMessage("Explore nossa jornada de amor na timeline 🌹");
}

// Criar elemento de orientação
function createGuidanceElement() {
    if (document.querySelector('.guidance-message')) return;
    
    const guidanceDiv = document.createElement('div');
    guidanceDiv.className = 'guidance-message';
    guidanceDiv.innerHTML = '<p></p>';
    document.body.appendChild(guidanceDiv);
}

// Atualizar mensagem de orientação
function updateGuidanceMessage(message) {
    const guidanceEl = document.querySelector('.guidance-message p');
    if (guidanceEl) {
        guidanceEl.textContent = message;
        
        // Mostrar mensagem
        const container = document.querySelector('.guidance-message');
        container.classList.add('show');
        
        // Esconder após 4 segundos
        setTimeout(() => {
            container.classList.remove('show');
        }, 4000);
    }
}

// Função para mostrar modal de boas-vindas
function showWelcomeModal() {
    console.log('🚀 Iniciando showWelcomeModal...');
    const welcomeModal = document.getElementById('welcomeModal');
    const mainContent = document.getElementById('mainContent');
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    
    console.log('🔍 Elementos encontrados:', {
        welcomeModal: !!welcomeModal,
        mainContent: !!mainContent,
        startJourneyBtn: !!startJourneyBtn
    });
    
    if (!welcomeModal || !mainContent || !startJourneyBtn) {
        console.error('❌ Elementos não encontrados:', { welcomeModal, mainContent, startJourneyBtn });
        return;
    }
    
    // Estado inicial garantido
    welcomeModal.style.display = 'flex';
    mainContent.classList.add('main-content-hidden');
    mainContent.classList.remove('main-content-visible');
    
    console.log('✅ Modal configurado, adicionando event listener...');
    
    // Remover event listeners anteriores para evitar duplicação
    const newBtn = startJourneyBtn.cloneNode(true);
    startJourneyBtn.parentNode.replaceChild(newBtn, startJourneyBtn);
    
    // Evento do botão para iniciar a jornada
    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🎬 BOTÃO CLICADO! Iniciando jornada...');
        
        // Animação do botão clicado
        newBtn.style.transform = 'scale(0.95)';
        newBtn.textContent = 'Iniciando...';
        newBtn.disabled = true;
        
        // Fechar modal e mostrar conteúdo
        setTimeout(() => {
            welcomeModal.classList.add('fade-out');
            
            setTimeout(() => {
                welcomeModal.style.display = 'none';
                
                // Mostrar conteúdo principal
                mainContent.classList.remove('main-content-hidden');
                mainContent.classList.add('main-content-visible');
                
                console.log('✨ Timeline aparecendo...');
                
                // Aguardar transição e iniciar timeline + música
                setTimeout(() => {
                    showGuidanceMessage();
                    animateTimeline();
                    
                    // AGORA SIM - tocar música após interação do usuário
                    console.log('🎵 Iniciando música após clique do usuário!');
                    if (audioPlayer) {
                        audioPlayer.volume = 0.6;
                        audioPlayer.loop = true;
                        audioPlayer.muted = false;
                        
                        audioPlayer.play().then(() => {
                            console.log('✅ Música tocando perfeitamente!');
                        }).catch((error) => {
                            console.error('❌ Erro ao tocar música:', error);
                        });
                    }
                }, 500);
            }, 1000);
        }, 200);
    });
}

// Função para criar botão de ativação da música
function createMusicActivationButton() {
    // Evitar criar múltiplos botões
    if (document.getElementById('musicActivationBtn')) return;
    
    const button = document.createElement('button');
    button.id = 'musicActivationBtn';
    button.innerHTML = '🎵 Clique para Ativar Música';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 4000;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 25px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;
    
    button.addEventListener('click', () => {
        console.log('🎵 Botão de música clicado!');
        if (audioPlayer) {
            audioPlayer.play().then(() => {
                console.log('✅ Música ativada pelo botão!');
                removeMusicActivationButton();
            }).catch(console.error);
        }
    });
    
    document.body.appendChild(button);
    
    // Atualizar mensagem de orientação
    setTimeout(() => {
        updateGuidanceMessage("Clique no botão 🎵 para ativar nossa música especial!");
    }, 1000);
}

// Função para criar botão de ativação da música
function createMusicActivationButton() {
    // Evitar criar múltiplos botões
    if (document.getElementById('musicActivationBtn')) return;
    
    const button = document.createElement('button');
    button.id = 'musicActivationBtn';
    button.innerHTML = '🎵 Clique para Ativar Música';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 4000;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 25px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;
    
    button.addEventListener('click', () => {
        console.log('🎵 Botão de música clicado!');
        if (audioPlayer) {
            audioPlayer.play().then(() => {
                console.log('✅ Música ativada pelo botão!');
                removeMusicActivationButton();
            }).catch(console.error);
        }
    });
    
    document.body.appendChild(button);
    
    // Atualizar mensagem de orientação
    setTimeout(() => {
        updateGuidanceMessage("Clique no botão 🎵 para ativar nossa música especial!");
    }, 1000);
}

// Função para remover botão de ativação da música
function removeMusicActivationButton() {
    const button = document.getElementById('musicActivationBtn');
    if (button) {
        button.remove();
        setTimeout(() => {
            updateGuidanceMessage("Agora aproveite nossa jornada de amor! 💕");
        }, 500);
    }
}

// Função para inicializar estrelas cadentes
function initializeShootingStars() {
    setInterval(createShootingStar, 3000); // Nova estrela a cada 3 segundos
}

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Posição aleatória
    star.style.top = Math.random() * 50 + '%';
    star.style.left = '-100px';
    
    // Delay aleatório
    star.style.animationDelay = Math.random() * 2 + 's';
    
    shootingStars.appendChild(star);
    
    // Remover após animação
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 5000);
}

// Animação da timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Configurar zoom nas fotos
function setupPhotoZoom() {
    const photo = document.getElementById('currentPhoto');
    let isZoomed = false;
    
    photo.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar fechar modal
        
        if (!isZoomed) {
            photo.classList.add('zoomed');
            isZoomed = true;
        } else {
            photo.classList.remove('zoomed');
            isZoomed = false;
        }
    });
    
    // Reset zoom quando trocar foto
    const originalUpdatePhoto = updatePhoto;
    updatePhoto = function() {
        originalUpdatePhoto();
        if (photo.classList.contains('zoomed')) {
            photo.classList.remove('zoomed');
            isZoomed = false;
        }
    };
}

// Suporte para gestos de toque (swipe) em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - próxima foto
        currentPhotoIndex = (currentPhotoIndex + 1) % availablePhotos.length;
        updatePhoto();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - foto anterior
        currentPhotoIndex = (currentPhotoIndex - 1 + availablePhotos.length) % availablePhotos.length;
        updatePhoto();
    }
}

// ===== CONTADOR DE RELACIONAMENTO =====
function startRelationshipCounter() {
    // Data de início do relacionamento - 05/12/2024
    const relationshipStart = new Date('2024-12-05');
    
    function updateCounter() {
        const now = new Date();
        const diff = now - relationshipStart;
        
        // Calcular tempo total
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        const totalMinutes = Math.floor(diff / (1000 * 60));
        
        // Atualizar elementos na página
        const daysEl = document.getElementById('counter-days');
        const hoursEl = document.getElementById('counter-hours');
        const minutesEl = document.getElementById('counter-minutes');
        
        if (daysEl) daysEl.textContent = totalDays;
        if (hoursEl) hoursEl.textContent = totalHours.toLocaleString();
        if (minutesEl) minutesEl.textContent = totalMinutes.toLocaleString();
    }
    
    // Atualizar imediatamente e depois a cada minuto
    updateCounter();
    setInterval(updateCounter, 60000); // Atualizar a cada minuto
}

// ===== SISTEMA DE MENSAGENS =====
function initMessages() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messageAuthor = document.getElementById('messageAuthor');
    const messagesContainer = document.querySelector('.messages-container');
    
    if (!messageForm || !messageInput || !messageAuthor || !messagesContainer) return;
    
    // Array para armazenar mensagens (pode ser conectado ao localStorage)
    let messages = JSON.parse(localStorage.getItem('anniversaryMessages')) || [
        {
            id: 1,
            author: 'Walas',
            text: 'Essa página é um presente especial para você. Cada momento aqui representa nossa jornada juntos, e cada foto conta uma parte da nossa história. Obrigado por fazer parte da minha vida e por tornar cada dia mais especial. Te amo muito! ❤️✨',
            date: '2024-12-04'
        }
    ];
    
    function renderMessages() {
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            messageCard.innerHTML = `
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-author">${message.author}</span>
                        <span class="message-date">${new Date(message.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <button class="delete-message-btn" data-id="${message.id}" title="Remover mensagem">
                        🗑️
                    </button>
                </div>
                <p class="message-text">${message.text}</p>
            `;
            messagesContainer.appendChild(messageCard);
        });
        
        // Adicionar event listeners para os botões de deletar
        document.querySelectorAll('.delete-message-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const messageId = parseInt(e.target.getAttribute('data-id'));
                deleteMessage(messageId);
            });
        });
    }
    
    function deleteMessage(messageId) {
        // Confirmar antes de deletar
        if (confirm('Tem certeza que deseja remover esta mensagem?')) {
            // Remover da array
            messages = messages.filter(message => message.id !== messageId);
            
            // Atualizar localStorage
            localStorage.setItem('anniversaryMessages', JSON.stringify(messages));
            
            // Re-renderizar
            renderMessages();
            
            console.log(`✅ Mensagem ${messageId} removida com sucesso!`);
        }
    }
    
    function addMessage(text, author) {
        const newMessage = {
            id: Date.now(),
            author: author || 'Anônimo',
            text: text,
            date: new Date().toISOString().split('T')[0]
        };
        
        messages.push(newMessage); // Adicionar no final (cronológico)
        localStorage.setItem('anniversaryMessages', JSON.stringify(messages));
        renderMessages();
        
        // Scroll para a nova mensagem
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
    
    messageForm.addEventListener('click', (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        const author = messageAuthor.value.trim();
        
        if (text) {
            addMessage(text, author);
            messageInput.value = '';
            messageAuthor.value = '';
            
            // Mostrar feedback visual
            const originalText = messageForm.textContent;
            messageForm.textContent = 'Recado Enviado!';
            messageForm.style.background = 'linear-gradient(135deg, #56ab2f, #a8e6cf)';
            
            setTimeout(() => {
                messageForm.textContent = originalText;
                messageForm.style.background = '';
            }, 2000);
        }
    });
    
    // Renderizar mensagens iniciais
    renderMessages();
}

// ===== TIMELINE CLICÁVEL =====
function initClickableTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item[data-photo-index]');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const photoIndex = parseInt(item.getAttribute('data-photo-index'));
            // Verificar se a foto está disponível na lista de fotos disponíveis
            if (photoIndex >= 0 && photoIndex < availablePhotos.length) {
                // Abrir modal e mostrar foto específica
                currentPhotoIndex = photoIndex;
                updatePhoto();
                
                // Garantir que o modal seja aberto
                modal.style.display = 'block';
                
                // Adicionar feedback visual ao clique
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            }
        });
        
        // Adicionar classe para indicar que é clicável
        item.classList.add('clickable-timeline-item');
    });
}
