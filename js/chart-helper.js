/*!
 * ?????? - ?CSS?????Chart.js
 * ????(doughnut)????(bar)
 */
(function() {
  class SimpleChart {
    constructor(ctx, config) {
      this.canvas = ctx.canvas;
      this.config = config;
      this.render();
    }
    render() {
      const container = document.createElement('div');
      container.className = 'simple-chart-container';
      container.style.cssText = 'width:100%;max-width:500px;margin:0 auto;';

      if (this.config.type === 'doughnut') {
        this._renderDoughnut(container);
      } else if (this.config.type === 'bar') {
        this._renderBar(container);
      }

      this.canvas.parentNode.replaceChild(container, this.canvas);
    }
    _renderDoughnut(container) {
      const { labels, datasets } = this.config.data;
      const data = datasets[0].data;
      const colors = datasets[0].backgroundColor;
      const total = data.reduce((a, b) => a + b, 0);

      // Legend
      const legend = document.createElement('div');
      legend.className = 'chart-legend';
      legend.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:16px;';
      data.forEach((val, i) => {
        const pct = Math.round(val / total * 100);
        const item = document.createElement('span');
        item.style.cssText = `font-size:13px;color:#555;display:flex;align-items:center;gap:4px;`;
        item.innerHTML = `<i style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${colors[i]};"></i>${labels[i]} ${pct}%`;
        legend.appendChild(item);
      });
      container.appendChild(legend);

      // SVG doughnut
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 200 200');
      svg.style.cssText = 'width:100%;max-width:280px;display:block;margin:0 auto;';
      
      const r = 70, cx = 100, cy = 100, strokeW = 30;
      const circumference = 2 * Math.PI * r;
      let offset = 0;

      data.forEach((val, i) => {
        const dashLen = val / total * circumference;
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', colors[i]);
        circle.setAttribute('stroke-width', strokeW);
        circle.setAttribute('stroke-dasharray', `${dashLen} ${circumference - dashLen}`);
        circle.setAttribute('stroke-dashoffset', -offset);
        circle.setAttribute('transform', 'rotate(-90 100 100)');
        circle.style.transition = 'stroke-dasharray 1s ease';
        svg.appendChild(circle);
        offset += dashLen;
      });

      // Center text
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', cx);
      text.setAttribute('y', cy);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', '0.35em');
      text.setAttribute('fill', '#8b2323');
      text.setAttribute('font-size', '14');
      text.setAttribute('font-weight', 'bold');
      text.textContent = '100%';
      svg.appendChild(text);

      container.appendChild(svg);
    }
    _renderBar(container) {
      const { labels, datasets } = this.config.data;
      const data = datasets[0].data;
      const maxVal = Math.max(...data);
      const label = datasets[0].label || '';

      // Title
      if (label) {
        const title = document.createElement('div');
        title.style.cssText = 'text-align:center;font-size:13px;color:#888;margin-bottom:12px;';
        title.textContent = label;
        container.appendChild(title);
      }

      const chart = document.createElement('div');
      chart.style.cssText = 'display:flex;align-items:flex-end;justify-content:space-around;height:220px;padding:0 10px 30px;border-bottom:2px solid #ddd;position:relative;';

      data.forEach((val, i) => {
        const col = document.createElement('div');
        col.style.cssText = 'display:flex;flex-direction:column;align-items:center;flex:1;';

        const barWrap = document.createElement('div');
        barWrap.style.cssText = 'width:100%;display:flex;align-items:flex-end;justify-content:center;height:100%;';

        const pct = val / maxVal * 100;
        const bar = document.createElement('div');
        bar.style.cssText = `width:60%;max-width:60px;height:0;background:linear-gradient(180deg,#c73e3e,#8b2323);border-radius:6px 6px 0 0;transition:height 1s ease;min-height:4px;`;
        barWrap.appendChild(bar);
        
        // Animate on load
        setTimeout(() => { bar.style.height = pct + '%'; }, 100);

        const valLabel = document.createElement('span');
        valLabel.style.cssText = 'font-size:14px;font-weight:bold;color:#8b2323;margin-top:6px;';
        valLabel.textContent = val + '%';

        const nameLabel = document.createElement('span');
        nameLabel.style.cssText = 'font-size:12px;color:#666;margin-top:4px;text-align:center;';
        nameLabel.textContent = labels[i];

        col.appendChild(barWrap);
        col.appendChild(valLabel);
        col.appendChild(nameLabel);
        chart.appendChild(col);
      });

      container.appendChild(chart);

      // Y axis markers
      const markers = document.createElement('div');
      markers.style.cssText = 'display:flex;justify-content:space-between;padding:0 10px;font-size:11px;color:#999;';
      for (let i = 0; i <= 4; i++) {
        const m = document.createElement('span');
        m.textContent = Math.round(maxVal * (4-i) / 4);
        markers.appendChild(m);
      }
      container.appendChild(markers);
    }
  }
  window.Chart = SimpleChart;
})();
