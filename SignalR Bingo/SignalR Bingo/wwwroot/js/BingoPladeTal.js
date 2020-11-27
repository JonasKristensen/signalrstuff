function genNum() {
    //Math.floor gør at de random genererede tal altid bliver en hel integer, så decimaltal undgås.
    $b = Math.floor((Math.random()) * (15 - 1)) + 1;
    $i = Math.floor((Math.random()) * (30 - 16)) + 16;
    $n = Math.floor((Math.random()) * (45 - 31)) + 31;
    $g = Math.floor((Math.random()) * (60 - 46)) + 46;
    $o = Math.floor((Math.random()) * (75 - 61)) + 61;
}

function makeNum() { //makeNum indsætter de genererede tal i de forskellige bingokolonner
    genNum();
    if ($y == 1) $num = $b;
    if ($y == 2) $num = $i;
    if ($y == 3) $num = $n;
    if ($y == 4) $num = $g;
    if ($y == 5) $num = $o;
    $numList.push($num);
    for ($c = 0; $c <= $count; $c++) {
        if ($num != $numList[$c - 1]) { //Tjekker om nummeret er et gyldigt nummer?
            $good = 1;
        } else { //Indsætter et nummer
            $good = 0;
            makeNum();
        }
    }
}
$('button').click(function () { //Function der genererer en ny plade
    $('.column').empty();
    $numList = [];
    $count = 1;
    for ($x = 1; $x <= 5; $x++) {
        for ($y = 1; $y <= 5; $y++) {
            makeNum(); //Indsætter numbers i de genererede felter
            if ($good == 1) {
                $('.' + $y).append("<div class='number col-" + $count + "'><span>" + $num + "</span></div>");
            }
            $count++;
        }
    }
    $(".col-13").html("<span>FREE</span>");

    $('.number').click(function () {
        $(this).html('<span>X</span>');
    });
});