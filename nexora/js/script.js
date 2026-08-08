/**
 * NEXORA — Full-Featured Social Platform Script v3.0
 * Every button wired. Every feature working.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════════════════════════════════════════════════════════
       UTILITIES
    ═══════════════════════════════════════════════════════════════ */
    const $ = id => document.getElementById(id);
    const $$ = sel => document.querySelectorAll(sel);

    function escapeHtml(str) {
        const d = document.createElement('div');
        d.innerText = str;
        return d.innerHTML;
    }

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    function fmtTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    /* ═══════════════════════════════════════════════════════════════
       SESSION
    ═══════════════════════════════════════════════════════════════ */
    let SESSION = null;
    try { SESSION = JSON.parse(localStorage.getItem('nexora_session')); } catch(e) {}
    if (!SESSION || !SESSION.loggedIn) {
        window.location.href = 'auth.html';
        return;
    }

    const currentUser = {
        name: SESSION.name || 'Madhu Smita Mishra',
        avatar: SESSION.avatar || 'images/avatars/user.jpg',
        role: SESSION.role || 'NEXORA Member'
    };

    // Greet create-post box
    const createPostBox = document.querySelector('.create-post-input-box');
    if (createPostBox) createPostBox.innerText = `What's on your mind, ${currentUser.name.split(' ')[0]}?`;

    // Populate sidebar user name
    $$('.sidebar-username').forEach(el => el.innerText = currentUser.name);
    $$('.sidebar-user-role').forEach(el => el.innerText = currentUser.role);

    /* ═══════════════════════════════════════════════════════════════
       SIGN OUT
    ═══════════════════════════════════════════════════════════════ */
    $('signOutBtn')?.addEventListener('click', e => {
        e.preventDefault();
        localStorage.removeItem('nexora_session');
        showToast('Signed out. See you soon! 👋', 'fa-solid fa-right-from-bracket text-warning');
        setTimeout(() => window.location.href = 'auth.html', 1000);
    });

    /* ═══════════════════════════════════════════════════════════════
       TOAST SYSTEM
    ═══════════════════════════════════════════════════════════════ */
    function showToast(msg, icon = 'fa-solid fa-bolt-lightning text-primary') {
        const tc = $('toastContainer');
        if (!tc) return;
        const el = document.createElement('div');
        el.className = 'toast-nexora';
        el.innerHTML = `<i class="${icon} fs-5"></i><span>${msg}</span>`;
        tc.appendChild(el);
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px) scale(0.9)';
            setTimeout(() => el.remove(), 300);
        }, 3500);
    }

    /* ═══════════════════════════════════════════════════════════════
       THEME TOGGLE
    ═══════════════════════════════════════════════════════════════ */
    const html = document.documentElement;
    const themeIcon = $('themeIcon');
    const savedTheme = localStorage.getItem('nexora-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    setThemeIcon(savedTheme);

    $('themeToggleBtn')?.addEventListener('click', () => {
        const cur = html.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('nexora-theme', next);
        setThemeIcon(next);
        showToast(next === 'dark' ? 'Dark Mode 🌙 activated' : 'Light Mode ☀️ activated', 'fa-solid fa-circle-half-stroke text-warning');
    });

    function setThemeIcon(t) {
        if (!themeIcon) return;
        themeIcon.className = t === 'dark' ? 'fa-solid fa-sun text-warning' : 'fa-solid fa-moon text-warning';
    }

    /* ═══════════════════════════════════════════════════════════════
       NAVBAR SCROLL SHRINK
    ═══════════════════════════════════════════════════════════════ */
    const navbar = $('mainNavbar');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('navbar-scrolled', window.scrollY > 25);
    });

    /* ═══════════════════════════════════════════════════════════════
       BOOTSTRAP TOOLTIPS
    ═══════════════════════════════════════════════════════════════ */
    $$('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    /* ═══════════════════════════════════════════════════════════════
       INTERSECTION OBSERVER – SCROLL REVEAL
    ═══════════════════════════════════════════════════════════════ */
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    $$('.post-reveal').forEach(el => revealObs.observe(el));

    /* ═══════════════════════════════════════════════════════════════
       LIVE SEARCH
    ═══════════════════════════════════════════════════════════════ */
    const SEARCH_DATA = [
        { type: 'user', name: 'Sarah Williams',    avatar: 'images/avatars/sarah.jpg',  sub: '245 friends' },
        { type: 'user', name: 'Rahul Sharma',      avatar: 'images/avatars/rahul.jpg',  sub: '189 friends' },
        { type: 'user', name: 'Priya Das',         avatar: 'images/avatars/priya.jpg',  sub: '112 friends' },
        { type: 'user', name: 'Alex Johnson',      avatar: 'images/avatars/alex.jpg',   sub: '320 friends' },
        { type: 'post', name: '#Fitness',          avatar: '',  sub: '1.2K posts' },
        { type: 'post', name: '#Technology',       avatar: '',  sub: '3.4K posts' },
        { type: 'group', name: 'Web Dev Hub',      avatar: '', sub: '145K members' },
        { type: 'group', name: 'AI Enthusiasts',   avatar: '', sub: '89K members' },
    ];

    const searchInput  = $('searchInput');
    const searchModal  = new bootstrap.Modal($('searchResultsModal'));
    const searchList   = $('searchResultsList');
    let searchDebounce;

    searchInput?.addEventListener('input', () => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
            const q = searchInput.value.trim().toLowerCase();
            if (!q) return;
            const results = SEARCH_DATA.filter(d => d.name.toLowerCase().includes(q));
            renderSearchResults(results, q);
            searchModal.show();
        }, 300);
    });

    searchInput?.addEventListener('keypress', e => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            const q = searchInput.value.trim().toLowerCase();
            const results = SEARCH_DATA.filter(d => d.name.toLowerCase().includes(q));
            renderSearchResults(results, q);
            searchModal.show();
        }
    });

    function renderSearchResults(results, q) {
        if (!searchList) return;
        if (!results.length) {
            searchList.innerHTML = `<p class="text-muted text-center py-4"><i class="fa-solid fa-magnifying-glass me-2"></i>No results for "<strong>${escapeHtml(q)}</strong>"</p>`;
            return;
        }
        const typeIcon = { user: 'fa-user text-primary', post: 'fa-hashtag text-warning', group: 'fa-users text-success' };
        searchList.innerHTML = results.map(r => `
            <div class="d-flex align-items-center gap-3 p-2 rounded-3 mb-1 search-result-item" style="cursor:pointer;">
                <div class="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle" style="width:40px;height:40px;flex-shrink:0;">
                    ${r.avatar ? `<img src="${r.avatar}" class="rounded-circle" style="width:40px;height:40px;object-fit:cover;">` : `<i class="fa-solid ${typeIcon[r.type]} fs-5"></i>`}
                </div>
                <div>
                    <h6 class="fw-bold small mb-0">${escapeHtml(r.name)}</h6>
                    <small class="text-muted">${escapeHtml(r.sub)}</small>
                </div>
            </div>
        `).join('');
        searchList.querySelectorAll('.search-result-item').forEach((el, i) => {
            el.addEventListener('click', () => {
                bootstrap.Modal.getInstance($('searchResultsModal'))?.hide();
                showToast(`Viewing: ${results[i].name}`, 'fa-solid fa-magnifying-glass text-primary');
            });
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       STORY VIEWER
    ═══════════════════════════════════════════════════════════════ */
    $$('.story-card-nexora:not(.story-card-add)').forEach(card => {
        card.addEventListener('click', () => {
            const img  = card.dataset.storyImg;
            const av   = card.dataset.avatar;
            const name = card.dataset.storyName;
            if ($('storyModalImage'))  $('storyModalImage').src  = img;
            if ($('storyModalAvatar')) $('storyModalAvatar').src = av;
            if ($('storyModalName'))   $('storyModalName').innerText = name;
            new bootstrap.Modal($('storyViewerModal')).show();
        });
    });

    /* ═══════════════════════════════════════════════════════════════
       REACTION SYSTEM (Like / Love / Haha / Wow / Sad / Angry)
    ═══════════════════════════════════════════════════════════════ */
    const REACTIONS = [
        { key: 'like',  emoji: '👍', label: 'Like',  cls: 'text-primary' },
        { key: 'love',  emoji: '❤️', label: 'Love',  cls: 'text-danger'  },
        { key: 'haha',  emoji: '😂', label: 'Haha',  cls: 'text-warning' },
        { key: 'wow',   emoji: '😮', label: 'Wow',   cls: 'text-warning' },
        { key: 'sad',   emoji: '😢', label: 'Sad',   cls: 'text-info'    },
        { key: 'angry', emoji: '😡', label: 'Angry', cls: 'text-danger'  },
    ];

    /* ═══════════════════════════════════════════════════════════════
       PARTICLES
    ═══════════════════════════════════════════════════════════════ */
    function burst(x, y) {
        ['#ef4444','#ec4899','#8b5cf6','#4f46e5','#f59e0b'].forEach((c, i) => {
            const p = document.createElement('div');
            p.className = 'particle-burst';
            p.style.cssText = `left:${x}px;top:${y}px;background:${c};position:fixed;z-index:9999;border-radius:50%;width:10px;height:10px;pointer-events:none;`;
            const angle = (i / 5) * Math.PI * 2;
            const dist  = 40 + Math.random() * 30;
            p.style.setProperty('--tx', `${Math.cos(angle)*dist}px`);
            p.style.setProperty('--ty', `${Math.sin(angle)*dist}px`);
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 650);
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       POST LISTENERS (Like, Comment, Delete, Report, Save, Reactions)
    ═══════════════════════════════════════════════════════════════ */
    function attachPostListeners(card) {
        // LIKE BUTTON
        const likeBtn   = card.querySelector('.btn-like-nexora');
        const likeSpan  = card.querySelector('.like-count');
        const heartIcon = likeBtn?.querySelector('i');

        likeBtn?.addEventListener('click', e => {
            const liked = likeBtn.classList.toggle('liked');
            const n = parseInt(likeSpan?.innerText) || 0;
            if (liked) {
                if (heartIcon) heartIcon.className = 'fa-solid fa-heart fs-5 text-danger heart-pop';
                if (likeSpan) likeSpan.innerText = `${n + 1} Likes`;
                burst(e.clientX, e.clientY);
                showToast('You reacted: ❤️ Like!', 'fa-solid fa-heart text-danger');
            } else {
                if (heartIcon) heartIcon.className = 'fa-regular fa-heart fs-5';
                if (likeSpan) likeSpan.innerText = `${Math.max(0, n - 1)} Likes`;
            }
        });

        // COMMENT – toggle & submit
        const commentToggle = card.querySelector('.btn-comment-toggle');
        const commentSection = card.querySelector('.comments-section');
        commentToggle?.addEventListener('click', () => {
            commentSection?.classList.toggle('d-none');
            card.querySelector('.comment-input')?.focus();
        });

        const submitBtn   = card.querySelector('.btn-submit-comment');
        const commentInput = card.querySelector('.comment-input');
        const commentsList = card.querySelector('.comments-list');
        const commentLabel = card.querySelector('.comment-count-label');

        function addComment() {
            const val = commentInput?.value.trim();
            if (!val) return;
            const div = document.createElement('div');
            div.className = 'd-flex gap-2 mb-2 comment-item';
            div.innerHTML = `
                <img src="${currentUser.avatar}" class="rounded-circle flex-shrink-0" style="width:32px;height:32px;object-fit:cover;">
                <div class="flex-grow-1">
                    <div class="comment-bubble-nexora">
                        <div class="fw-bold small">${escapeHtml(currentUser.name)}</div>
                        <span>${escapeHtml(val)}</span>
                    </div>
                    <div class="d-flex gap-3 ps-2 mt-1">
                        <button class="btn btn-link btn-sm p-0 text-muted small comment-like-btn">👍 Like</button>
                        <button class="btn btn-link btn-sm p-0 text-muted small comment-reply-btn">↩ Reply</button>
                        <button class="btn btn-link btn-sm p-0 text-danger small comment-delete-btn">🗑 Delete</button>
                        <span class="text-muted small">${fmtTime()}</span>
                    </div>
                </div>
            `;
            commentsList?.appendChild(div);
            if (commentInput) commentInput.value = '';

            // comment like / delete / reply
            div.querySelector('.comment-like-btn')?.addEventListener('click', function() {
                this.classList.toggle('text-primary');
                this.classList.toggle('fw-bold');
            });
            div.querySelector('.comment-delete-btn')?.addEventListener('click', () => div.remove());
            div.querySelector('.comment-reply-btn')?.addEventListener('click', () => {
                if (commentInput) { commentInput.value = `@${currentUser.name.split(' ')[0]} `; commentInput.focus(); }
            });

            if (commentLabel) {
                const t = commentsList?.children.length || 0;
                commentLabel.innerText = `${t} Comment${t !== 1 ? 's' : ''}`;
            }
        }

        submitBtn?.addEventListener('click', addComment);
        commentInput?.addEventListener('keypress', e => { if (e.key === 'Enter') addComment(); });

        // POST DELETE
        card.querySelector('.btn-delete-post')?.addEventListener('click', e => {
            e.preventDefault();
            card.style.transform = 'scale(0.95)';
            card.style.opacity   = '0';
            setTimeout(() => card.remove(), 300);
            showToast('Post deleted', 'fa-solid fa-trash text-danger');
        });

        // POST SAVE
        card.querySelector('.btn-save-post-item')?.addEventListener('click', e => {
            e.preventDefault();
            showToast('Post saved to your Saved Items ⭐', 'fa-solid fa-bookmark text-warning');
        });

        // POST REPORT
        card.querySelector('.btn-report-post')?.addEventListener('click', e => {
            e.preventDefault();
            showToast('Post reported. We\'ll review it shortly.', 'fa-solid fa-flag text-danger');
        });

        // SHARE
        card.querySelector('.btn-share-post')?.addEventListener('click', () => {
            new bootstrap.Modal($('shareModal')).show();
        });
    }

    // Attach to existing posts
    $$('.post-card-nexora').forEach(c => attachPostListeners(c));

    /* ═══════════════════════════════════════════════════════════════
       CREATE POST MODAL
    ═══════════════════════════════════════════════════════════════ */
    const postsFeed = $('postsFeedContainer');
    const textarea  = $('createPostTextarea');
    const imgSel    = $('postImageSelect');
    const feelingSel = $('postFeelingSelect');
    const privSel   = $('postPrivacySelect');
    const imgPreview = $('postImagePreview');

    // Image select preview
    imgSel?.addEventListener('change', () => {
        if (imgPreview) {
            imgPreview.src = imgSel.value;
            imgPreview.classList.toggle('d-none', !imgSel.value);
        }
    });

    $('submitNewPostBtn')?.addEventListener('click', () => {
        const text    = textarea?.value.trim() || '';
        const img     = imgSel?.value || '';
        const feeling = feelingSel?.value ? ` — feeling ${feelingSel.value}` : '';
        const priv    = privSel?.value || '🌐 Everyone';

        if (!text && !img) {
            showToast('Write something or choose an image!', 'fa-solid fa-triangle-exclamation text-warning');
            return;
        }

        const pid = 'post-' + Date.now();
        const el  = document.createElement('div');
        el.className = 'glass-card p-3 post-card-nexora post-reveal';
        el.setAttribute('data-post-id', pid);
        el.innerHTML = buildPostHTML(currentUser.name, currentUser.avatar, 'Just now', text + feeling, img, priv);
        postsFeed?.prepend(el);
        requestAnimationFrame(() => el.classList.add('active'));
        attachPostListeners(el);
        revealObs.observe(el);

        if (textarea)  textarea.value  = '';
        if (imgSel)    imgSel.value     = '';
        if (feelingSel) feelingSel.value = '';
        if (imgPreview) imgPreview.classList.add('d-none');

        bootstrap.Modal.getInstance($('createPostModal'))?.hide();
        showToast('Post published to NEXORA! 🚀', 'fa-solid fa-circle-check text-success');
    });

    function buildPostHTML(name, av, time, text, img, priv) {
        return `
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2">
                    <img src="${av}" class="rounded-circle" style="width:42px;height:42px;object-fit:cover;">
                    <div>
                        <h6 class="fw-bold mb-0">${escapeHtml(name)}</h6>
                        <small class="text-muted">${escapeHtml(time)} · <i class="fa-solid fa-earth-americas"></i> ${escapeHtml(priv)}</small>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm border-0 text-muted" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end glass-card border-0 shadow p-1">
                        <li><a class="dropdown-item rounded-3 py-2 btn-save-post-item" href="#"><i class="fa-solid fa-bookmark me-2 text-primary"></i>Save Post</a></li>
                        <li><a class="dropdown-item rounded-3 py-2 btn-report-post" href="#"><i class="fa-solid fa-flag me-2 text-warning"></i>Report Post</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item rounded-3 py-2 text-danger btn-delete-post" href="#"><i class="fa-solid fa-trash me-2"></i>Delete Post</a></li>
                    </ul>
                </div>
            </div>
            ${text ? `<p class="mb-3">${escapeHtml(text)}</p>` : ''}
            ${img ? `<div class="post-media-box mb-2"><img src="${img}" alt="Post image"></div>` : ''}
            <div class="d-flex justify-content-between align-items-center pt-2 pb-2 text-muted small border-bottom border-subtle">
                <span class="fw-bold like-count">0 Likes</span>
                <span><span class="comment-count-label">0 Comments</span></span>
            </div>
            <div class="d-flex justify-content-around align-items-center pt-2">
                <button class="action-post-pill btn-like-nexora"><i class="fa-regular fa-heart fs-5"></i> Like</button>
                <button class="action-post-pill btn-comment-toggle"><i class="fa-regular fa-comment fs-5"></i> Comment</button>
                <button class="action-post-pill btn-share-post"><i class="fa-regular fa-paper-plane fs-5"></i> Share</button>
            </div>
            <div class="comments-section mt-3 pt-3 border-top border-subtle">
                <div class="d-flex gap-2 mb-2">
                    <img src="${av}" class="rounded-circle flex-shrink-0" style="width:32px;height:32px;object-fit:cover;">
                    <input type="text" class="form-control form-control-sm rounded-pill comment-input" placeholder="Write a comment..." autocomplete="off">
                    <button class="btn btn-primary btn-sm rounded-circle px-3 btn-submit-comment"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
                <div class="comments-list"></div>
            </div>
        `;
    }

    /* ═══════════════════════════════════════════════════════════════
       SHARE MODAL
    ═══════════════════════════════════════════════════════════════ */
    $('copyLinkBtn')?.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            bootstrap.Modal.getInstance($('shareModal'))?.hide();
            showToast('🔗 Link copied to clipboard!', 'fa-solid fa-link text-success');
        });
    });
    $('shareToFeedBtn')?.addEventListener('click', () => {
        bootstrap.Modal.getInstance($('shareModal'))?.hide();
        showToast('Post shared to your Feed! 📰', 'fa-solid fa-share-nodes text-primary');
    });
    $('shareToStoryBtn')?.addEventListener('click', () => {
        bootstrap.Modal.getInstance($('shareModal'))?.hide();
        showToast('Post shared to your Story! 📖', 'fa-solid fa-book-open text-warning');
    });

    /* ═══════════════════════════════════════════════════════════════
       FLOATING MESSENGER
    ═══════════════════════════════════════════════════════════════ */
    const messenger = $('messengerPanel');
    const msgInput  = $('chatMessageInput');
    const msgBox    = $('chatMessagesContainer');

    $('toggleMessengerBtn')?.addEventListener('click', () => {
        messenger?.classList.toggle('d-none');
        if (!messenger?.classList.contains('d-none')) msgInput?.focus();
    });
    $('closeMessengerBtn')?.addEventListener('click', () => messenger?.classList.add('d-none'));

    const AUTO_REPLIES = [
        "That's awesome! 🔥",
        "Tell me more! 😊",
        "Love the vibe on NEXORA!",
        "Totally agree with you! 💯",
        "Can't wait to see what you build next! 🚀",
        "That's so cool! ✨",
    ];
    let replyIdx = 0;

    function sendMsg() {
        const text = msgInput?.value.trim();
        if (!text) return;
        appendMsg(text, 'sent');
        if (msgInput) msgInput.value = '';
        const typing = appendTyping();
        setTimeout(() => {
            typing.remove();
            appendMsg(AUTO_REPLIES[replyIdx++ % AUTO_REPLIES.length], 'received');
        }, 1200);
    }

    function appendMsg(text, type) {
        const div = document.createElement('div');
        div.className = `chat-bubble-nexora ${type}`;
        div.innerText = text;
        msgBox?.appendChild(div);
        if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
        return div;
    }

    function appendTyping() {
        const div = document.createElement('div');
        div.className = 'chat-bubble-nexora received typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        msgBox?.appendChild(div);
        if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
        return div;
    }

    $('sendMessageBtn')?.addEventListener('click', sendMsg);
    msgInput?.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });

    // Emoji picker (inline demo)
    $('messengerEmojiBtn')?.addEventListener('click', () => {
        const emojis = ['😀','😂','❤️','🔥','👍','🎉','🚀','😍','🙏','💯'];
        const e = emojis[Math.floor(Math.random() * emojis.length)];
        if (msgInput) msgInput.value += e;
        msgInput?.focus();
    });

    /* ═══════════════════════════════════════════════════════════════
       NOTIFICATIONS
    ═══════════════════════════════════════════════════════════════ */
    const badge = $('notifCountBadge');
    $('markAllReadBtn')?.addEventListener('click', e => {
        e.preventDefault();
        if (badge) badge.classList.add('d-none');
        $$('.notif-item.unread').forEach(el => el.classList.remove('unread'));
        showToast('All notifications read ✓', 'fa-solid fa-check text-primary');
    });

    $('mobileNotifBtn')?.addEventListener('click', () => {
        new bootstrap.Dropdown($('notifDropdown'))?.toggle();
    });

    /* ═══════════════════════════════════════════════════════════════
       FRIEND REQUESTS
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        if (e.target.closest('.btn-confirm-freq')) {
            const card = e.target.closest('[data-req-card]');
            const name = e.target.closest('.btn-confirm-freq')?.dataset.name || 'User';
            card?.remove();
            showToast(`✅ You and ${name} are now friends on NEXORA!`, 'fa-solid fa-user-check text-success');
        }
        if (e.target.closest('.btn-delete-freq')) {
            e.target.closest('[data-req-card]')?.remove();
            showToast('Friend request removed', 'fa-solid fa-user-minus text-secondary');
        }
    });

    /* ═══════════════════════════════════════════════════════════════
       SUGGESTED FRIENDS – ADD / REMOVE
    ═══════════════════════════════════════════════════════════════ */
    $$('.btn-add-friend').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('added')) {
                btn.className = 'btn btn-outline-primary btn-sm rounded-pill px-3 btn-add-friend';
                btn.innerText = 'Add';
                showToast('Friend request cancelled', 'fa-solid fa-user-minus text-secondary');
            } else {
                btn.className = 'btn btn-success btn-sm rounded-pill px-3 btn-add-friend added';
                btn.innerText = 'Requested ✓';
                showToast('Friend request sent! 👋', 'fa-solid fa-user-plus text-success');
            }
        });
    });

    /* ═══════════════════════════════════════════════════════════════
       GROUPS – JOIN / LEAVE
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.btn-join-group');
        if (!btn) return;
        const joined = btn.classList.toggle('joined');
        btn.classList.toggle('btn-success', joined);
        btn.classList.toggle('btn-outline-primary', !joined);
        btn.innerText = joined ? 'Joined ✓' : 'Join';
        showToast(joined ? 'Joined community! 🎉' : 'Left community', joined ? 'fa-solid fa-users text-success' : 'fa-solid fa-user-minus text-secondary');
    });

    /* ═══════════════════════════════════════════════════════════════
       EVENTS – RSVP INTERESTED / GOING
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.btn-rsvp-event');
        if (!btn) return;
        if (btn.classList.contains('rsvp-done')) {
            btn.className = 'btn btn-primary btn-sm rounded-pill btn-rsvp-event';
            btn.innerText = 'Interested';
            showToast('RSVP cancelled', 'fa-solid fa-calendar-xmark text-secondary');
        } else {
            btn.className = 'btn btn-success btn-sm rounded-pill btn-rsvp-event rsvp-done';
            btn.innerHTML = '<i class="fa-solid fa-calendar-check me-1"></i>Going ✓';
            showToast('You\'re going! Event saved to calendar 🗓', 'fa-solid fa-calendar-check text-success');
        }
    });

    /* ═══════════════════════════════════════════════════════════════
       MEMORIES – RESHARE
    ═══════════════════════════════════════════════════════════════ */
    $('reshareMemoryBtn')?.addEventListener('click', () => {
        bootstrap.Modal.getInstance($('memoriesModal'))?.hide();
        showToast('Memory shared to your Feed! 📸', 'fa-solid fa-share text-info');
    });

    /* ═══════════════════════════════════════════════════════════════
       SAVED ITEMS – UNSAVE
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.btn-unsave-item');
        if (!btn) return;
        btn.closest('[data-saved-card]')?.remove();
        showToast('Removed from Saved Items', 'fa-solid fa-trash text-danger');
    });

    // Save post
    document.addEventListener('click', e => {
        if (e.target.closest('.btn-save-post-item')) {
            e.preventDefault();
            showToast('Post saved ⭐', 'fa-solid fa-bookmark text-warning');
        }
    });

    /* ═══════════════════════════════════════════════════════════════
       MARKETPLACE – MESSAGE SELLER
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.btn-message-seller');
        if (!btn) return;
        bootstrap.Modal.getInstance($('marketplaceModal'))?.hide();
        if ($('chatHeaderName')) $('chatHeaderName').innerText = 'Marketplace Seller';
        messenger?.classList.remove('d-none');
        showToast('Chat opened with seller 🛍️', 'fa-solid fa-store text-warning');
    });

    /* ═══════════════════════════════════════════════════════════════
       WATCH VIDEO – PLAY
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        if (e.target.closest('.btn-play-video-demo')) {
            const btn = e.target.closest('.btn-play-video-demo');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Loading...';
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-pause me-1"></i> Playing';
                btn.classList.replace('btn-primary', 'btn-success');
                showToast('▶️ Video is now playing on NEXORA Watch!', 'fa-solid fa-circle-play text-primary');
            }, 1200);
        }
    });

    /* ═══════════════════════════════════════════════════════════════
       SETTINGS – SAVE
    ═══════════════════════════════════════════════════════════════ */
    $('btnSaveSettings')?.addEventListener('click', e => {
        e.preventDefault();
        bootstrap.Modal.getInstance($('settingsModal'))?.hide();
        showToast('Settings saved ✓', 'fa-solid fa-gear text-primary');
    });

    /* ═══════════════════════════════════════════════════════════════
       PROFILE MODAL – EDIT PROFILE
    ═══════════════════════════════════════════════════════════════ */
    $('openEditProfileBtn')?.addEventListener('click', () => {
        bootstrap.Modal.getInstance($('profileModal'))?.hide();
        setTimeout(() => new bootstrap.Modal($('editProfileModal')).show(), 300);
    });

    $('saveProfileBtn')?.addEventListener('click', () => {
        const newName = $('editNameInput')?.value.trim();
        const newBio  = $('editBioInput')?.value.trim();
        const newRole = $('editRoleInput')?.value.trim();
        if (newName) {
            $$('.sidebar-username').forEach(el => el.innerText = newName);
            currentUser.name = newName;
        }
        if (newRole) {
            $$('.sidebar-user-role').forEach(el => el.innerText = newRole);
            currentUser.role = newRole;
        }
        bootstrap.Modal.getInstance($('editProfileModal'))?.hide();
        showToast('Profile updated successfully! ✅', 'fa-solid fa-user-check text-success');
    });

    /* ═══════════════════════════════════════════════════════════════
       DARK MODE ON AUTH PAGE TOO (sync)
    ═══════════════════════════════════════════════════════════════ */
    // already handled by theme toggle

    /* ═══════════════════════════════════════════════════════════════
       NAV TAB ACTIVE INDICATOR
    ═══════════════════════════════════════════════════════════════ */
    $$('.nav-tab-nexora[id^="tab"]').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.nav-tab-nexora[id^="tab"]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    /* ═══════════════════════════════════════════════════════════════
       MOBILE BOTTOM NAV ACTIVE STATE
    ═══════════════════════════════════════════════════════════════ */
    $$('.mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    /* ═══════════════════════════════════════════════════════════════
       POST LIKE – REPORT
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        if (e.target.closest('.btn-report-post')) {
            e.preventDefault();
            showToast('Post reported. Thanks for keeping NEXORA safe 🛡️', 'fa-solid fa-flag text-danger');
        }
    });

    /* ═══════════════════════════════════════════════════════════════
       TRENDING HASHTAGS – CLICK
    ═══════════════════════════════════════════════════════════════ */
    $$('.badge.bg-primary-subtle').forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', () => {
            showToast(`Browsing ${badge.innerText} posts 🔍`, 'fa-solid fa-hashtag text-primary');
        });
    });

    /* ═══════════════════════════════════════════════════════════════
       RIPPLE EFFECT ON BUTTONS
    ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.btn, .action-post-pill, .nav-tab-nexora, .sidebar-menu-item');
        if (!btn) return;
        const ripple = document.createElement('span');
        const rect   = btn.getBoundingClientRect();
        ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);
            width:60px;height:60px;left:${e.clientX - rect.left - 30}px;top:${e.clientY - rect.top - 30}px;
            transform:scale(0);animation:rippleAnim 0.5s ease-out forwards;pointer-events:none;`;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });

    console.log('%c✦ NEXORA v3.0 — All systems online', 'background:#4f46e5;color:#fff;padding:4px 10px;border-radius:6px;font-weight:bold;');
});
