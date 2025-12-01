import LegendItem from "./LegendItem";

const legendItems = [
  new LegendItem(
    "200 +",
    "#741f1f",
    // "#8b0000",
    (cases : number) => cases >= 200,
    "white"
  ),

  new LegendItem(
    "150 - 199",
    // "#741f1f",
    "#9c2929",
    (cases : number) => cases >= 150 && cases < 200,
    "White"
  ),

  new LegendItem(
    "100 - 149",
    "#c57f7f",
    (cases : number) => cases >= 100 && cases < 150,
  ),

  new LegendItem(
    "50 - 99",
    "#d8aaaa",
    (cases : number) => cases >= 50 && cases < 100
  ),

  new LegendItem(
    "0 - 49",
    "#ebd4d4",
    (cases : number) => cases > 0 && cases < 50
  ),

  new LegendItem("No Data", "#ffffff", (cases) => true),
];

export default legendItems;

/**
 * 7 > 1 million                        #8b0000
 * 6 >= 500 thousand < 1 million        #9e2a2a
 * 5 >= 200 thousand < 500 thousand     #b15555
 * 4 >= 100 thousand  < 200 Thousand    #c57f7f
 * 3 > 50 thousand < 100 thousand       #d8aaaa
 * 2 >= 0 < 50 thousand                 #ebd4d4
 * 1 NO DATA                            #ffffff
 */

/*

#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/
