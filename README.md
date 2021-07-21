# Geneology Chart




## Installation

npm install mr-tree
## Usage
`import Tree from mr-tree `
`function App()
{
return (<Tree config={config}/>
}
`
 




## Config Structure
const config =
  {
  data:chartData[0],     //Data for plotting Tree
  
  legend : [{ 'icon': '#0000FF', 'name': 'Material' }, { 'icon': '#ff0000', 'name': 'Process Order ' }],     //Legends of The Tree  icon : 'image URL or HEX Code of color'
        
  contextmenu: [{
    Text: 'HOME',
    Url: 'http://www.google.com',
  },

  {
    Text: 'Google Link',
    Url: 'http://www.google.com',
   
  },
  {
    Text: 'Google Link',
    Url: 'http://www.google.com',
  },
  {
    Text: 'Yahoo!!',
    Url: 'http://www.google.com',
  }
  ],   //Context Menu Right Click
  
  zoom: true,  //zoom
  
  chartType: 'backward',   //chartType
  
  handleChartClick:this.handleChartClick,     // on click of the node
  
  selectedHeader:selectedHeader,   // Header value
  
  getBackwardData:getBackwardData,   // for backward data
  
  getForwardData:getForwardData, //for forward data
  
  showTreePlot:showTreePlot,  //Tree to be shown or not
  
  nodeId:nodeId,  // Id of the node
  
  loader: false // loader
}

