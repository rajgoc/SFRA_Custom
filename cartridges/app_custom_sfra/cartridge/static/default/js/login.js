/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./cartridges/app_custom_sfra/cartridge/client/default/js/login/login.js":
/*!*******************************************************************************!*\
  !*** ./cartridges/app_custom_sfra/cartridge/client/default/js/login/login.js ***!
  \*******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var formValidation = __webpack_require__(/*! base/components/formValidation */ "./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/formValidation.js");
var createErrorNotification = __webpack_require__(/*! base/components/errorNotification */ "./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/errorNotification.js");
module.exports = {
  login: function login() {
    $('form.login').submit(function (e) {
      var form = $(this);
      e.preventDefault();
      var url = form.attr('action');
      form.spinner().start();
      $('form.login').trigger('login:submit', e);
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: form.serialize(),
        success: function success(data) {
          form.spinner().stop();
          if (!data.success) {
            formValidation(form, data);
            $('form.login').trigger('login:error', data);
          } else {
            $('form.login').trigger('login:success', data);
            location.href = data.redirectUrl;
          }
        },
        error: function error(data) {
          if (data.responseJSON.redirectUrl) {
            window.location.href = data.responseJSON.redirectUrl;
          } else {
            $('form.login').trigger('login:error', data);
            form.spinner().stop();
          }
        }
      });
      return false;
    });
  },
  register: function register() {
    $('form.registration').submit(function (e) {
      var form = $(this);
      e.preventDefault();
      var url = form.attr('action');
      form.spinner().start();
      $('form.registration').trigger('login:register', e);
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: form.serialize(),
        success: function success(data) {
          form.spinner().stop();
          if (!data.success) {
            $('form.registration').trigger('login:register:error', data);
            formValidation(form, data);
          } else {
            $('form.registration').trigger('login:register:success', data);
            location.href = data.redirectUrl;
          }
        },
        error: function error(err) {
          if (err.responseJSON.redirectUrl) {
            window.location.href = err.responseJSON.redirectUrl;
          } else {
            createErrorNotification($('.error-messaging'), err.responseJSON.errorMessage);
          }
          form.spinner().stop();
        }
      });
      return false;
    });

    // Custom Code Start
    $(window).on("load", function () {
      $("#USStates").hide();
      $("#CAStates").hide();
      ;
    });
    $('#addressCountry').change(function (e) {
      var country = $(this).val();
      switch (country) {
        case "US":
          $("#USStates").show();
          $("#CAStates").hide();
          break;
        case "CA":
          $("#USStates").hide();
          $("#CAStates").show();
          break;
        default:
          $("#USStates").hide();
          $("#CAStates").hide();
          break;
      }
    });
    // Custom Code End
  },

  resetPassword: function resetPassword() {
    $('.reset-password-form').submit(function (e) {
      var form = $(this);
      e.preventDefault();
      var url = form.attr('action');
      form.spinner().start();
      $('.reset-password-form').trigger('login:register', e);
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: form.serialize(),
        success: function success(data) {
          form.spinner().stop();
          if (!data.success) {
            formValidation(form, data);
          } else {
            $('.request-password-title').text(data.receivedMsgHeading);
            $('.request-password-body').empty().append('<p>' + data.receivedMsgBody + '</p>');
            if (!data.mobile) {
              $('#submitEmailButton').text(data.buttonText).attr('data-dismiss', 'modal');
            } else {
              $('.send-email-btn').empty().html('<a href="' + data.returnUrl + '" class="btn btn-primary btn-block">' + data.buttonText + '</a>');
            }
          }
        },
        error: function error() {
          form.spinner().stop();
        }
      });
      return false;
    });
  },
  clearResetForm: function clearResetForm() {
    $('#login .modal').on('hidden.bs.modal', function () {
      $('#reset-password-email').val('');
      $('.modal-dialog .form-control.is-invalid').removeClass('is-invalid');
    });
  }
};

/***/ }),

/***/ "./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/errorNotification.js":
/*!*************************************************************************************************************************************************!*\
  !*** ./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/errorNotification.js ***!
  \*************************************************************************************************************************************************/
/***/ (function(module) {



module.exports = function (element, message) {
  var errorHtml = '<div class="alert alert-danger alert-dismissible ' + 'fade show" role="alert">' + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' + message + '</div>';
  $(element).append(errorHtml);
};

/***/ }),

/***/ "./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/formValidation.js":
/*!**********************************************************************************************************************************************!*\
  !*** ./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/formValidation.js ***!
  \**********************************************************************************************************************************************/
/***/ (function(module) {



/**
 * Remove all validation. Should be called every time before revalidating form
 * @param {element} form - Form to be cleared
 * @returns {void}
 */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function clearFormErrors(form) {
  $(form).find('.form-control.is-invalid').removeClass('is-invalid');
}
module.exports = function (formElement, payload) {
  // clear form validation first
  clearFormErrors(formElement);
  $('.alert', formElement).remove();
  if (_typeof(payload) === 'object' && payload.fields) {
    Object.keys(payload.fields).forEach(function (key) {
      if (payload.fields[key]) {
        var feedbackElement = $(formElement).find('[name="' + key + '"]').parent().children('.invalid-feedback');
        if (feedbackElement.length > 0) {
          if (Array.isArray(payload[key])) {
            feedbackElement.html(payload.fields[key].join('<br/>'));
          } else {
            feedbackElement.html(payload.fields[key]);
          }
          feedbackElement.siblings('.form-control').addClass('is-invalid');
        }
      }
    });
  }
  if (payload && payload.error) {
    var form = $(formElement).prop('tagName') === 'FORM' ? $(formElement) : $(formElement).parents('form');
    form.prepend('<div class="alert alert-danger" role="alert">' + payload.error.join('<br/>') + '</div>');
  }
};

/***/ }),

/***/ "./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/util.js":
/*!*************************************************************************************************************************!*\
  !*** ./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/util.js ***!
  \*************************************************************************************************************************/
/***/ (function(module) {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
module.exports = function (include) {
  if (typeof include === 'function') {
    include();
  } else if (_typeof(include) === 'object') {
    Object.keys(include).forEach(function (key) {
      if (typeof include[key] === 'function') {
        include[key]();
      }
    });
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************************************************************!*\
  !*** ./cartridges/app_custom_sfra/cartridge/client/default/js/login.js ***!
  \*************************************************************************/


var processInclude = __webpack_require__(/*! base/util */ "./cartridges/storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/util.js");
$(document).ready(function () {
  processInclude(__webpack_require__(/*! ./login/login */ "./cartridges/app_custom_sfra/cartridge/client/default/js/login/login.js"));
});
}();
/******/ })()
;
//# sourceMappingURL=login.js.map