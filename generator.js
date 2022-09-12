var strUndo=Array(5).fill('');
var tempUndo="";
var undoCounter=0;
var vkgrPre;
function shift(item) {
  if(item!=""){
    strUndo[4]=strUndo[3];
    strUndo[3]=strUndo[2];
    strUndo[2]=strUndo[1];
    strUndo[1]=strUndo[0];
    strUndo[0]=item;
  }

}

function shiftPop(){
  tempUndo=strUndo[0];
  strUndo[0]=strUndo[1];
  strUndo[1]=strUndo[2];
  strUndo[2]=strUndo[3];
  strUndo[3]=strUndo[4];
  strUndo[4]="";
  return tempUndo;
}

$.fn.multipleValues = function (getValues) {
  var values = getValues.split(/[\s,]+/g);
  for (var i = 0; i < values.length; i++) {
    values[i] = '"' + values[i] + '"';
  }
  var finalValues = values.join(",");
  return finalValues;
};

$.fn.multipleValues2 = function (getValues) {
  var values = getValues.split(/[\s,]+/g);
  for (var i = 0; i < values.length; i++) {
    values[i] = values[i];
  }
  var finalValues2 = values.join("||");
  return finalValues2;
};


$.fn.addTabs = function (bracketCount) {
  for (var i = 0; i < (bracketCount + 1); i++) {
    $("#generateCode").append("&nbsp;");
  }
  document.getElementById("bracketCount").innerHTML = (bracketCount + 1);
};

window.onload = function () {
  // Menu Accordion
  $(document).ready(function () {
    $(function () {
      $("#tabs").tabs({
        collapsible: true,
        active: false,
      });
    });
    //$("#tabs").tabShowContent();
  });

  var bracketCount = 0;
  var vkgrnum = 0;

  $("#generateCode").text("");

  //End Loop --- This is for add end brackets
  $("#endLoop").click(function () {
    if (bracketCount > 0) {
      for (var i = bracketCount; i > 0; i--) {
        spaceCount = i - 1;
        while (spaceCount > 0) {
          $("#generateCode").append("&nbsp;");
          spaceCount--;
        }
        // $("#generateCode").append("&nbsp;");

      } 
      //shift(document.getElementById("generateCode").value);
      $("#generateCode").append("}\n");
      bracketCount--;
      document.getElementById("bracketCount").innerHTML = (bracketCount);
    }
    else {
      alert("There is no more loop end!")
    }
  });
  


  // Vehicle.BAND_TMF
  $("#gfzGenerate").click(function () {
    // $.fn.addTabs(bracketCount);
    const vehicleBandTextclear = document.getElementById('vehicleBandText');
    var getBandCodes = $("#vehicleBandText").val();
    var values = getBandCodes.split(/[\s,]+/g);
    for (var i = 0; i < values.length; i++) {
      values[i] = 'Vehicle.BAND_TMF=="' + values[i] + '"';
    }
    var finalBandCodes = values.join("||");
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append("if(" + finalBandCodes + ")\nreturn;\n");
    vehicleBandTextclear.value = '';
  });

  // VKGR
  $("#vkgrGenerate").click(function () {
    // vkgr code
    const textAreaclear = document.getElementById('textArea');
    const centerTextAreaclear = document.getElementById('centerTextArea');
    if ($("#containstype").prop("checked")) {
      var getVehicleCodes = $("#textArea").val();
      finalVehicleCodes = $.fn.multipleValues(getVehicleCodes);
      $.fn.addTabs(bracketCount);
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append($("input[name=vkgr-selector]:checked").val() +
        "(Vkgr.Code." +
        $("input[name=radio-btn]:checked").val() +
        "(" +
        finalVehicleCodes +
        ")"
      );
      shift(document.getElementById("generateCode").value);
      if ($("#false").prop("checked")) {
        $("#generateCode").append("==false){\n");
      } else {
        $("#generateCode").append("){\n");
      }
      bracketCount++;
    }

    // vkgr centercode
    else if ($("#centerCode").prop("checked")) {
      var getVehicleCodes = $("#centerTextArea").val();
      finalVehicleCodes = $.fn.multipleValues(getVehicleCodes);
      var footerTextArea=document.getElementById("footerTextArea").value
      $.fn.addTabs(bracketCount);
      shift(document.getElementById("generateCode").value);
      if($("#footer").prop("checked")){
        $("#generateCode").append(
          "AntList&#60;Vkgr&#62; vkgr" +
          vkgrnum +
          " = Vkgr.CenterCode.Gets(" +
          finalVehicleCodes +
          ").WhereS(t=>t.FooterCode.Left(");
          if($("#footer_radio1").prop("checked")){
            $("#generateCode").append(
              '1)=="'+footerTextArea+'").GetMatch("");\n'
            )
          }
          else if($("#footer_radio2").prop("checked")){
            $("#generateCode").append(
              '2)=="'+footerTextArea+'").GetMatch("");\n'
            )
          }
      }
      else{
        $("#generateCode").append(
          "AntList&#60;Vkgr&#62; vkgr" +
          vkgrnum +
          " = Vkgr.CenterCode.Gets(" +
          finalVehicleCodes +
          ");\n"
        );
      }
      vkgrPre=vkgrnum;
      vkgrnum++;
    }
    //vkgr IsEmpty //IsNotEmpty()// IsNull
    else if ($("#serialVkgrIsEmpty").prop("checked")) {
      $.fn.addTabs(bracketCount);
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append($("input[name=vkgr-selector]:checked").val() + "(vkgr"+vkgrPre+".IsEmpty()){" + "\n");
      bracketCount++;
    } 
    else if ($("#serialVkgrIsNotEmpty").prop("checked")) {
      $.fn.addTabs(bracketCount);
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append($("input[name=vkgr-selector]:checked").val() + "(vkgr"+vkgrPre+".IsNotEmpty()){" + "\n");
      bracketCount++;
    }
    else if ($("#serialVkgrIsNull").prop("checked")) {
      $.fn.addTabs(bracketCount);
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append("if(serialVkgr.IsNull()){" + "\n");
      bracketCount++;
    }
    else {
      alert("Please Select VKGR Type!");
    }
    textAreaclear.value = '';
    centerTextAreaclear.value = '';
  });



  //warning
  $("#warningGenerate").click(function () {
    // $.fn.addTabs(bracketCount);
    const warningmessageclear = document.getElementById('warningmessage');
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append(
      'Warning("' + $("#warningmessage").val() + '");\n'
    );
    warningmessageclear.value = '';
  });

  //error
  $("#errorGenerate").click(function () {
    const errormessageclear = document.getElementById('errormessage');
      
    // $.fn.addTabs(bracketCount);
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append(
      'Error("' + $("#errormessage").val() + '");\n'
    );
    errormessageclear.value = '';
  });

  //copytoclipboard
  $("#copy").click(function () {
    var text = $("#generateCode").val();
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
    $("#myTooltip").html("Copied");
  });

  function undo(){
    /*if(undoCounter==0){
      bracketCount++;//
      $.fn.addTabs(bracketCount);
    }*/
    undoCounter++;
    var data=document.getElementById("generateCode").value;
    data=String(data);
    //data=data.substring(data.lastIndexOf("\n") + 1, -1 );
    data=data.replace(/\r?\n?[^\r\n]*$/,"");
    console.log(data);    
    document.getElementById("generateCode").innerHTML=data;
    bracketCount--;
    $.fn.addTabs(bracketCount);
    if(bracketCount<0)
    {
      bracketCount=0;
    }
    //spaceCount--;
    

    /*if(undoCounter==0){
      bracketCount--;
    }
    undoCounter++;
    if(undoCounter==2){
      undoCounter=0;
      bracketCount--;
    }
    $.fn.addTabs(bracketCount);
    console.log(strUndo);
    let item=shiftPop();
    //bracketCount--;
    for(let i=0;i<4;i++){
      item=item.slice(0,-1);
    }    
    document.getElementById("generateCode").innerHTML=item;
    spaceCount--;
    return*/
  }
  document.getElementById("undo").addEventListener("click", undo);

  // Ksw
  $("#kswGenerate").click(function () {
    // ksw code
    const kswTextAreaclear = document.getElementById('kswTextArea');
    const kswCodeclear = document.getElementById('kswCode');
    if ($("#code-button").prop("checked")) {
      $.fn.addTabs(bracketCount);
      var kswText = $("#kswTextArea").val();
      var kswText3 = $.fn.multipleValues2(kswText);
      for (var i = 0; i < bracketCount; i++) {
        //shift(document.getElementById("generateCode").value);
        $("#generateCode").append("&nbsp;");
      }
      // $('input[name=radio-btn]:checked').val()

      var getkswCodes = $("#kswCode").val();
      finalKswCodes = $.fn.multipleValues(getkswCodes);
      for (var i = 0; i < bracketCount; i++) {
        //shift(document.getElementById("generateCode").value);
        $("#generateCode").append("&nbsp;");
      }

      // kswText
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append($("input[name=ksw-selector]:checked").val() +
        "(Ksw.Code.Gets(" +
        finalKswCodes +
        ').IsMatchFull(@"' +
        kswText3 +
        '")'
      );
      shift(document.getElementById("generateCode").value);
      if ($("#ksw_false").prop("checked")) {
        $("#generateCode").append("==false){\n");
      } else {
        $("#generateCode").append("==true){\n");
      }
    }

    // ksw text
    else if ($("#text-button").prop("checked")) {
      $.fn.addTabs(bracketCount);

      for (var i = 0; i < bracketCount; i++) {
        $("#generateCode").append("&nbsp;");
      }
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append($("input[name=ksw-selector]:checked").val() +
        '(Ksw.Text.IsMatch(@"' +
        document.getElementById("kswTextArea").value +
        '")==' +
        $("input[name=kswtf-btn]:checked").val() +
        "){\n"
      );
    } else {
      alert("Please Select KSW Type!");
    }
    kswTextAreaclear.value = '';
    kswCodeclear.value = '';
    bracketCount++;
    //console.log(document.getElementById("generateCode").text);
  });

  // CODE.Contains....()
  $("#codeGenerate").click(function () {
    var getCodes = $("#codeTextArea").val();
    const codeTextAreaclear = document.getElementById('codeTextArea');
    finalCodes = $.fn.multipleValues(getCodes);
    $.fn.addTabs(bracketCount);
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append($("input[name=code-selector]:checked").val() +
      "(Code." +
      $("input[name=coderadio]:checked").val() +
      "(" +
      finalCodes +
      ")){\n"
    );
    codeTextAreaclear.value = '';
    bracketCount++;
  });

  // Parts.Contains....()
  $("#partsGenerate").click(function () {
    const partsTextAreaclear = document.getElementById('partsTextArea');
    var getCodes = $("#partsTextArea").val();
    finalCodes = $.fn.multipleValues(getCodes);
    $.fn.addTabs(bracketCount);
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append($("input[name=parts-selector]:checked").val() +
      "(Parts." +
      $("input[name=partsradio]:checked").val() +
      "(" +
      finalCodes +
      ")){\n"
    );
    partsTextAreaclear.value = '';
    bracketCount++;
  });

  // Vehicle.Properties.GFZ
  $("#vehicleGenerate").click(function () {
    $.fn.addTabs(bracketCount);
    var getCodes = $("#gfzPropertiesText").val(); 
    const gfzPropertiesclear = document.getElementById('gfzProperties');
    const gfzPropertiestextclear = document.getElementById('gfzPropertiesText');
    
    finalCodes = $.fn.multipleValues(getCodes);
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append($("input[name=vcode-selector]:checked").val() +
      "(Vehicle.Properties.GFZ." +
      $("input[name=properties]:checked").val() +
      "(" +
      $("#gfzProperties").val() +
      ") == " +
      finalCodes +
      "){\n"
    );
    gfzPropertiesclear.value = '';
    gfzPropertiestextclear.value = '';
    bracketCount++;
  });

  // return generate button
  $("#returnGenerate").click(function () {
    // $.fn.addTabs(bracketCount);
    var getCodes = $("#gfzPropertiesText").val();
    finalCodes = $.fn.multipleValues(getCodes);
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append($("input[name=vcode-selector]:checked").val() +
      "(Vehicle.Properties.GFZ." +
      $("input[name=properties]:checked").val() +
      "(" +
      $("#gfzProperties").val() +
      ") == " +
      finalCodes +
      ")\nreturn;\n"
    );
  });

  var checkcounter = 0;

  //checkvalueadd
  $("#checkaddGenerate").click(function () {
    // $.fn.addTabs(bracketCount);
    const checkvaluetextclear = document.getElementById('checkvaluetext');
    const addvaluetextclear = document.getElementById('addvaluetext');
    var getCodes = $("#checkvaluetext").val();
    var getCodes2 = $("#addvaluetext").val();
    shift(document.getElementById("generateCode").value);
    if (checkcounter < 1) {
      $("#generateCode").append("AntDictionary&lt;string, AntList&lt;string&gt;&gt; keys = new AntDictionary&lt;string, AntList&lt;string&gt;&gt;();\n")
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append(
        'keys.CheckValue("' +
        getCodes +
        '").Add("' +
        getCodes2 +
        '");\n '

      );
      checkvaluetextclear.value = '';
      addvaluetextclear.value = '';
      // document.getElementById("checkvaluetext").innerHTML = " ";
      // document.getElementById("addvaluetext").innerHTML = " ";
      checkcounter++;
    }
    else {
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append(
        'keys.CheckValue("' +
        getCodes +
        '").Add("' +
        getCodes2 +
        '");\n '
      );
      checkcounter++;
      checkvaluetextclear.value = '';
      addvaluetextclear.value = '';
    }
    
    // finalCodes = $.fn.multipleValues(getCodes)+$.fn.multipleValues(getCodes2);
  });

  $("#overrideGenerate").click(function () {
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append(
      'AntList&lt;Ksta&gt; kstas = Ksw.Code.Gets(Ksw.Code.KswCodes);\n'
      +
      'StringBuilder sb = new StringBuilder();\n'
      +
      'kstas.Each(ksta =&gt;\n{\n\n'
      +
      '&emsp;if (RegexHelpers.IsMatch(ksta.DESCRIPTION, @"mit(\\s)"))\n&emsp;{\n'
      +
      '&emsp;&emsp;bool isOverride = false;\n&emsp;&emsp;Vkgr vkgr = Code.GetSerialVkgr(ksta.Owner.CODE, out isOverride);\n'
      +
      '&emsp;&emsp;if (vkgr.IsNotNull())\n&emsp;{\n'
      +
      '&emsp;&emsp;&emsp;bool match = RegexHelpers.IsMatch(vkgr.Text, "ohne|o");\n'
      +
      '&emsp;&emsp;&emsp;if (match)\n&emsp;&emsp;&emsp;{\n&emsp;&emsp;&emsp;&emsp;sb.Append(ksta.Owner.CODE).Append(" kodu ").Append(vkgr).Append("hatalı olabilir.");\n&emsp;&emsp;&emsp;}\n&emsp;&emsp;}\n&emsp;}\n'
      +
      '&emsp;if (RegexHelpers.IsMatch(ksta.DESCRIPTION, "ohne"))\n&emsp;}\n'
      +
      '&emsp;&emsp;bool isOverride = false;\n&emsp;&emsp;Vkgr vkgr = Code.GetSerialVkgr(ksta.Owner.CODE, out isOverride);\n\n'
      +
      '&emsp;&emsp;if (vkgr.IsNotNull())\n&emsp;&emsp;{\n&emsp;&emsp;&emsp;bool match1 = RegexHelpers.IsMatch(vkgr.Text, @"mit(\\s)|m.");\n\n'
      +
      '&emsp;&emsp;&emsp;if (match1)\n&emsp;&emsp;&emsp;{\n&emsp;&emsp;&emsp;&emsp;sb.Append(ksta.Owner.CODE).Append(" kodu ").Append(vkgr).Append("hatalı olabilir.");\n&emsp;&emsp;&emsp;}\n&emsp;&emsp;}\n&emsp;}\n});\n'
      +
      '&emsp;&emsp;if (sb.Length &gt; 0)\n&emsp;&emsp;&emsp;Warning(sb);\n\n'

    );
  });

  // finishcheckaddGenerate
  $("#finishcheckaddGenerate").click(function () {
    shift(document.getElementById("generateCode").value);
    $("#generateCode").append(
      'StringBuilder sb = new StringBuilder();\nkeys.Each(row =&gt;\n{\n&emsp;&emsp;if (Vkgr.Code.Contains(row.Key) && Vkgr.Code.Contains(row.Value) == false)\n&emsp;&emsp;&emsp;sb.Append(row.Key).Append(" ").Append("Kullanıldığında").Append(" ").Append(row.Value.JoinAs()).Append(" sapma ihtiyacı ortaya çıkmaktadır öncelikli satış grubu düzelttirilmeli veya duruma göre sapma da girilebilir.");\n'
      +
      '});\n\nif (sb.Length > 0)\n&emsp;Error(sb);\n\n'

    );
  });

  var stringbuildercounter = 0;
  $("#stringbuilderGenerate").click(function () {
    const sbappendtextclear = document.getElementById('sbappendtext');
    var getCodes = $("#sbappendtext").val();
    if (stringbuildercounter < 1) {
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append(
        'StringBuilder sb = new StringBuilder();\n'
      );
      stringbuildercounter++;
  
    }
    else {
      shift(document.getElementById("generateCode").value);
      $("#generateCode").append(
        'sb.Append ("' + getCodes + '");\n'
      );
      stringbuildercounter++;
      sbappendtextclear.value = '';
    }

  });

  // sbappendgenerate
  $("#sbappendGenerate").click(function () {
    var checkBox = document.getElementById("errorwarningtoggle");
    shift(document.getElementById("generateCode").value);
    if (checkBox.checked == true){
      $("#generateCode").append(
        'if (sb.Length &gt; 0)\nWarning(sb);\n\n'
        );
    } else {
      $("#generateCode").append(
        'if (sb.Length &gt; 0)\nError(sb);\n\n'
        );
    }
  });

};