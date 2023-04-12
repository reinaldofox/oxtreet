import './Messages.css'
import closeIcon from '../assets/img/close-icon.svg'

const tipos = {
  alert: {
    head: 'Atenção!',
    text: 'Mensagem de atenção!',
    bg_dark: 'bg-alert-dark',
    bg_ligth: 'bg-alert-ligth',
  },
  error: {
    head: 'Erro!',
    text: 'Ocorreu um erro inesperado!',
    bg_dark: 'bg-error-dark',
    bg_ligth: 'bg-error-ligth',

  },
  info: {
    head: 'Informação!',
    text: 'Mensagem de informação',
    bg_dark: 'bg-info-dark',
    bg_ligth: 'bg-info-ligth',

  },
  success: {
    head: 'Sucesso!',
    text: 'Operação realizada com sucesso!',
    bg_dark: 'bg-success-dark',
    bg_ligth: 'bg-success-ligth',
  },
}

class Message {
  message = ''
  msgDiv = ''
  delay = undefined
  button = undefined

  setMessage = (msg = this.tipo.text) => {
    this.message = `
    <div class='message_icon ${this.tipo.bg_dark}'>${this.tipo.head}</div>
    <div class='message_text ${this.tipo.bg_ligth}'>${msg}</div>
    <div id='closeDiv' class='message_close ${this.tipo.bg_dark}' title='Fechar' >
      <img src='${closeIcon}' fill='#fff' >    
    </div>
    `
  }

  /**
   * Exibe uma mensagem no topo da página;
   * @param {string} tipo: alert, info, error, success
   * @param {string} [msg]
   */
  show = (tipo, msg) => {
    this.tipo = tipos[tipo]
    this.setMessage(msg)
    this.msgDiv = document.getElementById('messages')
    this.msgDiv.innerHTML = this.message
    this.close()
    this.msgDiv?.classList.add('message_show')
    const glow = setInterval(() => this.msgDiv.childNodes[1].classList.toggle('glow'), 250)
    this.button = document.getElementById('closeDiv')
    this.button.addEventListener('click', this.close)
    this.delay = setTimeout(() => {
      clearInterval(glow)
      this.close()
    }, 5000)
  }

  close = () => {
    this.button?.removeEventListener('click', this.close)
    this.msgDiv?.classList.remove('message_show')
    clearTimeout(this.delay)
    this.message = ''
  }
}



export default new Message()