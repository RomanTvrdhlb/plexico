import Chart from "../vendor/chart.js";

function createChart(product1Data, product2Data, element) {
  const ctx = element.getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, '#57d3bf');
  gradient1.addColorStop(1, '#0fa7ba');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, '#5164d8');
  gradient2.addColorStop(1, '#0824b6');

  const labels = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'ноя', 'дек'];
  const labelsMobile = ['я', 'ф', 'м', 'а', 'м', 'и', 'и', 'а', 'с', 'о', 'н', 'д'];

  const isMobile = window.innerWidth <= 576;

  const yAxisMobileLabels = {
    1500: '1,5k',
    1000: '1k',
    500: '500',
  };

  const data = {
    labels: isMobile ? labelsMobile : labels,
    datasets: [
      {
        label: 'Продукт №1',
        data: product1Data,
        backgroundColor: gradient2,
        borderRadius: 1,
        barThickness: isMobile ? 15 : 30,
        barPercentage: 1,
        categoryPercentage: isMobile ? 0.6 : 0.45, 
      },
      {
        label: 'Продукт №2',
        data: product2Data,
        backgroundColor: gradient1,
        borderRadius: 1,
        barThickness: isMobile ? 15 : 30,
        barPercentage: 1,
        categoryPercentage: isMobile ? 0.6 : 0.45,
      }
    ]
  };

  const options = {
    responsive: true,
    layout: {
      padding: isMobile ? { top: 21, right: 14, bottom: 10, left: 10 } : { top: 28, right: 22, bottom: 16, left: 16 },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            // family: 'var(--font-family)',
            weight: 400,
            size: 12,
            lineHeight: 1.3,
          },
          color: '#6C6E79',
          align: 'center',
          maxRotation: 0,
          minRotation: 0,
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
            return isMobile && yAxisMobileLabels[value] ? yAxisMobileLabels[value] : '$' + value; 
          },
          stepSize: 500,
          font: {
            // family: 'var(--font-family)', 
            weight: 400,
            size: 12,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          },
          color: '#6C6E79',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderColor: '#fff',
      }
    }
  };

  element.style.border = '0.50px solid #E6E6E8';
  element.style.borderRadius = '8px';

  if (element.chartInstance) {
    element.chartInstance.destroy();
  }

  element.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}

const profitData = {
  1: {
    product1: [600, 250, 400, 200, 300, 500, 400, 200, 300, 400, 900, 700],
    product2: [500, 100, 200, 300, 200, 300, 500, 400, 200, 100, 500, 600]
  },
  2: {
    product1: [800, 300, 350, 220, 310, 450, 450, 250, 340, 420, 850, 850],
    product2: [480, 150, 220, 280, 210, 320, 520, 390, 220, 110, 550, 680]
  }
};

function updateCharts() {
  document.querySelectorAll('.profit-chart').forEach(element => {
    const profitType = element.getAttribute('data-profit');
    const productData = profitData[profitType];

    if (productData) {
      createChart(productData.product1, productData.product2, element);
    }
  });
}

const resizeObserver = new ResizeObserver(updateCharts);

document.querySelectorAll('.profit-chart').forEach(element => {
  resizeObserver.observe(element);
});

window.addEventListener('load', updateCharts);
window.addEventListener('resize', updateCharts);

  //-------------profit-chart-----------------

  let chartInstance = null; 

  function createReferralChart(data, labels, yTicksMobile) {
      const chartCanvas = document.querySelector('.referral-chart').getContext('2d');
  
      const gradientBar = chartCanvas.createLinearGradient(0, 0, 0, 400);
      gradientBar.addColorStop(0, '#914fea');
      gradientBar.addColorStop(1, '#3b2ec6');

      const isMobile = window.innerWidth < 576;
      const barThickness = isMobile ? 16 : 30;
  
      const chartData = {
          labels: labels,
          datasets: [
              {
                  label: 'Сумма оборота',
                  data: data,
                  backgroundColor: gradientBar,
                  borderRadius: 2,
                  barThickness: barThickness,
                  barPercentage: 0.7,
                  categoryPercentage: 0.5,
              }
          ]
      };
  
      const chartOptions = {
          layout: {
              padding: {
                  top: 51,
                  right: isMobile ? 12 : 17,
                  bottom: 14,
                  left: isMobile ? 12 : 17,
              }
          },
          scales: {
              x: {
                  grid: {
                      display: false
                  },
                  ticks: {
                      font: {
                          family: 'var(--font-family)',
                          weight: '400',
                          size: 10,
                          lineHeight: 1.1,
                      },
                      color: '#6C6E79',
                      textAlign: 'center',
                      letterSpacing: '-0.01em',
                      maxRotation: 0,
                      minRotation: 0,
                      callback: function(value) {
                          const label = this.getLabelForValue(value);
                          return label.split(' ');
                      }
                  }
              },
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#ebebeb',
                      borderDash: [3, 3]
                  },
                  ticks: {
                      font: {
                          family: 'var(--font-family)',
                          weight: '400',
                          size: 10,
                          lineHeight: 1.1,
                      },
                      color: '#6C6E79',
                      letterSpacing: '-0.01em',
                      callback: function(value) {
                          if (value === 0) {
                              return '0';
                          }
  
                          if (window.innerWidth < 576) {
                              return yTicksMobile[value] || '';
                          } else {
                              return '$' + value;
                          }
                      },
                      stepSize: 20000,
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              },
              customCanvasBackgroundColor: {
                  id: 'customCanvasBackgroundColor',
                  beforeDraw: (chart) => {
                      const ctx = chart.canvas.getContext('2d');
                      ctx.save();
                      ctx.font = '400 10px var(--font-family)';
                      ctx.fillStyle = '#CECFD2';
                      ctx.textAlign = 'left';
                      ctx.textBaseline = 'top';
                      ctx.lineHeight = 1.1;
                      ctx.letterSpacing = '-0.01em';
  
                      ctx.fillText('Сумма оборота', isMobile ? 12 : 17, 16);
                      ctx.restore();
                  }
              }
          }
      };
  
      const chartElement = document.querySelector('.referral-chart');
      chartElement.style.border = '0.50px solid #E6E6E8';
      chartElement.style.borderRadius = '8px';

      if (chartInstance) {
          chartInstance.data = chartData;
          chartInstance.options = chartOptions; 
          chartInstance.update();
      } else {
          chartInstance = new Chart(chartCanvas, {
              type: 'bar',
              data: chartData,
              options: chartOptions,
              plugins: [chartOptions.plugins.customCanvasBackgroundColor]
          });
      }
  }
  
  const referralData = [80000, 60000, 30000, 15000, 5000];
  const referralLabels = ['Petr Olegov', 'Maria Black', 'Nikita Kirov', 'Stanislav 129', 'Egor Maslov'];
  const referralDataMobile = { 80000: '80k', 60000: '60k', 40000: '40k', 20000: '20k' };
  
  function initChart() {
      if (document.querySelector('.referral-chart')) {
          createReferralChart(referralData, referralLabels, referralDataMobile);
      }
  }
  
  window.addEventListener('DOMContentLoaded', function() {
      initChart();
  });
  
  window.addEventListener('resize', function() {
    if (document.querySelector('.referral-chart')) {
      createReferralChart(referralData, referralLabels, referralDataMobile); 
    }
  });
  