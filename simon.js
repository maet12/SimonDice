
  const niveles = 15
  let teclas = generarTeclas(niveles)
  const $facil = document.getElementById('facil')
  const $medio = document.getElementById('medio')
  const $dificil = document.getElementById('dificil')

  $facil.addEventListener("click", facil)
  $medio.addEventListener("click", medio)
  $dificil.addEventListener("click", dificil)

  function facil() {
    cambiarPantallas()
    siguienteNivel(0,1750)
  }

  function medio() {
    cambiarPantallas()
    siguienteNivel(0,1250)
  }

  function dificil() {
    cambiarPantallas()
    siguienteNivel(0,750)
  }


  function cambiarPantallas() {
    const $keyboard = document.getElementById('keyboard')
    const $pantallaInicial = document.getElementById('pantalla-inicial')
    $keyboard.classList.toggle('desactiva-pantalla')
    $pantallaInicial.classList.toggle('desactiva-pantalla')
  }

  function siguienteNivel(nivelActual, velocidad){
    if(nivelActual == niveles){
      return swal({
        title: 'Ganaste!',
        type: 'success'
      }).catch(swal.noop)
    }

    swal({
      timer: 1000,
      title: `Nivel ${nivelActual+1} / ${niveles}`,
      showConfirmButton: false
    }).catch(swal.noop)

    for (let i = 0; i <= nivelActual; i++) {
      setTimeout(() => activate(teclas[i]),velocidad*(i+1)+500)
    }

    let i = 0
    let teclaActual = teclas[i]
    window.addEventListener('keydown', onkeydown)
    //window.addEventListener('click', onkeydown)

    function onkeydown(ev) {
      if(ev.keyCode == teclaActual){
        activate(teclaActual, {success: true})
        i++
        if (i>nivelActual) {
          window.removeEventListener('keydown', onkeydown)
          //window.removeEventListener('click', onkeydown)
          setTimeout(() => siguienteNivel(i,velocidad),1500)
        }
        teclaActual = teclas[i]
      }else {
        window.removeEventListener('keydown', onkeydown)
        //window.removeEventListener('click', onkeydown)
        activate(ev.keyCode, {fail: true})
        setTimeout(function (){
          swal({
            title: 'Perdiste',
            text: '¿Quieres jugar de nuevo?',
            showCancelButton : true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then(function (){
            teclas = generarTeclas(niveles)
            siguienteNivel(0)
          }, function () {
            const $keyboard = document.getElementById('keyboard')
            const $pantallaInicial = document.getElementById('pantalla-inicial')
            $keyboard.classList.toggle('desactiva-pantalla')
            $pantallaInicial.classList.toggle('desactiva-pantalla')
          })
        },1000)

      }
    }
  }

  function generarTeclaAleatoria() {
    const min = 65
    const max = 90
    return Math.round(Math.random() * (max-min) + min)
  }

  function generarTeclas(niveles) {
    return new Array(niveles).fill(0).map(generarTeclaAleatoria)
  }

  function getElementByKeyCode(keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`)
  }

  function activate(keyCode, opts={ }) {
    const el = getElementByKeyCode(keyCode)
    if(el){
      el.classList.add('active')
      if(opts.success){
        el.classList.add('success')
      }else if (opts.fail) {
        el.classList.add('fail')
      }
      setTimeout(() => desactivate(el), 500);
    }
  }

  function desactivate(el) {
    el.className = 'key'
  }
