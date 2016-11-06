import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import FaUserSecret from 'react-icons/lib/fa/user-secret'

class Login extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="col-sm-push-3 col-sm-6" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
      	<div className="modal-dialog">
  			<div className="modal-content">
  			<div className="modal-header" className="text-center">
  				<img className="img-circle" id="img_logo" src="http://bootsnipp.com/img/logo.jpg" />
  			</div>
        <div id="div-forms" >
          <h2 className='text-center'>Registro y Login</h2>
          { /* Begin # Login Form */ }
          <form id="login-form">
            <div className="modal-body">
              <div id="div-login-msg">
                <div id="icon-login-msg" className="glyphicon glyphicon-chevron-right"></div>
                <span id="text-login-msg">Type your username and password.</span>
              </div>
              <input id="login_username" className="form-control" type="text" placeholder="Username (type ERROR for error effect)" required />
              <input id="login_password" className="form-control" type="password" placeholder="Password" required />
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Remember me
                  </label>
                </div>
            </div>
            <div className="modal-footer">
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
              </div>
              <div>
                <button id="login_lost_btn" type="button" className="btn btn-link">Lost Password?</button>
                <button id="login_register_btn" type="button" className="btn btn-link">Register</button>
              </div>
            </div>
          </form>
          { /* End # Login Form */ }

          { /* Begin | Lost Password Form */ }
          <form id="lost-form" style={{display:'none'}}>
            <div className="modal-body">
              <div id="div-lost-msg">
                <div id="icon-lost-msg" className="glyphicon glyphicon-chevron-right"></div>
                <span id="text-lost-msg">Type your e-mail.</span>
              </div>
              <input id="lost_email" className="form-control" type="text" placeholder="E-Mail (type ERROR for error effect)" required />
            </div>
            <div className="modal-footer">
              <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Send</button>
              </div>
              <div>
                <button id="lost_login_btn" type="button" className="btn btn-link">Log In</button>
                <button id="lost_register_btn" type="button" className="btn btn-link">Register</button>
              </div>
            </div>
            </form>
            { /* End | Lost Password Form */ }

            { /* Begin | Register Form */ }
            <form id="register-form" style={{display:'none'}}>
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
                  <button id="register_login_btn" type="button" className="btn btn-link">Log In</button>
                  <button id="register_lost_btn" type="button" className="btn btn-link">Lost Password?</button>
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

let $formLogin = $('#login-form');
let $formLost = $('#lost-form');
let $formRegister = $('#register-form');
let $divForms = $('#div-forms');
let $modalAnimateTime = 300;
let $msgAnimateTime = 150;
let $msgShowTime = 2000;

$("form").submit(function () {
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
/*
$('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
$('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
$('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
$('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
$('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
$('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });

function modalAnimate ($oldForm, $newForm) {
   let $oldH = $oldForm.height();
   let $newH = $newForm.height();
   $divForms.css("height",$oldH);
   $oldForm.fadeToggle($modalAnimateTime, function(){
       $divForms.animate({height: $newH}, $modalAnimateTime, function(){
           $newForm.fadeToggle($modalAnimateTime);
       });
   });
}

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
*/

export default Login;
