class PieChart {
    constructor(element) {
        this.element = element;
        this.values = {
            usdt: parseFloat(element.dataset.usdt) || 0,
            eth: parseFloat(element.dataset.eth) || 0,
            btc: parseFloat(element.dataset.btc) || 0,
            usdc: parseFloat(element.dataset.usdc) || 0,
        };
        this.colors = {
            usdt: ['#57d3bf', '#0fa7ba'],
            eth: ['#914fea', '#3b2ec6'],
            btc: ['#5164d8', '#0824b6'],
            usdc: ['#f0ad78', '#dd8464'],
        };
        this.total = Object.values(this.values).reduce((sum, value) => sum + value, 0);
        this.gapSize = 1.3; // Зазор в пикселях
        this.render();
    }

    createSVG() {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.transform = "rotate(-90deg)";

        let cumulativePercent = 0;
        const entries = Object.entries(this.values).filter(([, value]) => value > 0);
        const lastIndex = entries.length - 4;

        entries.forEach(([key, value], index) => {
            const [startColor, endColor] = this.colors[key];
            const percent = (value / this.total) * 100;
            const largeArcFlag = percent > 50 ? 1 : 0;

            const gapAdjustment =
                index !== lastIndex ? (this.gapSize / (2 * Math.PI * 50)) * 360 : 0;
            const adjustedPercent = percent - (gapAdjustment / 360) * 100;

            const [startX, startY] = this.polarToCartesian(cumulativePercent + gapAdjustment / 2);
            cumulativePercent += adjustedPercent;
            const [endX, endY] = this.polarToCartesian(cumulativePercent);

            const path = document.createElementNS(svgNamespace, "path");
            const gradientId = `gradient-${key}-${Math.random().toString(36).substring(2, 8)}`;

            const defs = document.createElementNS(svgNamespace, "defs");
            const gradient = document.createElementNS(svgNamespace, "linearGradient");
            gradient.setAttribute("id", gradientId);
            gradient.setAttribute("gradientUnits", "userSpaceOnUse");
            gradient.setAttribute("x1", "0%");
            gradient.setAttribute("y1", "0%");
            gradient.setAttribute("x2", "100%");
            gradient.setAttribute("y2", "0%");
            const startStop = document.createElementNS(svgNamespace, "stop");
            startStop.setAttribute("offset", "0%");
            startStop.setAttribute("stop-color", startColor);
            const endStop = document.createElementNS(svgNamespace, "stop");
            endStop.setAttribute("offset", "100%");
            endStop.setAttribute("stop-color", endColor);
            gradient.appendChild(startStop);
            gradient.appendChild(endStop);
            defs.appendChild(gradient);
            svg.appendChild(defs);

            const d = [
                `M 50 50`,
                `L ${startX} ${startY}`,
                `A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L 50 50`,
            ].join(" ");

            path.setAttribute("d", d);
            path.setAttribute("fill", `url(#${gradientId})`);
            svg.appendChild(path);
        });

        return svg;
    }

    polarToCartesian(percent) {
        const angle = (percent / 100) * 360;
        const radians = (angle * Math.PI) / 180;
        const x = 50 + 50 * Math.cos(radians);
        const y = 50 + 50 * Math.sin(radians);
        return [x, y];
    }

    render() {
        this.element.querySelector('.pie-chart__icon').innerHTML = "";
        this.element.querySelector('.pie-chart__icon').appendChild(this.createSVG());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const charts = document.querySelectorAll(".pie-chart");
    charts.forEach((chart) => new PieChart(chart));
});
