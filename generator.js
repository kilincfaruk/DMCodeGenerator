$.fn.multipleValues = function (getValues) {
  var values = getValues.split(/[\s,]+/g);
  for (var i = 0; i < values.length; i++) {
    values[i] = '"' + values[i] + '"';
  }
  var finalValues = values.join(",");
  return finalValues;
};

$.fn.addTabs = function (bracketCount) {
  for (var i = 0; i < bracketCount; i++) {
    $("#generateCode").append("&nbsp;");
  }
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

    $("#tabs").tabShowContent();
  });

  //GFZ Acordion
  $("#pLabel").click(function () {
    $("#ulPLabel").toggle();
  });

  $("#bLabel").click(function () {
    $("#ulBLabel").toggle();
  });

  $("#rLabel").click(function () {
    $("#ulRLabel").toggle();
  });

  var bracketCount = 0;
  var vkgrnum = 0;
  $("#generateCode").text("");

  //End Loop --- This is for add end brackets
  $("#endLoop").click(function () {
    // for(var i = bracketCount; i < 0; i--){
    //     $("#generateCode").append("&nbsp;");
    // }
    for (var i = bracketCount; i > 0; i--) {
      spaceCount = i - 1;
      while (spaceCount > 0) {
        $("#generateCode").append("&nbsp;");
        spaceCount--;
      }
      // $("#generateCode").append("&nbsp;");
      $("#generateCode").append("}\n");
      bracketCount--;
    }
  });

  //GFZ
  $("#generate").click(function () {
    $.fn.addTabs(bracketCount);
    $("#generateCode").append(
      'if(Vehicle.BAND_TMF=="' +
        $("input[type=checkbox][class=subOption]:checked")
          .map(function () {
            return this.value;
          })
          .get()
          .join(",") +
        //     + '" || Vehicle.BAND_TMF=="' +
        //     $("input[type=checkbox][class=subOption]:checked")
        //         .map(function () {
        //             return this.value;
        //         })
        //         .get().join(",")
        //         +
        '")\n' +
        "return;\n"
    );
  });

  // VKGR
  $("#vkgrGenerate").click(function () {
    // vkgr code
    if ($("#containstype").prop("checked")) {
      var getVehicleCodes = $("#textArea").val();
      finalVehicleCodes = $.fn.multipleValues(getVehicleCodes);
      $.fn.addTabs(bracketCount);
      $("#generateCode").append(
        "if(Vkgr.Code." +
          $("input[name=radio-btn]:checked").val() +
          "(" +
          finalVehicleCodes +
          ")"
      );
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
      $.fn.addTabs(bracketCount);
      $("#generateCode").append(
        "AntListVkgr vkgr" +
          vkgrnum +
          " = Vkgr.CenterCode.Gets(" +
          finalVehicleCodes +
          ");\n"
      );
      vkgrnum++;
    }
    //vkgr IsEmpty // IsNull
    else if ($("#serialVkgrIsEmpty").prop("checked")) {
      $.fn.addTabs(bracketCount);
      $("#generateCode").append("if(serialVkgr.IsEmpty()){" + "\n");

      bracketCount++;
    } else if ($("#serialVkgrIsNull").prop("checked")) {
      $.fn.addTabs(bracketCount);
      $("#generateCode").append("if(serialVkgr.IsNull()){" + "\n");
      bracketCount++;
    } else {
      alert("Please Select VKGR Type!");
    }
  });

  //warning
  $("#warningGenerate").click(function () {
    $.fn.addTabs(bracketCount);
    $("#generateCode").append(
      'Warning("' + $("#warningmessage").val() + '");\n'
    );
    // bracketCount++;
  });

  //error
  $("#errorGenerate").click(function () {
    $.fn.addTabs(bracketCount);
    $("#generateCode").append('Error("' + $("#errormessage").val() + '");\n');
    // bracketCount++;
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

  // Ksw
  $("#kswGenerate").click(function () {
    // ksw code
    if ($("#code-button").prop("checked")) {
      var kswText = $("#kswTextArea").val();
      for (var i = 0; i < bracketCount; i++) {
        $("#generateCode").append("&nbsp;");
      }
      // $('input[name=radio-btn]:checked').val()

      var getkswCodes = $("#kswCode").val();
      finalKswCodes = $.fn.multipleValues(getkswCodes);
      for (var i = 0; i < bracketCount; i++) {
        $("#generateCode").append("&nbsp;");
      }

      // kswText
      $("#generateCode").append(
        "if(Ksw.Code.Gets(" +
          finalKswCodes +
          ').IsMatchFull(@"' +
          kswText +
          '")'
      );

      if ($("#ksw-false").prop("checked")) {
        $("#generateCode").append("==false){\n");
      } else {
        $("#generateCode").append("){\n");
      }
    }

    // ksw text
    else if ($("#text-button").prop("checked")) {
      var kswText = $("#kswTextArea").val();
      for (var i = 0; i < bracketCount; i++) {
        $("#generateCode").append("&nbsp;");
      }

      $("#generateCode").append(
        'if(Ksw.Text.IsMatch(@"' +
          kswText +
          '")==' +
          $("input[name=kswtf-btn]:checked").val() +
          "){\n"
      );
    } else {
      alert("Please Select KSW Type!");
    }
    bracketCount++;
  });

  // CODE.Contains....()
  $("#codeGenerate").click(function () {
    var getCodes = $("#codeTextArea").val();
    finalCodes = $.fn.multipleValues(getCodes);
    $.fn.addTabs(bracketCount);
    $("#generateCode").append(
      "if(Code." +
        $("input[name=coderadio]:checked").val() +
        "(" +
        finalCodes +
        "){\n"
    );
    bracketCount++;
  });

  $("#propertyGenerate").click(function () {
    $.fn.addTabs(bracketCount);

    var getPropertyCodes = $("#gfzPropertiesText").val();
    finalPropertyCodes = $.fn.multipleValues(getPropertyCodes);

    $("#generateCode").append(
      "if(Vehicle.Properties.GFZ." +
        $("input[name=properties]:checked").val() +
        "(" +
        $("#gfzProperties").val() +
        ") == " +
        finalPropertyCodes +
        ")"
    );
    bracketCount++;
  });

  // Vehicle.BAND_TMF
  $("#vehicleGenerate").click(function () {
    $.fn.addTabs(bracketCount);

    var getBandCodes = $("#vehicleBandText").val();
    var values = getBandCodes.split(/[\s,]+/g);
    for (var i = 0; i < values.length; i++) {
      values[i] = 'Vehicle.BAND_TMF=="' + values[i] + '"';
    }
    var finalBandCodes = values.join("||");

    $("#generateCode").append("if(" + finalBandCodes + ")\nreturn;\n");
  });
};