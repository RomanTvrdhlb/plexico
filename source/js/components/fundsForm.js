document.addEventListener("DOMContentLoaded", function () {
    const fundsForms = document.querySelectorAll('[data-select-parrent]');

    fundsForms.forEach(function(form) {
        const valuteInput = form.querySelector(".select__input");
        const currencyIcon = form.querySelector(".main-form__icon img");
        const currencyValue = form.querySelector(".main-form__total .main-form__value i");

        function updateValue() {
            if (currencyValue) {
                switch (valuteInput.value) {
                    case "1":
                        currencyValue.textContent = 'BTC';
                        break;
                    case "2":
                        currencyValue.textContent = 'ETH';
                        break;
                    case "3":
                        currencyValue.textContent = 'USDT';
                        break;
                    case "4":
                        currencyValue.textContent = 'USDC';
                        break;
                    default:
                        currencyValue.textContent = 'BTC';
                }
            }
        }

        function updateIcon() {
            switch (valuteInput.value) {
                case "1":
                    currencyIcon.src = "./img/sprite/BTC4.svg";
                    break;
                case "2":
                    currencyIcon.src = "./img/sprite/ETH4.svg";
                    break;
                case "3":
                    currencyIcon.src = "./img/sprite/USDT4.svg";
                    break;
                case "4":
                    currencyIcon.src = "./img/sprite/USDC4.svg";
                    break;
                default:
                    console.warn("Неизвестное значение:", valuteInput.value);
            }
        }

        if (valuteInput && currencyIcon) {
            const observer = new MutationObserver(() => {
                updateIcon();
                updateValue();
            });

            observer.observe(valuteInput, {
                attributes: true, 
                attributeFilter: ["value"]
            });

            updateIcon();
            updateValue();
        }

        form.addEventListener('click', function(event) {
            const button = event.target.closest('[data-btn-modal="funds"]');
        
            if (button) {
                const popupAttr = button.getAttribute('data-btn-modal');
                const popupElement = document.querySelector(`[data-popup="${popupAttr}"]`);
                const dataValueElement = popupElement ? popupElement.querySelector('[data-valute]') : null;
                const valuteInputValue = valuteInput?.value;

                if (dataValueElement) {
                    switch (valuteInputValue) {
                        case "1":
                            dataValueElement.innerHTML = "BTC";
                            break;
                        case "2":
                            dataValueElement.innerHTML = "ETH";
                            break;
                        case "3":
                            dataValueElement.innerHTML = "USDT";
                            break;
                        case "4":
                            dataValueElement.innerHTML = "USDC";
                            break;
                        default:
                            dataValueElement.innerHTML = "BTC";
                    }
                }
            }
        });
    });

    const swapForms = document.querySelectorAll('.swap-form');

    swapForms.forEach(function(form) {
        const valuteInputs = form.querySelectorAll(".select__input");
        const firstValuteInput = valuteInputs[0];
        const secondValuteInput = valuteInputs[1];
        const currencyValues = form.querySelectorAll(".main-form__swap .main-form__value i");
    
        function updateCurrencyValue() {
            currencyValues.forEach((currencyValue) => {
                if (firstValuteInput) {
                    switch (firstValuteInput.value) {
                        case "1":
                            currencyValue.textContent = 'BTC';
                            break;
                        case "2":
                            currencyValue.textContent = 'ETH';
                            break;
                        case "3":
                            currencyValue.textContent = 'USDT';
                            break;
                        case "4":
                            currencyValue.textContent = 'USDC';
                            break;
                        default:
                            currencyValue.textContent = 'BTC';
                    }
                }
            });
        }
    
        if (firstValuteInput) {
            const observer = new MutationObserver(() => {
                updateCurrencyValue();
            });
    
            observer.observe(firstValuteInput, {
                attributes: true, 
                attributeFilter: ["value"]
            });
    
            updateCurrencyValue();
        }
    
        form.addEventListener('click', function(event) {
            const button = event.target.closest('[data-btn-modal="swap"]');
        
            if (button) {
                const popupAttr = button.getAttribute('data-btn-modal');
                const popupElement = document.querySelector(`[data-popup="${popupAttr}"]`);
                const dataSellElement = popupElement ? popupElement.querySelector('[data-sell]') : null;
                const dataBuyElement = popupElement ? popupElement.querySelector('[data-buy]') : null;
    
                if (dataSellElement && firstValuteInput) {
                    switch (firstValuteInput.value) {
                        case "1":
                            dataSellElement.innerHTML = "BTC";
                            break;
                        case "2":
                            dataSellElement.innerHTML = "ETH";
                            break;
                        case "3":
                            dataSellElement.innerHTML = "USDT";
                            break;
                        case "4":
                            dataSellElement.innerHTML = "USDC";
                            break;
                        default:
                            dataSellElement.innerHTML = "BTC";
                    }
                }
    
                if (dataBuyElement && secondValuteInput) {
                    switch (secondValuteInput.value) {
                        case "1":
                            dataBuyElement.innerHTML = "BTC";
                            break;
                        case "2":
                            dataBuyElement.innerHTML = "ETH";
                            break;
                        case "3":
                            dataBuyElement.innerHTML = "USDT";
                            break;
                        case "4":
                            dataBuyElement.innerHTML = "USDC";
                            break;
                        default:
                            dataBuyElement.innerHTML = "BTC";
                    }
                }
            }
        });
    });
    
});
