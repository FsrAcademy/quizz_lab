
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
	e.innerHTML+=("<br><div class='choix'><input type='radio' name='"+question.question+"' value='"+question.choix[j].id+"'>"+question.choix[j].text+"<div>");
	}
// boutton de validation et d'annulation
	if(i!=quizz.questions.length-1 && quizz.questions.length!=1)
	{
		e.innerHTML+=("<button class='quizz_suiv btn btn-primary pull-right' onclick='suiv(\"q"+quizz.questions[i].id+"\",\"q"+quizz.questions[i+1].id+"\");'>question suivante</button>");

	}

		e.hidden=true;

	if(i==quizz.questions.length-1)
	{e.innerHTML+=("<button class='quizz_button btn btn-primary pull-right validate-btn' style='position:absolute' onclick='correct_quizz();resume();	'>valider</button>");}
elem.append(e);
}
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
			alert("réponse correcte");
			}

		if (choix[i].checked==true && choix[i].value!=quizz.questions[indice].reponse) 
			{
			alert("réponse incorrecte");
			}
	}
	
}
/********************************************************************************************
        correction quizz
    *********************************************************************************************/
function correct_quizz()
{
	for (var i=0 ; i <quizz.questions.length ;i++)
		{
			correct_question(i);
		}
}
/********************************************************************************************
        version 1.0
    *********************************************************************************************/