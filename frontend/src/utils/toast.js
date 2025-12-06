// Simple toast notification utility
export const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add styles
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
    word-wrap: break-word;
  `;

  // Set colors based on type
  const colors = {
    success: { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
    error: { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' },
    info: { bg: '#dbeafe', text: '#0c4a6e', border: '#3b82f6' },
    warning: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
  };

  const color = colors[type] || colors.info;
  toast.style.backgroundColor = color.bg;
  toast.style.color = color.text;
  toast.style.borderLeft = `4px solid ${color.border}`;

  document.body.appendChild(toast);

  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// Add animations to document
if (!document.getElementById('toast-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
