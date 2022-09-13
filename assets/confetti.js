const Confetti = {
  confettis: [],
  confettisCount : 300,
  gravity : 1,
  terminalVelocity : 5,
  drag : 0.075,
  colors : [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'darkyellow' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'darkpink' },
  { front: 'purple', back: 'darkpurple' },
  { front: 'turquoise', back: 'darkturquoise' }],
  canvas: {},
  cx: "",
  cy: "",
  ctx: "",
  init: function() {
    Confetti.canvas = document.getElementById("canvas")
    Confetti.canvas.style.display = 'block'
    Confetti.ctx = canvas.getContext("2d")
    Confetti.canvas.width = window.innerWidth
    Confetti.canvas.height = window.innerHeight
    Confetti.cx = Confetti.ctx.canvas.width / 2
    Confetti.cy = Confetti.ctx.canvas.height / 2
    Confetti.canvas.style.display = 'none'
  },

  resizeCanvas : () => {
    Confetti.canvas.style.display = 'block'
    Confetti.canvas.width = window.innerWidth
    Confetti.canvas.height = window.innerHeight
    Confetti.cx = Confetti.ctx.canvas.width / 2
    Confetti.cy = Confetti.ctx.canvas.height / 2
    Confetti.canvas.style.display = 'none'
  },

  randomRange : function(min, max){ return Math.random() * (max - min) + min},

  initConfetti : function() {
    Confetti.canvas.style.display = 'block'
    for (let i = 0; i < Confetti.confettisCount; i++) {
      Confetti.confettis.push({
        color: Confetti.colors[Math.floor(Confetti.randomRange(0, Confetti.colors.length))],
        dimensions: {
          x: Confetti.randomRange(10, 20),
          y: Confetti.randomRange(10, 30) },
  
        position: {
          x: Confetti.randomRange(0, Confetti.canvas.width),
          y: Confetti.canvas.height - 1 },
  
        rotation: Confetti.randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1 },
  
        velocity: {
          x: Confetti.randomRange(-25, 25),
          y: Confetti.randomRange(0, -50) } })
    }
    setTimeout(
      function() {
        Confetti.canvas.style.display = 'none'
      }, (Confetti.gravity * 2500));
  },

  render: () => {
    Confetti.ctx.clearRect(0, 0, canvas.width, canvas.height)
    Confetti.confettis.forEach((confetto, index) => {
      let width = confetto.dimensions.x * confetto.scale.x
      let height = confetto.dimensions.y * confetto.scale.y
  
      // Move canvas to position and rotate
      Confetti.ctx.translate(confetto.position.x, confetto.position.y)
      Confetti.ctx.rotate(confetto.rotation)
  
      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * Confetti.drag
      confetto.velocity.y = Math.min(confetto.velocity.y + Confetti.gravity, Confetti.terminalVelocity)
      confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
  
      // Set position
      confetto.position.x += confetto.velocity.x
      confetto.position.y += confetto.velocity.y
  
      // Delete confettis when out of frame
      if (confetto.position.y >= canvas.height) Confetti.confettis.splice(index, 1)
  
      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0
      if (confetto.position.x < 0) confetto.position.x = canvas.width
  
      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1)
      Confetti.ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
  
      // Draw confettis
      Confetti.ctx.fillRect(-width / 2, -height / 2, width, height)
  
      // Reset transform matrix
      Confetti.ctx.setTransform(1, 0, 0, 1, 0, 0)
    })
    window.requestAnimationFrame(Confetti.render)
  }
}
