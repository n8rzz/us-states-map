import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as usStates from "../public/data/us.json";
import * as topojson from "topojson";

function onLoadUsStates(svg, path) {
  const states = topojson.feature(usStates, usStates.objects.states).features;

  svg
    .selectAll(".state")
    .data(states)
    .enter()
    .append("path")
    .attr("class", "state")
    .attr("d", path);
}

export function UsStatesMap() {
  const ref = useRef();

  useEffect(() => {
    const margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    };
    const xMargin = margin.left + margin.right;
    const yMargin = margin.top + margin.bottom;
    const width = 800 - xMargin;
    const height = 400 - yMargin;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(850);
    const path = d3.geoPath().projection(projection);

    onLoadUsStates(svg, path);
  }, []);

  return <svg width={800} height={400} id="us-states-map" ref={ref} />;
}
