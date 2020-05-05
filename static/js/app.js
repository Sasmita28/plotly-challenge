function fetchData() {
  d3.json("samples.json").then(data => {

    // console.log(data);
    samplesMetadata= data.metadata;
    // console.log(samplesMetadata[0]);
    var ul = d3.select("#sample-metadata").append("ul");
    sample_init= samplesMetadata[0];
   
    Object.entries(sample_init).forEach(([key,value]) =>{
       var li = ul.append("li").text(`${key}:${value}`);
      });

    d3.selectAll("li").style("list-style", "none");
     
  // optionChanged();
// buildChart(); 
  });
};


// fetchData();

function buildChart() {

  d3.json("samples.json").then(data => {


   
    // console.log(sampleValues);

    samples = data.samples;
    //    console.log(samplesFiltered);

    var id = samples.map(row => row["id"]);
    var sampleValues = samples.map(row => row["sample_values"]);
    var labels =samples.map(row => row["otu_ids"]);
    var text = samples.map(row => row["otu_labels"]);

    var strLabel = labels[0].toString().split(",");
    var testing = strLabel.map(element => `OTU ${element}`);
    initBar();
    initBubble();

    optionChanged();
    
    // // ************* for bar chart ************
    function initBar() {
      var data = [{

        x: sampleValues[0].slice(0,10).reverse(),
        y: testing.slice(0,10).reverse(),
        type: "bar",
        orientation : "h",
        text : text[0].slice(0,10).reverse()
      }];
    
      var layout = {
        height: 500,
        width: 350
      };
    
      Plotly.newPlot("bar", data, layout);
     
    };
  


  // ************* for bubble chart ************
    function initBubble() {
      var trace1 = {
        x: labels[0],
        y: sampleValues[0],
        text : text[0],
        mode: 'markers',
        marker: {
          size: sampleValues[0],
          color : labels[0],
          
        }
      };
      
      var data = [trace1];
      
      var layout = {
        // title: 'Marker Size',
        showlegend: false,
        height: 550,
        width: 1200,
        xaxis: { title: "OTU ID" },
      };
    
      Plotly.newPlot("bubble", data, layout);

    };

  });

}
  // *****************************************

function startPage(){
  fetchData();
  buildChart();
}

startPage();

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(){

  d3.json("samples.json").then(data => {

    samplesMetadata= data.metadata;

    // console.log(data);
    samples= data.samples;
  

    var id = samples.map(row => row["id"]);
    var sampleValues = samples.map(row => row["sample_values"]);
    var labels =samples.map(row => row["otu_ids"]);
    var text = samples.map(row => row["otu_labels"]);
    var labelStr = labels.map(arr => arr.toString().split(","));
   var otuLabels = labelStr.map(arr =>arr.map(element => `OTU ${element}`) );

    id.forEach(person => {
          d3.select('#selDataset').append("option").attr("value",person).text(person);
          });

    var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    var ul = d3.select("ul").html("");
    
             

    for (var i = 0; i < samples.length; i++) {
      if (dataset === id[i]){
       
        x= sampleValues[i].slice(0,10).reverse(),
        y= otuLabels[i].slice(0,10).reverse(),
        text = text[i].slice(0,10).reverse()

              
        Object.entries(samplesMetadata[i]).forEach(([key,value]) =>{
          d3.select("ul").append("li").text(`${key}:${value}`);
          d3.selectAll("li").style("list-style", "none");
          
        });

        
        x1= labels[i],
        y1 = sampleValues[i],
        text1 = text[i]
        marker= {
            size: sampleValues[i],
            color : labels[i],
            
          }
    
      // console.log(dataset);
      // console.log(data);
      }
    }

  


    updatePlotly(x,y,text);
    updateBubbleChart(x1,y1,text1,marker);


  });


};

optionChanged();


function updatePlotly(x,y,text) {

  
  Plotly.restyle("bar","x",[x]);
  Plotly.restyle("bar","y",[y]);
  Plotly.restyle("bar","text",[text]);   
}

function updateBubbleChart(x,y,text,marker){

  Plotly.restyle("bubble","x",[x]);
  Plotly.restyle("bubble","y",[y]);
  Plotly.restyle("bubble","text",[text]);
  Plotly.restyle("bubble","marker",[marker]);
        

}

    

     
