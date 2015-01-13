
/********************************************************************************************
        Quizz creator By Hamza Tanji Cherkaoui
 *********************************************************************************************/
function create_quizz(elem)
{
$("#quizz_intro").prepend("<h1 class='quizz-titre'>"+quizz.titre+"</h1><button class='quizz_suiv btn btn-primary ' onclick='suiv(\"quizz_intro\",\"q"+quizz.questions[0].id+"\");'>passer le quizz</button>");

for (var i=0 ; i <quizz.questions.length ;i++)
{// titre question
	var question=quizz.questions[i];
	var e=document.createElement("div");
		e.id="q"+question.id;
		e.setAttribute("class","question");
	e.innerHTML+=("<div class='quizz-titre'>"+question.question+"</div>");

for (var j=0 ; j <question.choix.length ;j++)
	{
	e.innerHTML+=("<br><div class='choix' id='choix"+question.choix[j].id+"'><input type='radio' name='"+question.question+"' value='"+question.choix[j].id+"'>"+question.choix[j].text+"<div>");
	}
// boutton de validation et d'annulation
	if(i!=quizz.questions.length-1 && quizz.questions.length!=1)
	{
		e.innerHTML+=("<button class='quizz_suiv btn btn-primary pull-right' onclick='suiv(\"q"+quizz.questions[i].id+"\",\"q"+quizz.questions[i+1].id+"\");'>question suivante</button>");

	}

		e.hidden=true;
if(i==quizz.questions.length-1)
	{
		e.innerHTML+=("<button class='quizz_button btn btn-primary pull-right validate-btn' id='valider' style='position:absolute' onclick='correct_quizz();'>valider</button>");
		e.innerHTML+=("<button class='quizz_button btn btn-primary pull-right validate-btn' id='continuer' style='position:absolute;display:none' onclick='resume();'>continuer</button>");
		
	}
	
elem.append(e);
	
}
var result=document.createElement("div");
	result.id="resultat_div";
	result.setAttribute("class","resultat_div");
	result.setAttribute("style","display:none");
result.innerHTML+=("<h1 class='correction_titre'>Correction :</h1><p id='correction_input'></p><button class='quizz_button btn btn-primary pull-left reset-btn' style='position:absolute;bottom: 5px;left: 5px;' onclick=';reset();'>repasser</button>"+
		"<button class='quizz_button btn btn-primary pull-right validate-btn' style='position:absolute' onclick='voircorrection();	'>voir correction</button>");
elem.append(result);
}

/********************************************************************************************
        navigation (ajouter le test si le radio de la question courrante est coché) 
    *********************************************************************************************/

function suiv(current_id,next_id)
{
$("#"+current_id).hide();
$("#"+next_id).show();

}

/********************************************************************************************
        correction question
 *******************************************************************************************/
function correct_question(indice)
{
	
var choix=document.getElementsByName(quizz.questions[indice].question);
 for(var i=0;i<choix.length;i++)
	{
		if (choix[i].checked==true && choix[i].value==quizz.questions[indice].reponse) 
			{
			var elem=document.getElementById("choix"+choix[i].value);
			elem.setAttribute("class",elem.getAttribute("class")+" rep_correcte");
			$("#choix"+choix[i].value).prepend("<span id='correction_icon' class='icon-checkmark pull-right'></span>")
			return true;
			}

		if (choix[i].checked==true && choix[i].value!=quizz.questions[indice].reponse) 
			{
			var elem=document.getElementById("choix"+choix[i].value);
			elem.setAttribute("class",elem.getAttribute("class")+" rep_incorrecte");
			$("#choix"+choix[i].value).prepend("<span class='icon-close pull-right' id='correction_icon'></span>")
			var elemrep= document.getElementById("choix"+quizz.questions[indice].reponse);
			elemrep.setAttribute("class",elemrep.getAttribute("class")+" rep_correcte");	
				$("#choix"+quizz.questions[indice].reponse).prepend("<span id='correction_icon' class='icon-checkmark pull-right'></span>")
				return false;
			}
	}

}
/********************************************************************************************
        correction quizz
    *********************************************************************************************/
function correct_quizz()
{	var compteur=0;
	

		var nbr_questions=quizz.questions.length;
	for (var i=0 ; i <quizz.questions.length ;i++)
		{
			var resultat =correct_question(i);
			if(resultat==true)
				{
					compteur++;
				}
		}
		$("#correction_input").text("vous avez eu :"+compteur+"/"+nbr_questions);
		suiv("q"+quizz.questions[nbr_questions-1].id,"resultat_div");
		
}
/********************************************************************************************
fonction pour parcourir la correction du quizz
    *********************************************************************************************/
function voircorrection()
{
	$("#valider").hide();
	$("#continuer").show();
for (var i=1 ; i <quizz.questions.length ;i++)
{
	var id=quizz.questions[i].id;
	$("#q"+id).hide();

}
	var id_init=quizz.questions[0].id;
	$("#q"+id_init).show();
	$("#resultat_div").hide();
}
/********************************************************************************************
fonction pour la réinitialisation
    *********************************************************************************************/
function reset()
{
// vider les inputs[radio]
	for (var indice=0 ; indice <quizz.questions.length ;indice++)
		{

var choix=document.getElementsByName(quizz.questions[indice].question);

 			for(var i=0;i<choix.length;i++)
				{
				var elem=document.getElementById("choix"+choix[i].value);
				elem.setAttribute("class","choix");
       			choix[i].checked=false;
    			}
		}
		$("[id=correction_icon]").remove();
//retourne au debut
for (var i=1 ; i <quizz.questions.length ;i++)
{
	var id=quizz.questions[i].id;
	$("#q"+id).hide();

}
	var id_init=quizz.questions[0].id;
	$("#q"+id_init).show();
	$("#resultat_div").hide();
}

/********************************************************************************************
        version 1.1
    *********************************************************************************************/