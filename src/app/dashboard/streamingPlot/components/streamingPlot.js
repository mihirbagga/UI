import React, { Component } from "react";
import { Container } from "@material-ui/core";
import createPlotlyComponent from 'react-plotly.js/factory';
// import "./style.css";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class StreamingPlot extends Component {
  state = {
    data: [
      {
        x: [1, 2, 3],
        y: [1, 2, 3].map(this.getRandom),
        mode: "lines",
        line: { color: "#80CAF6", width: 4 }
      }
    ],
    layout: {
      datarevision: 0,
      xaxis: {
        title: {
          text: 'Time',
          font: {
            size: 18,
            color: '#303f9f'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Value',
          font: {
            size: 18,
            color: '#303f9f'
          }
        }
      }
    },
    revision: 0
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawChart();
  }

  getRandom() {
    let array = new Uint32Array(1);
    const randomNumber = window.crypto.getRandomValues(array);
    return randomNumber[0]
  }

  drawChart() {
    let count = 0;
    let maxPoint = 20;
    var interval = setInterval(() => {
      if (++count === 1000) {
        clearInterval(interval);
      }
      const { data, layout } = this.state;
      let random = this.getRandom();
      if (count > 2) {
        data[0]["x"].push(count);
      }
      data[0]["y"].push(random);
      // if (count % 40 == 0) {
      //   // data[0]["x"].splice(0, 15);
      //   data[0]["y"].splice(0, 15);
      // }
      this.setState({ revision: this.state.revision + 1 });
      layout.datarevision = this.state.revision + 1;
      if (count > maxPoint) {
        data[0].y.shift();
        data[0].x.shift();
      }
    }, 300);
  }

  render() {
    const { data, layout, revision } = this.state;
    return (
      <div style={{ marginTop: "30px" }}>
        <Container>
          <Plot data={data} layout={layout} revision={revision} />
        </Container>
      </div>
    );
  }
}

export default StreamingPlot;
