var dati = new Array();
var titStudio = ["Analfabeta","Licenza elem.","Licenza media","Diploma","Laurea"];
var titStudioval = ["0","0","0","0","0"];
var mOrF = ["0","0"]
var show = false;
var execute = true;

function caricaDati()
{
	var url = "dati.txt";
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() 
	{
		if (xmlhttp.readyState == 4)
    {
    	if (xmlhttp.status == 200) 
      {
    		dati = JSON.parse(xmlhttp.responseText);
    		visualizzaDati();
    	}
    	else 
      {
    		document.getElementById("messaggi").innerHTML = "Errore";
    	}
    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function visualizzaDati()
{
  var ncol=0;
  for (key in dati)
    ncol++;
  var tit = document.getElementsByTagName("TITLE");
	var txt = tit[0].childNodes[0];
  var tab = document.getElementById("dati");
	tab.innerHTML="";
	var tabella = document.createElement("TABLE");
  
  var titolo = document.createElement("TR");
  var ele = document.createElement("TH");
  titolo.className="purple";
  ele.colSpan = ncol;
  ele.appendChild(txt);    
  titolo.appendChild(ele);
  tabella.appendChild(titolo);

  var intestazione = document.createElement("TR");
  for (var x in dati[0])
  {
  	txt = document.createTextNode(x);
    ele = document.createElement("TH");
	  ele.appendChild(txt);
    intestazione.appendChild(ele);
  }
  intestazione.className="purple";
  tabella.appendChild(intestazione);

  for (var i in dati)
	{
		var riga = document.createElement("TR");
    for (var x in dati[i])
    {
    	if (x=="Titolo")
     		txt = document.createTextNode(titStudio[dati[i][x]]);
		 	else
		 		txt = document.createTextNode(dati[i][x]);
		 	ele = document.createElement("TD");
      ele.appendChild(txt);
      riga.appendChild(ele);
    }
    tabella.appendChild(riga);
	}
	tab.appendChild(tabella);
}

function details(){
  if(!show){
    if(execute){
      for(var i in dati){
        for(var x in dati[i]){
          if(x == "Sesso"){
            if(dati[i][x] == "F"){
              mOrF[1]++;
            }
            else{
              mOrF[0]++;
            }
          }
        }
      }

      for(var i in dati){
        for(var x in dati[i]){
          if(x == "Titolo"){
            switch(dati[i][x]){
              case 0:
                titStudioval[0]++;
                break;
              case 1:
                titStudioval[1]++;
                break;
              case 2:
                titStudioval[2]++;
                break;
              case 3:
                titStudioval[3]++;
                break;
              case 4:
                titStudioval[4]++;
                break;
              default:
                break;
            }
          }
        }
      }
      execute = !execute;
    }
    listat = document.createElement("ul");
    listas = document.createElement("ul");
    intest = document.createElement("h2");
    intest1 = document.createElement("h2");

    intest.textContent = "Titoli di Studio:";
    intest1.textContent = "Maschi e Femmine:";

    for(var i in titStudio){
      li = document.createElement("li");
      li.textContent = titStudio[i]+": "+titStudioval[i];
      intest.appendChild(li);
      li.className="sized";
    }

      lif = document.createElement("li");
      lif.textContent = "Femmine: "+mOrF[1];
      lif.className="sized";

      lim = document.createElement("li");
      lim.textContent = "Maschi: "+mOrF[0];
      lim.className="sized";

      listat.appendChild(intest);
      listas.appendChild(intest1);
      intest1.appendChild(lif);
      intest1.appendChild(lim);
      var dati2 = document.getElementById("dati2");

      dati2.appendChild(listat);
      dati2.appendChild(listas);

      show = !show;
    }else{
      document.getElementById("dati2").innerHTML = "";
      show = !show;
    }
}
  