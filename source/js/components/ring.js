  
    const cards = document.querySelectorAll('.product-accruals');
    const incomeCard = document.querySelector('.main-income');
  
    function setCircleProgress(element, percentage) {
      const circle = element.querySelector('.progress-ring__circle');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
  
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;
  
      const offset = circumference - (percentage / 7) * circumference;
      circle.style.strokeDashoffset = offset;
  
      const progressText = element.querySelector('.progress-ring__info b');
      if (progressText) {
        progressText.innerText = `${percentage}`;
      }
    }
  
   
    // function handleButtonClick(element, type) {
    //   let count = +element.dataset.speed;
  
    //   switch (type) {
    //     case 'plus':
    //       count = Math.min(count + 5, 100);
    //       break;
    //     case 'minus':
    //       count = Math.max(count - 5, 0); 
    //       break;
    //     case 'refresh':
    //       count = 0; 
    //       break;
    //   }
  
    //   element.dataset.speed = count;
    //   setCircleProgress(element, count);
    // }
  
    if (cards) {
      cards.forEach(function (card) {
        let count = +card.dataset.speed;
        setCircleProgress(card, count);

        // if(card.classList.contains('card--program')) return;

        // const plusBtn = card.querySelector('.card__btn--plus');
        // const minusBtn = card.querySelector('.card__btn--minus');
        // const refreshBtn = card.querySelector('.card__btn--refresh');
  
        // plusBtn.addEventListener('click', function (e) {
        //   e.preventDefault();
        //   handleButtonClick(card, 'plus');
        // });
  
        // minusBtn.addEventListener('click', function (e) {
        //   e.preventDefault();
        //   handleButtonClick(card, 'minus');
        // });
  
        // refreshBtn.addEventListener('click', function (e) {
        //   e.preventDefault();
        //   handleButtonClick(card, 'refresh');
        // });
      });
    }
  
    // if (incomeCard) {
    //   let count = +incomeCard.dataset.speed;
    //   setCircleProgress(incomeCard, count);
    // }
 