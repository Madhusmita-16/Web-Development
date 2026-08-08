/**
 * NEXORA — Modern SaaS Social Media Platform Application Script
 * Motion Design, Glassmorphism, IntersectionObserver, Particles, Dynamic Feed & Themes
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Global Initializations & Bootstrap Tooltips
       -------------------------------------------------------------------------- */
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));

    const currentUser = {
        name: "Madhu Smita Mishra",
        avatar: "images/avatars/user.jpg",
        role: "Full Stack Engineer"
    };

    /* --------------------------------------------------------------------------
       2. Toast Notification Manager
       -------------------------------------------------------------------------- */
    function showToast(message, iconClass = 'fa-solid fa-bolt-lightning text-primary') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastEl = document.createElement('div');
        toastEl.className = 'toast-nexora';
        toastEl.innerHTML = `
            <i class="${iconClass} fs-5"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toastEl);

        setTimeout(() => {
            toastEl.style.opacity = '0';
            toastEl.style.transform = 'translateY(20px) scale(0.9)';
            setTimeout(() => toastEl.remove(), 300);
        }, 3200);
    }

    /* --------------------------------------------------------------------------
       3. Theme Toggle & LocalStorage Persistence
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('nexora-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nexora-theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`, 'fa-solid fa-circle-half-stroke text-warning');
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun text-warning';
        } else {
            themeIcon.className = 'fa-solid fa-moon text-warning';
        }
    }

    /* --------------------------------------------------------------------------
       4. Navbar Scroll Effect
       -------------------------------------------------------------------------- */
    const mainNavbar = id('mainNavbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 25) {
            if (mainNavbar) mainNavbar.classList.add('navbar-scrolled');
        } else {
            if (mainNavbar) mainNavbar.classList.remove('navbar-scrolled');
        }
    });

    /* --------------------------------------------------------------------------
       5. IntersectionObserver Scroll Reveal Animations
       -------------------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.post-reveal').forEach(el => revealObserver.observe(el));

    /* --------------------------------------------------------------------------
       6. Post Creation & Dynamic Insertion
       -------------------------------------------------------------------------- */
    const submitNewPostBtn = id('submitNewPostBtn');
    const createPostTextarea = id('createPostTextarea');
    const postImageSelect = id('postImageSelect');
    const postsFeedContainer = id('postsFeedContainer');

    if (submitNewPostBtn) {
        submitNewPostBtn.addEventListener('click', () => {
            const postText = createPostTextarea.value.trim();
            const selectedImg = postImageSelect.value;

            if (!postText && !selectedImg) {
                showToast('Please write a message or choose an image.', 'fa-solid fa-triangle-exclamation text-warning');
                return;
            }

            const postId = 'post-' + Date.now();
            const postElement = document.createElement('div');
            postElement.className = 'glass-card p-3 post-card-nexora post-reveal active';
            postElement.setAttribute('data-post-id', postId);

            const imageHtml = selectedImg ? `<div class="post-media-box"><img src="${selectedImg}" alt="Post Media"></div>` : '';

            postElement.innerHTML = `
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <img src="${currentUser.avatar}" alt="${currentUser.name}" class="rounded-circle" style="width:42px; height:42px; object-fit:cover;">
                        <div>
                            <h6 class="fw-bold mb-0">${currentUser.name}</h6>
                            <small class="text-muted">Just now · <i class="fa-solid fa-earth-americas"></i></small>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm border-0 text-muted" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                            <li><a class="dropdown-item btn-delete-post text-danger" href="#"><i class="fa-solid fa-trash me-2"></i>Delete Post</a></li>
                        </ul>
                    </div>
                </div>
                <p class="mb-3">${escapeHtml(postText)}</p>
                ${imageHtml}
                <div class="d-flex justify-content-between align-items-center pt-2 pb-2 text-muted small border-bottom border-subtle">
                    <div>
                        <span class="badge bg-danger rounded-circle p-1"><i class="fa-solid fa-heart"></i></span>
                        <span class="ms-1 fw-bold like-count">0 Likes</span>
                    </div>
                    <div><span class="comment-count-label">0 Comments</span></div>
                </div>
                <div class="d-flex justify-content-between align-items-center pt-2">
                    <button class="action-post-pill btn-like-nexora">
                        <i class="fa-regular fa-heart fs-5"></i> Like
                    </button>
                    <button class="action-post-pill btn-comment-toggle">
                        <i class="fa-regular fa-comment fs-5"></i> Comment
                    </button>
                    <button class="action-post-pill" data-bs-toggle="modal" data-bs-target="#shareModal">
                        <i class="fa-regular fa-paper-plane fs-5"></i> Share
                    </button>
                </div>
                <div class="comments-section mt-3 pt-3 border-top border-subtle">
                    <div class="d-flex gap-2 mb-3">
                        <img src="${currentUser.avatar}" class="rounded-circle" style="width:32px; height:32px; object-fit:cover;">
                        <input type="text" class="form-control form-control-sm rounded-pill comment-input" placeholder="Write a comment..." autocomplete="off">
                        <button class="btn btn-primary btn-sm rounded-circle px-3 btn-submit-comment"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                    <div class="comments-list"></div>
                </div>
            `;

            postsFeedContainer.prepend(postElement);
            attachPostListeners(postElement);

            createPostTextarea.value = '';
            postImageSelect.value = '';

            const modalEl = id('createPostModal');
            const modalInst = bootstrap.Modal.getInstance(modalEl);
            if (modalInst) modalInst.hide();

            showToast('Post published to NEXORA feed!', 'fa-solid fa-circle-check text-success');
        });
    }

    function id(name) { return document.getElementById(name); }
    function escapeHtml(str) {
        const d = document.createElement('div');
        d.innerText = str;
        return d.innerHTML;
    }

    /* --------------------------------------------------------------------------
       7. Interactive Like Particles Burst & Counter Animation
       -------------------------------------------------------------------------- */
    function attachPostListeners(postCard) {
        const likeBtn = postCard.querySelector('.btn-like-nexora');
        const likeCountSpan = postCard.querySelector('.like-count');
        const heartIcon = likeBtn ? likeBtn.querySelector('i') : null;

        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                let count = parseInt(likeCountSpan.innerText) || 0;
                if (likeBtn.classList.contains('liked')) {
                    likeBtn.classList.remove('liked');
                    heartIcon.className = 'fa-regular fa-heart fs-5';
                    likeCountSpan.innerText = `${Math.max(0, count - 1)} Likes`;
                } else {
                    likeBtn.classList.add('liked');
                    heartIcon.className = 'fa-solid fa-heart fs-5 text-danger heart-pop';
                    likeCountSpan.innerText = `${count + 1} Likes`;

                    // Spawn Particles
                    createParticles(e.clientX, e.clientY);
                }
            });
        }

        // Comment Submission
        const submitCommentBtn = postCard.querySelector('.btn-submit-comment');
        const commentInput = postCard.querySelector('.comment-input');
        const commentsList = postCard.querySelector('.comments-list');
        const commentCountLabel = postCard.querySelector('.comment-count-label');

        function addComment() {
            const val = commentInput.value.trim();
            if (!val) return;

            const cItem = document.createElement('div');
            cItem.className = 'd-flex gap-2 mb-2';
            cItem.innerHTML = `
                <img src="${currentUser.avatar}" class="rounded-circle" style="width:32px; height:32px; object-fit:cover;">
                <div class="comment-bubble-nexora flex-grow-1">
                    <div class="fw-bold small">${currentUser.name}</div>
                    ${escapeHtml(val)}
                </div>
            `;
            commentsList.appendChild(cItem);
            commentInput.value = '';
            if (commentCountLabel) {
                const total = commentsList.children.length;
                commentCountLabel.innerText = `${total} Comment${total === 1 ? '' : 's'}`;
            }
        }

        if (submitCommentBtn && commentInput) {
            submitCommentBtn.addEventListener('click', addComment);
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addComment();
            });
        }

        // Post Delete
        const deleteBtn = postCard.querySelector('.btn-delete-post');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                postCard.remove();
                showToast('Post removed', 'fa-solid fa-trash text-danger');
            });
        }
    }

    function createParticles(x, y) {
        const colors = ['#ef4444', '#ec4899', '#8b5cf6', '#4f46e5'];
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-burst';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            const angle = Math.random() * Math.PI * 2;
            const dist = 30 + Math.random() * 40;
            particle.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    }

    document.querySelectorAll('.post-card-nexora').forEach(el => attachPostListeners(el));

    /* --------------------------------------------------------------------------
       8. Clipboard Copy Link Action
       -------------------------------------------------------------------------- */
    const copyLinkBtn = id('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const shareModal = bootstrap.Modal.getInstance(id('shareModal'));
                if (shareModal) shareModal.hide();
                showToast('Link copied successfully!', 'fa-solid fa-link text-success');
            });
        });
    }

    /* --------------------------------------------------------------------------
       9. Floating Messenger Widget
       -------------------------------------------------------------------------- */
    const toggleMessengerBtn = id('toggleMessengerBtn');
    const messengerPanel = id('messengerPanel');
    const closeMessengerBtn = id('closeMessengerBtn');
    const chatMessageInput = id('chatMessageInput');
    const sendMessageBtn = id('sendMessageBtn');
    const chatMessagesContainer = id('chatMessagesContainer');

    if (toggleMessengerBtn && messengerPanel) {
        toggleMessengerBtn.addEventListener('click', () => messengerPanel.classList.toggle('d-none'));
    }

    if (closeMessengerBtn && messengerPanel) {
        closeMessengerBtn.addEventListener('click', () => messengerPanel.classList.add('d-none'));
    }

    function sendChatMessage() {
        const text = chatMessageInput.value.trim();
        if (!text) return;

        const sentMsg = document.createElement('div');
        sentMsg.className = 'chat-bubble-nexora sent';
        sentMsg.innerText = text;
        chatMessagesContainer.appendChild(sentMsg);

        chatMessageInput.value = '';
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        setTimeout(() => {
            const replyMsg = document.createElement('div');
            replyMsg.className = 'chat-bubble-nexora received';
            replyMsg.innerText = "Thanks for connecting on NEXORA!";
            chatMessagesContainer.appendChild(replyMsg);
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 1200);
    }

    if (sendMessageBtn && chatMessageInput) {
        sendMessageBtn.addEventListener('click', sendChatMessage);
        chatMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    /* --------------------------------------------------------------------------
       10. Widget & Modal Feature Listeners
       -------------------------------------------------------------------------- */
    // Story Viewer Modal Population
    document.querySelectorAll('.story-card-nexora:not(.story-card-add)').forEach(card => {
        card.addEventListener('click', () => {
            const storyImg = card.getAttribute('data-story-img');
            const avatar = card.getAttribute('data-avatar');
            const name = card.getAttribute('data-story-name');

            const imgEl = id('storyModalImage');
            const avatarEl = id('storyModalAvatar');
            const nameEl = id('storyModalName');

            if (imgEl) imgEl.src = storyImg;
            if (avatarEl) avatarEl.src = avatar;
            if (nameEl) nameEl.innerText = name;

            const modal = new bootstrap.Modal(id('storyViewerModal'));
            modal.show();
        });
    });

    // Friend Request Confirm & Delete
    document.querySelectorAll('.btn-confirm-freq').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('div.d-flex');
            const name = btn.getAttribute('data-name');
            if (card) card.remove();
            showToast(`Accepted friend request from ${name}!`, 'fa-solid fa-user-check text-success');
        });
    });

    document.querySelectorAll('.btn-delete-freq').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('div.d-flex');
            if (card) card.remove();
            showToast('Friend request removed', 'fa-solid fa-user-minus text-secondary');
        });
    });

    // Video Play Demo
    document.querySelectorAll('.btn-play-video-demo').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Playing video on NEXORA Watch...', 'fa-solid fa-circle-play text-primary');
        });
    });

    // Marketplace Message Seller
    document.querySelectorAll('.btn-message-seller').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = bootstrap.Modal.getInstance(id('marketplaceModal'));
            if (modal) modal.hide();
            const chatName = id('chatHeaderName');
            if (chatName) chatName.innerText = "Marketplace Seller";
            if (messengerPanel) messengerPanel.classList.remove('d-none');
            showToast('Chat opened with Marketplace Seller', 'fa-solid fa-paper-plane text-warning');
        });
    });

    // Join Group Handler
    document.querySelectorAll('.btn-join-group').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('joined')) {
                btn.classList.remove('joined', 'btn-success');
                btn.classList.add('btn-outline-primary');
                btn.innerText = 'Join';
                showToast('Left group', 'fa-solid fa-user-minus text-secondary');
            } else {
                btn.classList.add('joined', 'btn-success');
                btn.classList.remove('btn-outline-primary');
                btn.innerText = 'Joined ✓';
                showToast('Joined community successfully!', 'fa-solid fa-users text-success');
            }
        });
    });

    // Event RSVP Handler
    document.querySelectorAll('.btn-rsvp-event').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.className = 'btn btn-success btn-sm w-100 rounded-pill';
            btn.innerText = 'Attending ✓';
            showToast('RSVP confirmed for Global Tech Summit!', 'fa-solid fa-calendar-check text-primary');
        });
    });

    // Reshare Memory
    const reshareMemoryBtn = id('reshareMemoryBtn');
    if (reshareMemoryBtn) {
        reshareMemoryBtn.addEventListener('click', () => {
            const modal = bootstrap.Modal.getInstance(id('memoriesModal'));
            if (modal) modal.hide();
            showToast('Memory reshared to your Feed!', 'fa-solid fa-share text-info');
        });
    }

    // Save & Unsave Items
    document.querySelectorAll('.btn-save-post-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Post saved to your Saved Items', 'fa-solid fa-bookmark text-primary');
        });
    });

    document.querySelectorAll('.btn-unsave-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('div.d-flex');
            if (card) card.remove();
            showToast('Item removed from Saved', 'fa-solid fa-trash text-danger');
        });
    });

    // Settings Quick Link
    const btnSaveSettings = id('btnSaveSettings');
    if (btnSaveSettings) {
        btnSaveSettings.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = bootstrap.Modal.getInstance(id('settingsModal'));
            if (modal) modal.hide();
            showToast('Settings saved successfully', 'fa-solid fa-gear text-primary');
        });
    }

    // Mobile Alerts Button
    const mobileNotifBtn = id('mobileNotifBtn');
    if (mobileNotifBtn) {
        mobileNotifBtn.addEventListener('click', () => {
            const dropdownEl = id('notifDropdown');
            const dropdown = new bootstrap.Dropdown(dropdownEl);
            dropdown.toggle();
        });
    }

    // Suggested Add Friend
    document.querySelectorAll('.btn-add-friend').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.className = 'btn btn-success btn-sm rounded-pill px-3';
            btn.innerText = 'Added ✓';
            showToast('Friend request sent!', 'fa-solid fa-user-plus text-success');
        });
    });

    // Notifications Mark Read
    const markAllReadBtn = id('markAllReadBtn');
    const notifCountBadge = id('notifCountBadge');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (notifCountBadge) notifCountBadge.classList.add('d-none');
            showToast('All notifications marked as read', 'fa-solid fa-check text-primary');
        });
    }

});

