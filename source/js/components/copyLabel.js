document.addEventListener('DOMContentLoaded', () => {
    const parentElements = document.querySelectorAll('[data-copy-parent]');
    const copyLabel = document.querySelector('.copy-label');
    let labelTimeout;
  
    function handleParentClick(event) {
      const target = event.target;
  
      if (target.classList.contains('edit-btn') || target.classList.contains('partner-info__copy')) {
        const parent = target.closest('[data-copy-parent]');
        if (!parent) return;
  
        const copyElement = parent.querySelector('[data-copy]');
        if (!copyElement) return;
  
        const copyValue = copyElement.getAttribute('data-copy');
        if (!copyValue) return;
  
        navigator.clipboard.writeText(copyValue).then(() => {
          if (copyLabel) {
            const dataCopyLink = copyLabel.querySelector('[data-copy-link]');
            if (dataCopyLink) {
              dataCopyLink.textContent = copyValue;
            }
            copyLabel.classList.add('active');
  
            clearTimeout(labelTimeout);
            labelTimeout = setTimeout(() => {
              copyLabel.classList.remove('active');
            }, 5000);
          }
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    }
  
    function handleGlobalClick(event) {
      const target = event.target;
  
      if (target.classList.contains('copy-label__close') || target.closest('.copy-label')) {
        if (copyLabel) {
          copyLabel.classList.remove('active');
          clearTimeout(labelTimeout);
        }
      }
    }
  
    parentElements.forEach(parent => {
      parent.addEventListener('click', handleParentClick);
    });
  
    document.addEventListener('click', handleGlobalClick);
  });
  