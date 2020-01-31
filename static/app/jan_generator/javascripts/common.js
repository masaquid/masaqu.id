function id(id) {
  return document.getElementById(id);
}

function chkdgt(n) {
  // even sum - odd sum - tmp sum
  var es = parseInt(n.substr(1, 1)) + parseInt(n.substr(3, 1)) + parseInt(n.substr(5, 1)) + parseInt(n.substr(7, 1)) + parseInt(n.substr(9, 1)) + parseInt(n.substr(11, 1));
  var os = parseInt(n.substr(0, 1)) + parseInt(n.substr(2, 1)) + parseInt(n.substr(4, 1)) + parseInt(n.substr(6, 1)) + parseInt(n.substr(8, 1)) + parseInt(n.substr(10, 1));
  var ts = (es * 3) + os;

  // result
  var rs = 10 - parseInt(("" + ts).substr(-1, 1));
  return rs < 10 ? rs : 0;
}

// janコード作る
function jcode() {
  // クリアする
  id("result").value = "";

  var err = 0;

  if (id("gs1").value.length != 9) {
    alert("ERROR: GS1事業者コード (gs1_length: " + id("gs1").value.length + ")");
    err++;
  }
  if (!parseInt(id("iNum").value)) {
    alert("ERROR: アイテムコード (" + parseInt(id("iNum").value) + ")");
    err++;
  }
  if (!parseInt(id("cNum").value)) {
    alert("ERROR: コード発行数 (" + parseInt(id("cNum").value) + ")");
    err++;
  }


  if (!err) {
    var gs1 = id("gs1").value;
    var iNum = id("iNum").value;
    var cNum = id("cNum").value;

    for (var i = 0; i < cNum; i++) {
      var current_iNum = ("000" + (parseInt(iNum) + i)).substr(-3, 3);
      var chk_dgt = chkdgt("" + gs1 + current_iNum)

      // 二度手間だけどJANコードここでつくる
      var jancode = "" + gs1 + current_iNum + chk_dgt;

      id("result").value += jancode + "\n";
    }
  } else {
    alert("必要な情報を修正してね")
  }
}
