const Toultip = {
  init: (showTimeout = 1000, preventOverflow = true) => {
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
        if (preventOverflow && e.pageX + this.box.offsetWidth > window.innerWidth)
          this.box.style.left = window.innerWidth - this.box.offsetWidth - 15 + 'px';
        else
          this.box.style.left = e.pageX + 'px';

        if (preventOverflow && e.pageY + this.box.offsetHeight > window.innerHeight)
          this.box.style.top = window.innerHeight - this.box.offsetHeight - 15 + 'px';
        else
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
