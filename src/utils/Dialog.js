import closeIcon from '../assets/img/close-icon.svg'
import './Dialog.css'

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

class Dialog {

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
    this.msgDiv = document.getElementById('Dialog')
    this.msgDiv.innerHTML = this.message
    this.close()
    this.msgDiv?.classList.add('message_show')
    const glow = setInterval(() => this.msgDiv.childNodes[1].classList.toggle('glow'), 300)
    this.button = document.getElementById('closeDiv')
    this.button.addEventListener('click', this.close)
    this.delay = setTimeout(() => {
      clearInterval(glow)
      this.close()
    }, 3500)
  }

  brl = (money) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money)
  }

  // FECHA A MENSAGEM
  close = () => {
    this.button?.removeEventListener('click', this.close)
    this.msgDiv?.classList.remove('message_show')
    clearTimeout(this.delay)
    this.message = ''
  }
}

export default new Dialog()

export const meses = {
  nome: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  nomeAbrev: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
}