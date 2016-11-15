import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import { auth } from '../utils/auth'
import { ARTIST_DASHBOARD, CA_DASHBOARD, AUTH_TYPE, SERVER_URL } from '../utils/constants'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
import SweetAlert from 'sweetalert-react';
import DropzoneComponent from 'react-dropzone-component';

let $divForms = null;
let modalAnimateTime = 300;
let msgAnimateTime = 150;
let msgShowTime = 2000;
const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    postUrl: `${SERVER_URL}/comercial_agent/auth/upload-artist-photo/`,
    showFiletypeIcon: true,
};


class Login extends Component {

  constructor(props){
    super(props);
    let csrf_token = jQuery("#csrf_token").children()[0].value;
    this.state = {
      authText: AUTH_TYPE.REGISTER,
      csrf_token: csrf_token,
      register_photo: null,
      show: false,
      sweetAlertOnConfirm: () => {this.setState({ show: false })},
      sweetAlertTitle: "",
      sweetAlertMessage: "",
      type: "warning",
    };
    this.changeAuth = this.changeAuth.bind(this);
    this.eventHandlers = this.eventHandlers.bind(this);
    this._onLogin = this._onLogin.bind(this);
    this._onRegister = this._onRegister.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentDidMount(){
    $divForms = $(this.refs.divForms);
  }
  changeAuth(){
    if(this.state.authText == AUTH_TYPE.REGISTER){
      this.setState({ authText: AUTH_TYPE.LOGIN });
      modalAnimate(this.state.authText,this.refs.registerForm, this.refs.loginForm);
    }else {
      this.setState({ authText: AUTH_TYPE.REGISTER });
      modalAnimate(this.state.authText,this.refs.loginForm, this.refs.registerForm);
    }
  }
  djsConfig(){ return{
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif",
    maxFiles: 1,
    headers: {
      'X-CSRFToken': this.state.csrf_token,
    },
  }}
  eventHandlers(){
    let self = this;
    return {
    error: (photo,server) => {
      this.setState({ show: true, sweetAlertTitle: "Error al subir la imagen", sweetAlertOnConfirm: () => { this.setState({ show: false }); },  type: "error", sweetAlertMessage: "Contacte al administrador." });
    },
    sending: (file, xhr, formData) => {
      formData.append('X-CSRF-Token', self.state.csrf_token);
      formData.append('X-CSRFToken', self.state.csrf_token);
      formData.append('image', file);
    },
    success: (photo,server) => {
      this.setState({register_photo: server.img_url})
    },
  }}
  _onLogin(event){ this._onSubmit(event) }
  _onRegister(event){ this._onSubmit(event) }
  _onSubmit(event){
    event.preventDefault();
    let username = null; let password  = null; let credentials = null;
    switch(event.currentTarget.id) {
       case "login-form":
           username = this.refs.login_username.value; password = this.refs.login_password.value;
           credentials = { username, password }
           auth.login(credentials,(bool,res)=>{
              if (bool) {
                 setTimeout(() => {
               msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK, redirecting...");
                   if(res.role == "artist"){
                     window.location = `#${ARTIST_DASHBOARD}/${res.id}/convocatorias`;
                   }else {
                     window.location = `#${CA_DASHBOARD}/${res.id}/convocatorias`;
                   }
                 }, 800);
             } else {
               msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
             }
           })
           return false;
           break;
    case "register-form":
       username = this.refs.register_username.value; let email = this.refs.register_email.value; let names = this.refs.register_names.value; let surname = this.refs.register_surname.value; let nickname = this.refs.register_nickname.value; let accountNumber = this.refs.register_accountNumber.value; let city = this.refs.register_city.value; let country = this.refs.register_country.value; let phone = this.refs.register_phone.value; password = this.refs.register_password.value; let confirm_password = this.refs.register_confirm_password.value; let address = this.refs.register_address.value;
       let photo = this.state.register_photo;
       credentials = {address, username , email , names , surname , photo , nickname , accountNumber , city , country , phone , password , confirm_password};
       if ( username && email && names && surname && photo && nickname && accountNumber && city && country && phone && password && confirm_password == password ) {
         auth.register(credentials,(bool)=>{
          if (bool) {
            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK, redirecting...");
            this.setState({
              show: true,
              sweetAlertTitle: "Registro Exitoso",
              sweetAlertOnConfirm: () => {
                this.setState({ show: false });
                window.location = `#`;
              },
              type: "success",
              sweetAlertMessage: "Felicitaciones, ahora inicia sesión."
            });
           } else {
             msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register advertencia, llenar todos los campos");
             this.setState({
               show: true,
               sweetAlertTitle: "Error en el registro",
               sweetAlertOnConfirm: () => {
                 this.setState({ show: false });
               },
               type: "error",
               sweetAlertMessage: "Contacte al administrador."
             });
           }
         })
       } else {
         let warningText = setWarning(credentials);
         this.setState({
           show: true,
           sweetAlertTitle: "Registro Incompleto",
           sweetAlertOnConfirm: () => {
             this.setState({ show: false });
             msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register advertencia, llenar todos los campos");
           },
           type: "warning",
           sweetAlertMessage: warningText
         });
       }
       return false;
       break;
     default:
           return false;
    }
    return false;
  }
  render(){
    return(
        <div className="loginBG">
            <div className="loginBanner"></div>
      <div className="col-sm-push-3 col-sm-6" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
        <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={this.state.sweetAlertOnConfirm}
        />
      	<div className="modal-dialog">
  			<div className="modal-content">
  			<div className="modal-header text-center">
  				<img  id="img_logo" src={require('../../images/logo.png')} />
  			</div>
        <div id="div-forms" ref="divForms" >
          <h2 className='text-center'>Maneja Tu Cuenta</h2>
          <h3 className='text-center btn-link' onClick={ this.changeAuth }>{this.state.authText}</h3>
          { /* Begin # Login Form */ }
          <form onSubmit={this._onLogin} id="login-form" ref="loginForm" noValidate>
            <div className="modal-body">
              <div id="div-login-msg">
                <div id="icon-login-msg" className="glyphicon glyphicon-chevron-right"></div>
                <span id="text-login-msg">Accede con tu usuario y contraseña</span>
              </div>
              <input ref="login_username" id="login_username" className="form-control" type="text" placeholder="Username (type ERROR for error effect)" required />
              <input ref="login_password" id="login_password" className="form-control" type="password" placeholder="Password" required />

            </div>
            <div className="modal-footer">
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
              </div>
              <div>
                <button id="login_register_btn" type="button" className="btn btn-link" onClick={ this.changeAuth }>Ir a Registro</button>
              </div>
            </div>
          </form>
          { /* End # Login Form */ }
          { /* Begin | Register Form */ }
          <form onSubmit={this._onRegister} id="register-form" ref="registerForm" style={{display:'none'}} noValidate>
            <div className="modal-body">
              <div id="div-register-msg">
                <div id="icon-register-msg" className="glyphicon glyphicon-chevron-right"></div>
                <span id="text-register-msg">Crea una cuenta nueva</span>
              </div>
                <input ref="register_username" className="form-control" type="text" placeholder="Nombre de Usuario" required />
                <input ref="register_email" className="form-control" type="text" placeholder="E-Mail" required />
                <input ref="register_names" className="form-control" type="text" placeholder="Nombres" required />
                <input ref="register_surname" className="form-control" type="text" placeholder="Apellidos" required />
                <label>Escoger una foto de perfil</label>
                <DropzoneComponent config={componentConfig}
                       eventHandlers={this.eventHandlers()}
                     djsConfig={this.djsConfig()} />
                <input ref="register_nickname" className="form-control" type="text" placeholder="Nombre Artistico" required />
                <input ref="register_accountNumber" className="form-control" type="number" placeholder="Número de cuenta" required />
                <input ref="register_city" className="form-control" type="text" placeholder="Ciudad" required />
                <input ref="register_country" className="form-control" type="text" placeholder="País" required />
                <input ref="register_address" className="form-control" type="text" placeholder="Dirección" required />
                <input ref="register_phone" className="form-control" type="tel" placeholder="Teléfono" required />
                <input ref="register_password" className="form-control" type="password" placeholder="Contraseña" required />
                <input ref="register_confirm_password" className="form-control" type="password" placeholder="Confirmar Contraseña" required />
            </div>
            <div className="modal-footer">
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
              </div>
              <div>
                <button id="register_login_btn" type="button" className="btn btn-link" onClick={ this.changeAuth }>Log In</button>
              </div>
            </div>
          </form>
          {/* End | Register Form */}
        </div>
      </div>
    </div>
    </div>

        </div>
  )}

};

function msgFade ($msgId, $msgText) {
   $msgId.fadeOut(msgAnimateTime, function() {
       $(this).text($msgText).fadeIn(msgAnimateTime);
   });
}

function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
   let $msgOld = $divTag.text();
   msgFade($textTag, $msgText);
   $divTag.addClass($divClass);
   $iconTag.removeClass("glyphicon-chevron-right");
   $iconTag.addClass($iconClass + " " + $divClass);
   setTimeout(function() {
       msgFade($textTag, $msgOld);
       $divTag.removeClass($divClass);
       $iconTag.addClass("glyphicon-chevron-right");
       $iconTag.removeClass($iconClass + " " + $divClass);
 }, msgShowTime);
}

function modalAnimate (authText, newForm,oldForm) {
   let $oldForm = $(oldForm);
   let $newForm = $(newForm);
   let $oldH = $oldForm.height();
   let extraHeigth = 90;
   let $newH = $newForm.height()+ extraHeigth; // needed for margin top on styles
   $divForms.css("height",$oldH);
   $oldForm.fadeToggle(modalAnimateTime, function(){
       $divForms.animate({height: $newH}, modalAnimateTime, function(){
           $newForm.fadeToggle(modalAnimateTime);
       });
   });
}

function setWarning(obj){
  let warning = [];
  !obj.address ? warning.push(" Dirección") : null ;
  !obj.accountNumber ? warning.push(" # de cuenta") : null ;
  !obj.city ? warning.push(" Cuidad") : null ;
  !obj.country ? warning.push(" País") : null ;
  !obj.email ? warning.push(" Correo Electrónico") : null ;
  !obj.password ? warning.push(" Contraseña") : null ;
  obj.password != obj.confirm_password ? warning.push(" Contreseñas NO coinciden") : null;
  !obj.photo ? warning.push(" Imagen") : null ;
  !obj.names ? warning.push(" Nombres") : null ;
  !obj.nickname ? warning.push(" Nombre Artistico") : null ;
  !obj.phone ? warning.push(" Teléfono") : null ;
  !obj.surname ? warning.push(" Apellidos") : null ;
  !obj.username ? warning.push("Usuario") : null ;
  return `Completar: ${warning.join(",")}`
}
export default Login;
