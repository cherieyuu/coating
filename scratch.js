function ScratchCard(config) {
  this.config = { // default config
    canvas: null,
    coverColor: 'black',
  }
  Object.assign(this.config, config);
  this.canvas = this.config.canvas;
  this._init();
}

ScratchCard.prototype = {
  constructor: ScratchCard,

  _init: function() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = this.config.coverColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.addEventListener('mousemove', this._scratch.bind(this), { passive: false });
    // destination 涂层 source 未设置 d只有不与s重叠的部分展现，重叠的部分会透明，所以鼠标动的时候与涂层重叠的部分会变透明
    this.ctx.globalCompositeOperation = 'destination-out'; 
  },

  _scratch: function(e) {
    e.preventDefault();
    const endPoint = { x: e.clientX + document.body.scrollLeft, y: e.clientY + document.body.scrollTop }
    if (!this.beginPoint) this.beginPoint = endPoint;
    if (!this.middlePoint) this.middlePoint = endPoint;
    // this._drawLine(this.beginPoint, endPoint);
    // this.beginPoint = endPoint;
    this._drawCurve(this.beginPoint, this.middlePoint, endPoint);
    this.beginPoint = this.middlePoint;
    this.middlePoint = endPoint;
  },
  
  _drawLine: function(beginPoint, endPoint) {    
    with(this.ctx) {
      beginPath();
      moveTo(beginPoint.x, beginPoint.y);
      lineTo(endPoint.x, endPoint.y);
      stroke();
      closePath();
    }
  },

  _drawCurve: function(beginPoint, controlPoint, endPoint) {
    with(this.ctx) {
      beginPath();
      moveTo(beginPoint.x, beginPoint.y);
      quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
      stroke();
      closePath();
    }
  }
}