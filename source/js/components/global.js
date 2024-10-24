const bar = document.querySelectorAll(".progress-bar");

bar &&
  bar.forEach((progressBar) => {
    const steps = progressBar.querySelectorAll(".progress-bar__step");
    const progressText = progressBar.querySelector(".progress-bar__text");

    if (progressBar.classList.contains("progress-bar--balance")) {
     
        steps.forEach((step, index) => {
          if (steps[steps.length - 1].classList.contains("active")) {
            steps.forEach((el) => {
              el.classList.add("hide");
            });
          } else {
            steps.forEach((el) => {
              el.classList.remove("hide");
            });
          }
        });
      }

    if (!progressText) return;

    steps.forEach((step) => {
      if (step.classList.contains("active")) {
        steps.forEach((s) => {
          const stepText = s.querySelector(".progress-bar__text");
          stepText?.classList.remove("active");
        });

        const activeStepText = step.querySelector(".progress-bar__text");
        activeStepText?.classList.add("active");
      }
    });
  });
