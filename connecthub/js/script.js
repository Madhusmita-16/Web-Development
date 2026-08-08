/**
 * ConnectHub — Social Media Platform Application Script
 * Features: Dark Mode, Post Creation, Like/Comment/Share, Stories, Search, Messenger, Friend Requests, Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. Global Initializations & Bootstrap Components
       -------------------------------------------------------------------------- */
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Current User Data
    const currentUser = {
        name: "Madhu Smita Mishra",
        avatar: "images/avatars/user.jpg",
        role: "Full Stack Engineer"
    };

    /* --------------------------------------------------------------------------
       2. Toast Notification Manager
       -------------------------------------------------------------------------- */
    function showToast(message, iconClass = 'fa-solid fa-circle-check text-success') {
        const toastContainer = document.getElementById('toastContainer');
        const toastEl = document.createElement('div');
        toastEl.className = 'toast-custom';
        toastEl.innerHTML = `
            <i class="${iconClass} fs-5"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toastEl);

        setTimeout(() => {
            toastEl.style.opacity = '0';
            toastEl.style.transform = 'scale(0.8)';
            setTimeout(() => toastEl.remove(), 300);
        }, 3000);
    }

    /* --------------------------------------------------------------------------
       3. Dark Mode Toggle & LocalStorage Persistence
       -------------------------------------------------------------------------- */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('connecthub-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (darkModeToggle) {
        darkModeToggle.checked = (savedTheme === 'dark');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            const newTheme = darkModeToggle.checked ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('connecthub-theme', newTheme);
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} mode`, 'fa-solid fa-moon text-warning');
        });
    }

    /* --------------------------------------------------------------------------
       4. Post Creation & Dynamic Feed Handling
       -------------------------------------------------------------------------- */
    const submitNewPostBtn = document.getElementById('submitNewPostBtn');
    const createPostTextarea = document.getElementById('createPostTextarea');
    const postImageSelect = document.getElementById('postImageSelect');
    const postsFeedContainer = document.getElementById('postsFeedContainer');

    if (submitNewPostBtn) {
        submitNewPostBtn.addEventListener('click', () => {
            const postText = createPostTextarea.value.trim();
            const selectedImg = postImageSelect.value;

            if (!postText && !selectedImg) {
                showToast('Please enter some text or select an image for your post.', 'fa-solid fa-circle-exclamation text-warning');
                return;
            }

            const postId = 'post-' + Date.now();
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.setAttribute('data-post-id', postId);

            const imageHtml = selectedImg ? `<img src="${selectedImg}" alt="Post Image" class="post-media-img">` : '';

            postElement.innerHTML = `
                <div class="post-header">
                    <div class="d-flex align-items-center gap-2">
                        <img src="${currentUser.avatar}" alt="${currentUser.name}" class="post-author-avatar">
                        <div>
                            <h6 class="post-author-name mb-0">${currentUser.name}</h6>
                            <span class="post-time-privacy">Just now · <i class="fa-solid fa-earth-americas"></i></span>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm border-0 text-secondary" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bookmark me-2"></i>Save Post</a></li>
                            <li><a class="dropdown-item btn-delete-post" href="#" data-post-target="${postId}"><i class="fa-solid fa-trash me-2 text-danger"></i>Delete Post</a></li>
                        </ul>
                    </div>
                </div>
                <div class="post-content-text">${escapeHtml(postText)}</div>
                ${imageHtml}
                <div class="post-stats-bar">
                    <div>
                        <span class="reaction-icons">
                            <span class="reaction-icon-badge reaction-like"><i class="fa-solid fa-thumbs-up"></i></span>
                        </span>
                        <span class="like-count">0</span>
                    </div>
                    <div>
                        <span class="comment-count-label">0 Comments</span> · <span>0 Shares</span>
                    </div>
                </div>
                <div class="post-actions-bar">
                    <button class="post-action-btn btn-like-action">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>Like</span>
                    </button>
                    <button class="post-action-btn btn-comment-toggle">
                        <i class="fa-regular fa-comment"></i>
                        <span>Comment</span>
                    </button>
                    <button class="post-action-btn btn-share-action" data-bs-toggle="modal" data-bs-target="#shareModal">
                        <i class="fa-regular fa-share-from-square"></i>
                        <span>Share</span>
                    </button>
                </div>
                <div class="comments-section">
                    <div class="comment-input-box">
                        <img src="${currentUser.avatar}" alt="User" class="rounded-circle" style="width:32px; height:32px; object-fit:cover;">
                        <input type="text" class="comment-input" placeholder="Write a comment..." autocomplete="off">
                        <button class="btn btn-primary btn-sm rounded-pill btn-submit-comment px-3"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                    <div class="comments-list"></div>
                </div>
            `;

            postsFeedContainer.prepend(postElement);
            attachPostEventListeners(postElement);

            // Reset modal & input
            createPostTextarea.value = '';
            postImageSelect.value = '';
            const modalEl = document.getElementById('createPostModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();

            showToast('Post published successfully!', 'fa-solid fa-circle-check text-success');
        });
    }

    // Utility HTML Escaper
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    /* --------------------------------------------------------------------------
       5. Post Event Listeners (Like, Comment, Share, Delete)
       -------------------------------------------------------------------------- */
    function attachPostEventListeners(postCard) {
        // Like Button Handler
        const likeBtn = postCard.querySelector('.btn-like-action');
        const likeCountSpan = postCard.querySelector('.like-count');
        const likeIcon = likeBtn ? likeBtn.querySelector('i') : null;
        const likeLabel = likeBtn ? likeBtn.querySelector('span') : null;

        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                let currentLikes = parseInt(likeCountSpan.innerText) || 0;
                if (likeBtn.classList.contains('liked')) {
                    likeBtn.classList.remove('liked');
                    likeIcon.className = 'fa-regular fa-thumbs-up';
                    likeLabel.innerText = 'Like';
                    likeCountSpan.innerText = Math.max(0, currentLikes - 1);
                } else {
                    likeBtn.classList.add('liked');
                    likeIcon.className = 'fa-solid fa-thumbs-up text-primary';
                    likeLabel.innerText = 'Liked';
                    likeCountSpan.innerText = currentLikes + 1;
                }
            });
        }

        // Comment Submission Handler
        const submitCommentBtn = postCard.querySelector('.btn-submit-comment');
        const commentInput = postCard.querySelector('.comment-input');
        const commentsList = postCard.querySelector('.comments-list');
        const commentCountLabel = postCard.querySelector('.comment-count-label');

        function addComment() {
            const commentText = commentInput.value.trim();
            if (!commentText) return;

            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `
                <img src="${currentUser.avatar}" alt="User" class="rounded-circle" style="width:32px; height:32px; object-fit:cover;">
                <div>
                    <div class="comment-bubble">
                        <div class="comment-author">${currentUser.name}</div>
                        ${escapeHtml(commentText)}
                    </div>
                    <div class="comment-actions d-flex gap-2 align-items-center">
                        <span>Just now</span> · 
                        <a href="#" class="text-decoration-none">Like</a> · 
                        <button class="btn-delete-comment ms-1">Delete</button>
                    </div>
                </div>
            `;

            // Delete comment listener
            const deleteBtn = commentItem.querySelector('.btn-delete-comment');
            deleteBtn.addEventListener('click', () => {
                commentItem.remove();
                updateCommentCount();
                showToast('Comment deleted', 'fa-solid fa-trash text-danger');
            });

            commentsList.appendChild(commentItem);
            commentInput.value = '';
            updateCommentCount();
        }

        function updateCommentCount() {
            const totalComments = commentsList.children.length;
            if (commentCountLabel) {
                commentCountLabel.innerText = `${totalComments} Comment${totalComments === 1 ? '' : 's'}`;
            }
        }

        if (submitCommentBtn && commentInput) {
            submitCommentBtn.addEventListener('click', addComment);
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addComment();
            });
        }

        // Post Delete Handler
        const deletePostBtn = postCard.querySelector('.btn-delete-post');
        if (deletePostBtn) {
            deletePostBtn.addEventListener('click', (e) => {
                e.preventDefault();
                postCard.remove();
                showToast('Post removed from feed', 'fa-solid fa-trash text-danger');
            });
        }
    }

    // Attach listeners to existing pre-rendered posts
    document.querySelectorAll('.post-card').forEach(postCard => attachPostEventListeners(postCard));

    /* --------------------------------------------------------------------------
       6. Share Modal Actions
       -------------------------------------------------------------------------- */
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareToFeedBtn = document.getElementById('shareToFeedBtn');
    const shareToStoryBtn = document.getElementById('shareToStoryBtn');

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                closeModal('shareModal');
                showToast('Link copied to clipboard!', 'fa-solid fa-link text-primary');
            }).catch(() => {
                closeModal('shareModal');
                showToast('Link copied!', 'fa-solid fa-link text-primary');
            });
        });
    }

    if (shareToFeedBtn) {
        shareToFeedBtn.addEventListener('click', () => {
            closeModal('shareModal');
            showToast('Post shared to your Feed!', 'fa-solid fa-share text-success');
        });
    }

    if (shareToStoryBtn) {
        shareToStoryBtn.addEventListener('click', () => {
            closeModal('shareModal');
            showToast('Post added to your Story!', 'fa-solid fa-circle-plus text-info');
        });
    }

    function closeModal(modalId) {
        const modalEl = document.getElementById(modalId);
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
    }

    /* --------------------------------------------------------------------------
       7. Stories Fullscreen Viewer Modal
       -------------------------------------------------------------------------- */
    const storyCards = document.querySelectorAll('.story-card:not(.story-card-add)');
    const storyModalImage = document.getElementById('storyModalImage');
    const storyModalAvatar = document.getElementById('storyModalAvatar');
    const storyModalName = document.getElementById('storyModalName');

    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            const storyImg = card.getAttribute('data-story-img');
            const avatar = card.getAttribute('data-avatar');
            const name = card.getAttribute('data-story-name');

            if (storyModalImage) storyModalImage.src = storyImg;
            if (storyModalAvatar) storyModalAvatar.src = avatar;
            if (storyModalName) storyModalName.innerText = name;

            const storyModal = new bootstrap.Modal(document.getElementById('storyViewerModal'));
            storyModal.show();
        });
    });

    /* --------------------------------------------------------------------------
       8. Friend Requests Actions
       -------------------------------------------------------------------------- */
    const confirmFreqBtns = document.querySelectorAll('.btn-confirm-freq');
    const deleteFreqBtns = document.querySelectorAll('.btn-delete-freq');

    confirmFreqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.friend-request-card');
            const friendName = btn.getAttribute('data-name');
            if (card) card.remove();
            showToast(`Friend request accepted from ${friendName}`, 'fa-solid fa-user-check text-success');
        });
    });

    deleteFreqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.friend-request-card');
            if (card) card.remove();
            showToast('Friend request removed', 'fa-solid fa-user-minus text-secondary');
        });
    });

    /* --------------------------------------------------------------------------
       9. Online Contacts & Floating Messenger Chat
       -------------------------------------------------------------------------- */
    const contactItems = document.querySelectorAll('.contact-item');
    const toggleMessengerBtn = document.getElementById('toggleMessengerBtn');
    const messengerPanel = document.getElementById('messengerPanel');
    const closeMessengerBtn = document.getElementById('closeMessengerBtn');
    const chatHeaderName = document.getElementById('chatHeaderName');
    const chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
    const chatMessagesContainer = document.getElementById('chatMessagesContainer');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-contact-name');
            const avatar = item.getAttribute('data-contact-avatar');

            if (chatHeaderName) chatHeaderName.innerText = name;
            if (chatHeaderAvatar) chatHeaderAvatar.src = avatar;

            if (messengerPanel) messengerPanel.classList.remove('d-none');
            if (chatMessageInput) chatMessageInput.focus();
        });
    });

    if (toggleMessengerBtn) {
        toggleMessengerBtn.addEventListener('click', () => {
            if (messengerPanel) messengerPanel.classList.toggle('d-none');
        });
    }

    if (closeMessengerBtn) {
        closeMessengerBtn.addEventListener('click', () => {
            if (messengerPanel) messengerPanel.classList.add('d-none');
        });
    }

    function sendChatMessage() {
        const msgText = chatMessageInput.value.trim();
        if (!msgText) return;

        const sentBubble = document.createElement('div');
        sentBubble.className = 'chat-bubble sent';
        sentBubble.innerText = msgText;
        chatMessagesContainer.appendChild(sentBubble);

        chatMessageInput.value = '';
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        // Auto reply simulation after 1.2s
        setTimeout(() => {
            const replyBubble = document.createElement('div');
            replyBubble.className = 'chat-bubble received';
            replyBubble.innerText = "Awesome! Thanks for reaching out.";
            chatMessagesContainer.appendChild(replyBubble);
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
       10. Live Search Filtering & Search Modal Results
       -------------------------------------------------------------------------- */
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInputModal = document.getElementById('mobileSearchInputModal');
    const searchResultsList = document.getElementById('searchResultsList');

    function performSearch(query) {
        query = query.toLowerCase().trim();
        if (!searchResultsList) return;

        if (!query) {
            searchResultsList.innerHTML = '<p class="text-muted text-center py-4">Start typing to search ConnectHub...</p>';
            return;
        }

        const items = [
            { name: "Sarah Williams", type: "User", subtitle: "Fitness Coach", img: "images/avatars/sarah.jpg" },
            { name: "Rahul Sharma", type: "User", subtitle: "Software Engineer", img: "images/avatars/rahul.jpg" },
            { name: "Priya Das", type: "User", subtitle: "UI/UX Designer", img: "images/avatars/priya.jpg" },
            { name: "Alex Johnson", type: "User", subtitle: "Product Manager", img: "images/avatars/alex.jpg" },
            { name: "Emma Wilson", type: "User", subtitle: "Content Creator", img: "images/avatars/emma.jpg" },
            { name: "Fitness & Wellness", type: "Group", subtitle: "14.2K members", img: "images/posts/post1.jpg" },
            { name: "Tech Innovators", type: "Group", subtitle: "8.5K members", img: "images/posts/post2.jpg" }
        ];

        const filtered = items.filter(item => item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query));

        if (filtered.length === 0) {
            searchResultsList.innerHTML = `<p class="text-muted text-center py-4">No results found for "<strong>${escapeHtml(query)}</strong>"</p>`;
            return;
        }

        searchResultsList.innerHTML = filtered.map(item => `
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 border-0 rounded-3">
                <img src="${item.img}" alt="${item.name}" class="rounded-circle" style="width:40px; height:40px; object-fit:cover;">
                <div>
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-muted">${item.type} · ${item.subtitle}</small>
                </div>
            </a>
        `).join('');
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value;
            performSearch(val);
            if (val.trim()) {
                const searchModal = new bootstrap.Modal(document.getElementById('searchResultsModal'));
                searchModal.show();
            }
        });
    }

    if (mobileSearchInputModal) {
        mobileSearchInputModal.addEventListener('input', (e) => performSearch(e.target.value));
    }

    /* --------------------------------------------------------------------------
       11. Notifications Dropdown Actions
       -------------------------------------------------------------------------- */
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notifBadgeCount = document.getElementById('notifBadgeCount');
    const notifList = document.getElementById('notifList');

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (notifBadgeCount) notifBadgeCount.classList.add('d-none');
            if (notifList) {
                notifList.querySelectorAll('.unread').forEach(item => item.classList.remove('unread'));
            }
            showToast('All notifications marked as read', 'fa-solid fa-check text-primary');
        });
    }

    /* --------------------------------------------------------------------------
       12. Profile View Modal Trigger
       -------------------------------------------------------------------------- */
    const profileBtns = [
        document.getElementById('openProfileViewBtn'),
        document.getElementById('openProfileViewBtn2'),
        document.getElementById('sidebarProfileLink'),
        document.getElementById('mobileProfileLink')
    ];

    profileBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
                profileModal.show();
            });
        }
    });

    /* --------------------------------------------------------------------------
       13. See More Sidebar Toggle
       -------------------------------------------------------------------------- */
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const seeMoreText = document.getElementById('seeMoreText');
    const seeMoreIcon = document.getElementById('seeMoreIcon');
    const sidebarMoreCollapse = document.getElementById('sidebarMoreCollapse');

    if (sidebarMoreCollapse && seeMoreBtn) {
        sidebarMoreCollapse.addEventListener('shown.bs.collapse', () => {
            if (seeMoreText) seeMoreText.innerText = 'See Less';
            if (seeMoreIcon) seeMoreIcon.className = 'fa-solid fa-chevron-up';
        });
        sidebarMoreCollapse.addEventListener('hidden.bs.collapse', () => {
            if (seeMoreText) seeMoreText.innerText = 'See More';
            if (seeMoreIcon) seeMoreIcon.className = 'fa-solid fa-chevron-down';
        });
    }

    /* --------------------------------------------------------------------------
       14. Back to Top Button
       -------------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if (backToTopBtn) backToTopBtn.classList.remove('d-none');
        } else {
            if (backToTopBtn) backToTopBtn.classList.add('d-none');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       15. Logout Handler
       -------------------------------------------------------------------------- */
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Logged out of ConnectHub', 'fa-solid fa-right-from-bracket text-warning');
        });
    }

});
