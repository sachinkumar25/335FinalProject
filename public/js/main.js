document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
      commentForm.addEventListener('submit', function(e) {
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        const ratingInput = document.getElementById('rating');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
          alert('Please enter your name');
          isValid = false;
        }
        
        if (messageInput.value.trim() === '') {
          alert('Please enter a message');
          isValid = false;
        }
        
        if (messageInput.value.length > 500) {
          alert('Your message is too long. Please keep it under 500 characters.');
          isValid = false;
        }
        
        if (!isValid) {
          e.preventDefault();
        }
      });
    }
    
    const statBoxes = document.querySelectorAll('.stat-box');
    if (statBoxes.length > 0) {
      statBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.05)';
          this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
        });
      });
    }
  });