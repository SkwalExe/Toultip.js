const Toultip = {
  init: (showTimeout = 1000) => {
    this.showTimeout = showTimeout;
    this.timeouts = [];
    this.box = document.createElement('div');
    this.box.classList.add('toultip');
    document.body.appendChild(this.box);

    document.querySelectorAll('*[toultip]').forEach(el => {
      el.addEventListener('mouseover', (e) => {
        this.timeouts.push(
          setTimeout(() => {
            let content = el.getAttribute('toultip');
            this.box.innerText = content;
            this.box.style.opacity = '1'
          }, this.showTimeout)
        )
      });
      el.addEventListener('mousemove', e => {
        this.box.style.left = e.pageX + 'px';
        this.box.style.top = e.pageY + 'px';
      })
      el.addEventListener('mouseout', (e) => {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.box.style.opacity = '0'
      });
    })
  }
}


if (typeof module !== 'undefined') {
  module.exports = Toultip;
}
