  // Fonction de désactivation de l'affichage des "tooltips"
        
        function deactivateTooltips() {
        
            var spans = document.getElementsByTagName('span'),
            spansLength = spans.length;
            
            for (var i = 0 ; i < spansLength ; i++) {
                if (spans[i].className == 'tooltip_f' || spans[i].className == 'tooltip_c') {
                    spans[i].style.display = 'none';
                }
            }
        
        }


        // La fonction ci-dessous permet de récupérer la "tooltip" qui correspond à notre input

        function getTooltip(elements) {
        
            while (elements = elements.nextSibling) {
                if (elements.className === 'tooltip_f') {
                    return elements;
                }
            }
            
            return false;
        
        }

		function validateEmail(email) { 
  
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


        // Fonctions de vérification du formulaire, elles renvoient "true" si tout est ok

        var check = {}; // On met toutes nos fonctions dans un objet littéral

  

        check['lastName'] = function(id) {

            var name = document.getElementById(id),
                tooltipStyle = getTooltip(name).style;

				var lab=document.getElementById('lab_lastn');
				var ench=document.getElementById('ench');
            if (name.value.length >= 4) {
                name.className = 'correct';
				lab.style.color = 'rgba(68, 191, 68, 0.75)';
                tooltipStyle.display = 'none';
				ench.style.display='inline-block';
                return true;
            } else {
                name.className = 'incorrect';
				lab.style.color = 'rgba(191, 68, 68, 0.75)';
                tooltipStyle.display = 'inline-block';
				ench.style.display='none';
                return false;
            }

        };

		 check['email'] = function() {
        
            var email = document.getElementById('email'),
                tooltipStyle = getTooltip(email).style;
            				var lab=document.getElementById('email_lab');
				var email_c_1=document.getElementById('email_c_1');

            if (validateEmail(email.value)==true) {
                email.className = 'correct';
				lab.style.color = 'rgba(68, 191, 68, 0.75)';
                tooltipStyle.display = 'none';
				email_c_1.style.display='inline-block';
                return true;
            } else {
                email.className = 'incorrect';
				lab.style.color = 'rgba(191, 68, 68, 0.75)';
                tooltipStyle.display = 'inline-block';
				email_c_1.style.display='none';
                return false;
            }
        
        };
		
     check['pwd1_'] = function() {
        
            var pwd1 = document.getElementById('pwd1_'),
                tooltipStyle = getTooltip(pwd1).style;
            	var lab=document.getElementById('pwd_lab');
				var pwd_c=document.getElementById('pwd_c');


            if (pwd1.value.length >= 6) {
                pwd1.className = 'correct';
				lab.style.color = 'rgba(68, 191, 68, 0.75)';
                tooltipStyle.display = 'none';
				pwd_c.style.display='inline-block';
                return true;
            } else {
                pwd1.className = 'incorrect';
				lab.style.color = 'rgba(191, 68, 68, 0.75)';
                tooltipStyle.display = 'inline-block';
				pwd_c.style.display='none';
                return false;
            }
        
        };

        check['email_c'] = function() {
        
            var email = document.getElementById('email'),
                email_c = document.getElementById('email_c'),
                tooltipStyle = getTooltip(email_c).style;
           				var lab=document.getElementById('email_c_lab');
 var email_c_2=document.getElementById('email_c_2');
 
            if (email.value == email_c.value && email_c.value != '') {
                email_c.className = 'correct';
				lab.style.color = 'rgba(68, 191, 68, 0.75)';
                tooltipStyle.display = 'none';
				email_c_2.style.display='inline-block';
                return true;
            } else {
               email_c.className = 'incorrect';
			   lab.style.color = 'rgba(191, 68, 68, 0.75)';
                tooltipStyle.display = 'inline-block';
				email_c_2.style.display='none';
                return false;
            }
        
        };

				 check['check'] = function() {
        
            var check = document.getElementById('check');
				var check_ = document.getElementById('check_span');
				
            if (check.checked==true) {
			          check_.style.display='none';
                return true;
            } else {
				check_.style.display='inline-block';
                return false;
            }
        
        };
		

        // Mise en place des événements
        
        (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
        
            var myForm = document.getElementById('myForm'),
                inputs = document.getElementsByTagName('input'),
                inputsLength = inputs.length;
        
            for (var i = 0 ; i < inputsLength ; i++) {
                if (inputs[i].type == 'text' || inputs[i].type == 'password') {
        
                    inputs[i].onkeyup = function() {
                        check[this.id](this.id); // "this" représente l'input actuellement modifié
                    };
                     inputs[i].onblur = function() {
                        check[this.id](this.id); // "this" représente l'input actuellement modifié
                    };
                }
            }
        
            myForm.onsubmit = function() {
        
                var result = true;
        
                for (var i in check) {
                    result = check[i](i) && result;
                }
        
                if (result) {
                myForm.submit();
                      }
        
                return false;
        
            };
        
        })();


        // Maintenant que tout est initialisé, on peut désactiver les "tooltips"
        
        deactivateTooltips();
