class ValidateForm {
  constructor() {
    this.form = document.querySelector('.form');
    this.password = this.form.querySelector('.password');
    this.repeatPassword = this.form.querySelector('.repeat-password');
    this.user = this.form.querySelector('.name').focus();
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    })

    document.querySelector('.show-password input').addEventListener('click', () => {
      if (this.password.type === 'password' && this.repeatPassword.type === 'password') {
        this.password.type = 'text';
        this.repeatPassword.type = 'text';

      } else if (this.password.type === 'text' && this.repeatPassword.type === 'text') {
        this.password.type = 'password';
        this.repeatPassword.type = 'password';
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const validFields = this.fieldsAreValid();
    const validPasswords = this.passwordsAreaValid();

    if (validFields && validPasswords) {
      setTimeout(() => {
        alert('Formulário enviado com sucesso!');
      }, 600);
    }
  }

  fieldsAreValid() {
    let valid = true;

    this.form.querySelectorAll('.error-text').forEach(error => error.remove());
    
    this.form.querySelectorAll('.validate').forEach(field => {
      if (field.value.length === 0) {
        const fieldId = field.placeholder;
        this.createError(field, `O campo de <strong>${fieldId}</strong> não pode ficar em branco`);
        valid = false;
      }

      if (field.classList.contains('email')) {
        if (!this.validEmail(field)) valid = false;
      }

      if (field.classList.contains('user')) {
        if (!this.validUser(field)) valid = false;
      }
    })

    return valid;
  }

  validEmail(field) {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if (!emailRegex.test(field.value)) {
      this.createError(field, 'Este tipo de <strong>Email</strong> é inválido');
      return false;
    }
    
    return true;
  }

  validUser(field) {
    const userRegex = /^[A-Za-z0-9-]+$/;
    let valid = true;

    if (field.value.length < 3 || field.value.length > 12) {
      this.createError(field, 'O <strong>Usuário</strong> deve conter de 3 a 12 caracteres no máximo');
      valid = false;
    }

    if (!userRegex.test(field.value)) {
      this.createError(field, 'O <strong>Usuário</strong> deve conter apenas letras e/ou números');
      valid = false;
    }

    return valid;
  }

  passwordsAreaValid() {
    let valid = true;

    if (this.password.value !== this.repeatPassword.value) {
      this.createError(this.password, 'Os campos <strong>Senha</strong> e <strong>Repetir Senha</strong> devem ser iguais.')
      valid = false;
    }

    if (this.password.value.length < 6 || this.password.value.length > 12) {
      this.createError(this.password, 'A <strong>Senha</strong> deve conter de 6 a 12 caracteres no máximo');
      valid = false;
    }

    return valid;
  }

  createError(field, msg) {
    const div = document.createElement('span');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div); 
  }
}

const validate = new ValidateForm();