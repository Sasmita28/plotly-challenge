d3.json("samples.json").then(data => {

   
    // console.log(sampleValues);

   samplesFiltered = data.samples.filter(rows =>rows.sample_values.length > 10);
//    console.log(samplesFiltered);

   var id = samplesFiltered.map(row => row["id"]);
   var sampleValues = samplesFiltered.map(row => row["sample_values"].slice(0,10));
   var labels =samplesFiltered.map(row => row["otu_ids"].slice(0,10));
   var text = samplesFiltered.map(row => row["otu_labels"].slice(0,10));

   var strLabel = labels[0].toString().split(",");
   var testing = strLabel.map(element => `OTU ${element}`);
   var labelStr = labels.map(arr => arr.toString().split(","));
   var otuLabels = labelStr.map(arr =>arr.map(element => `OTU ${element}`) );


  //  console.log(otuLabels);

   id.forEach(person => {
    d3.select('#selDataset').append("option").attr("value",person).text(person);
    });

  function init() {
    var data = [{

      x: sampleValues[0].reverse(),
      y: testing.reverse(),
      type: "bar",
      orientation : "h",
      text : text[0].reverse()
    }];
  
    var layout = {
      height: 500,
      width: 350
    };
  
    Plotly.newPlot("bar", data, layout);

  }
  init();


  

  d3.selectAll("#selDataset").on("change", optionChanged);

  function optionChanged() {

    var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
             

    for (var i = 0; i < samplesFiltered.length; i++) {
      if (dataset == id[i]) {
       
        data = [{

        x: sampleValues[i].reverse(),
        y: otuLabels[i].reverse(),
        text : text[i].reverse()
      }];
      console.log(dataset);
      console.log(data);
      }
    }
    

    updatePlotly(data);

    
    }

    function updatePlotly(newdata) {

      console.log(newdata)

      
      Plotly.restyle("bar","x",[newdata]);
      Plotly.restyle("bar","y",[newdata]);
      Plotly.restyle("bar","text",[newdata]);
          
    }
   

    
        
});
// });

