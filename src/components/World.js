import jsonData from "../data/food_insecurity_data.json";
import countries from "../data/ne_110m_admin_0_countries.json"
import Globe from 'react-globe.gl';
import * as d3 from 'd3';
import { useState } from "react";

const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
const getMalnutrition = name => {
    if (name == 'S. Sudan') {
        name = 'South Sudan'
    }
    if (name == 'Dem. Rep. Congo') {
        name = 'Democratic Republic of the Congo'
    }
    if (name == 'Central African Rep.') {
        name = 'Central African Republic'
    }
    const country = jsonData.filter((x) => {
        return x.Area === name;
    })
    if (country.length == 0)
        return -1

    const malnutrition = country[1].Value;
    if (malnutrition === "<2.5") {
        return 0
    }
    else if (malnutrition === "") {
        return -1
    }
    else {
        return parseFloat(malnutrition/100)
    }
}
const getVal = feat => getMalnutrition(feat.properties.NAME);

function World() {
    const [hoverD, setHoverD] = useState();
    return (
        <div>
            <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                lineHoverPrecision={0}

                polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
                polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
                polygonCapColor={d => d === hoverD ? 'steelblue' : getVal(d) == -1 ? 'black' : colorScale(getVal(d))}
                polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
                polygonStrokeColor={() => '#111'}
                polygonLabel={({ properties: d }) => `
                    <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
                    Undernutrition Proportion: <i>${
                        getMalnutrition(d.NAME) == -1 ? "Unknown" : (getMalnutrition(d.NAME) == 0 ? "<2.5%" : Math.round(getMalnutrition(d.NAME)*1000)/10 + '%')
                    }</i><br/>
                    Population: <i>${Math.round((d.POP_EST)/Math.pow(10,6)*10)/10} Mil</i>
                `}
                onPolygonHover={setHoverD}
                polygonsTransitionDuration={300}
            />
        </div>
    );
}

export default World;