import Chart from "../vendor/chart.js";

function createChart(product1Data, product2Data, element) {
  const ctx = element.getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, '#57d3bf');
  gradient1.addColorStop(1, '#0fa7ba');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, '#5164d8');
  gradient2.addColorStop(1, '#0824b6');

  const data = {
    labels: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'ноя', 'дек'],
    datasets: [
      {
        label: 'Продукт №1',
        data: product1Data,
        backgroundColor: gradient2,
        borderRadius: 1,
        barThickness: 30,
        barPercentage: 1,
        categoryPercentage: 0.45,
      },
      {
        label: 'Продукт №2',
        data: product2Data,
        backgroundColor: gradient1,
        borderRadius: 1,
        barThickness: 30,
        barPercentage: 1,
        categoryPercentage: 0.45,
      }
    ]
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 28,
        right: 22,
        bottom: 16,
        left: 22
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 1500,
        grid: {
          color: '#ebebeb',
          borderDash: [3, 3],
        },
        ticks: {
          callback: function(value) {
            return '$' + value;
          },
          stepSize: 500,
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderColor: '#fff',
      }
    }
  };

  // Apply chart border and styling
  element.style.border = '0.50px solid #E6E6E8';
  element.style.borderRadius = '8px';

  // Create the chart
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}

// Data for different profit charts
const profitData = {
  1: {
    product1: [600, 250, 400, 200, 300, 500, 400, 200, 300, 400, 900, 700],
    product2: [500, 100, 200, 300, 200, 300, 500, 400, 200, 100, 500, 600]
  },
  2: {
    product1: [800, 300, 350, 220, 310, 450, 450, 250, 340, 420, 850, 750],
    product2: [480, 150, 220, 280, 210, 320, 520, 390, 220, 110, 550, 580]
  }
};

const resizeObserver = new ResizeObserver(() => {
    // Отрисовать или обновить график
    document.querySelectorAll('.profit-chart').forEach(element => {
      if (element.offsetWidth > 0 && element.offsetHeight > 0 && !element.getAttribute('data-initialized')) {
        const profitType = element.getAttribute('data-profit');
        const productData = profitData[profitType];
        
        if (productData) {
          createChart(productData.product1, productData.product2, element);
          element.setAttribute('data-initialized', 'true');
        }
      }
    });
  });
  
  // Наблюдаем за изменениями видимости родителя графика
  if(document.querySelector('.profit-chart')){
    resizeObserver.observe(document.querySelector('.profit-analysis__content-item'));
  }

  function createReferralChart(data, labels) {
    const chartCanvas = document.querySelector('.referral-chart').getContext('2d');
  
    // Создаем градиент для столбиков
    const gradientBar = chartCanvas.createLinearGradient(0, 0, 0, 400);
    gradientBar.addColorStop(0, '#914fea');  // Фиолетовый цвет
    gradientBar.addColorStop(1, '#3b2ec6');  // Синий цвет
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Сумма оборота',
          data: data,
          backgroundColor: gradientBar, // Применяем градиент к столбикам
          borderRadius: 4,
          barThickness: 30,
          barPercentage: 0.7,
          categoryPercentage: 0.5,
        }
      ]
    };
  
    const chartOptions = {
      layout: {
        padding: {
          top: 28,
          right: 22,
          bottom: 16,
          left: 22
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#ebebeb',
            borderDash: [3, 3]
          },
          ticks: {
            callback: function(value) {
              return '$' + value;
            },
            stepSize: 20000, // Для отображения меток 0$, 20000$, 40000$, 60000$, 80000$
          }
        }
      },
      plugins: {
        legend: {
          display: false // Скрываем легенду
        }
      }
    };
  
    // Применяем стили для границ и радиуса графика
    const chartElement = document.querySelector('.referral-chart');
    chartElement.style.border = '0.50px solid #E6E6E8';
    chartElement.style.borderRadius = '8px';
  
    // Создаем график
    new Chart(chartCanvas, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }
  
  // Пример вызова функции с данными
  const referralData = [80000, 60000, 30000, 15000, 5000];
  const referralLabels = ['Petr Olegov', 'Maria Black', 'Nikita Kirov', 'Stanislav 129', 'Egor Maslov'];
  
  // Вызов функции для создания графика
  if(document.querySelector('.referral-chart')){
    createReferralChart(referralData, referralLabels);
  }