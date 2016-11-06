import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
let $divForms = null;
let modalAnimateTime = 300;
let msgAnimateTime = 150;
let msgShowTime = 2000;
class Login extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $divForms = $(this.refs.divForms);
  }
  render(){
    return(
      <div className="col-sm-push-3 col-sm-6" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
      	<div className="modal-dialog">
  			<div className="modal-content">
  			<div className="modal-header" className="text-center">
  				<img className="img-circle" id="img_logo" src="http://bootsnipp.com/img/logo.jpg" />
  			</div>
        <div id="div-forms" ref="divForms" >
          <h2 className='text-center'>Registro y Login</h2>
          { /* Begin # Login Form */ }
          <form id="login-form" ref="loginForm">
            <div className="modal-body">
              <div id="div-login-msg">
                <div id="icon-login-msg" className="glyphicon glyphicon-chevron-right"></div>
                <span id="text-login-msg">Type your username and password.</span>
              </div>
              <input id="login_username" className="form-control" type="text" placeholder="Username (type ERROR for error effect)" required />
              <input id="login_password" className="form-control" type="password" placeholder="Password" required />
            
            </div>
            <div className="modal-footer">
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
              </div>
              <div>
                <button id="login_register_btn" type="button" className="btn btn-link" onClick={ () => {modalAnimate(this.refs.loginForm, this.refs.registerForm)}}>Register</button>
              </div>
            </div>
          </form>
          { /* End # Login Form */ }
          { /* Begin | Register Form */ }
          <form id="register-form" ref="registerForm" style={{display:'none'}}>
            <div className="modal-body">
              <div id="div-register-msg">
                <div id="icon-register-msg" className="glyphicon glyphicon-chevron-right"></div>
                <span id="text-register-msg">Register an account.</span>
              </div>
              <input id="register_username" className="form-control" type="text" placeholder="Username (type ERROR for error effect)" required />
                <input id="register_email" className="form-control" type="text" placeholder="E-Mail" required />
                <input id="register_password" className="form-control" type="password" placeholder="Password" required />
            </div>
            <div className="modal-footer">
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
              </div>
              <div>
                <button id="register_login_btn" type="button" className="btn btn-link" onClick={ () => {modalAnimate(this.refs.registerForm,this.refs.loginForm)} }>Log In</button>
              </div>
            </div>
          </form>
          {/* End | Register Form */}
        </div>
      </div>
    </div>
    </div>
  )}

};

$("form").submit(function (event) {
   event.preventDefault();
   switch(this.id) {
       case "login-form":
           let $lg_username=$('#login_username').val();
           let $lg_password=$('#login_password').val();
           if ($lg_username == "ERROR") {
               msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
           } else {
               msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
           }
           return false;
           break;
       case "lost-form":
           let $ls_email=$('#lost_email').val();
           if ($ls_email == "ERROR") {
               msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
           } else {
               msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
           }
           return false;
           break;
       case "register-form":
           let $rg_username=$('#register_username').val();
           let $rg_email=$('#register_email').val();
           let $rg_password=$('#register_password').val();
           if ($rg_username == "ERROR") {
               msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
           } else {
               msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
           }
           return false;
           break;
       default:
           return false;
   }
   return false;
});



function msgFade ($msgId, $msgText) {
   $msgId.fadeOut($msgAnimateTime, function() {
       $(this).text($msgText).fadeIn($msgAnimateTime);
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
 }, $msgShowTime);
}

function modalAnimate (oldForm, newForm) {
   let $oldForm = $(oldForm);
   let $newForm = $(newForm);
   let $oldH = $oldForm.height();
   let $newH = $newForm.height()+ 70;
   $divForms.css("height",$oldH);
   $oldForm.fadeToggle(modalAnimateTime, function(){
       $divForms.animate({height: $newH}, modalAnimateTime, function(){
           $newForm.fadeToggle(modalAnimateTime);
       });
   });
}

export default Login;
