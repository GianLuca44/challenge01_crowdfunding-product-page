
export {start, drawDiagramm, drawWithData, drawLineDiagramm}

let CovidDataObject;

function start(){
    // Load csv file with Fetch API
    const a = fetch('./csv/Covid_19_Impfdaten_Kanton_Aargau.csv')
        .then(response => response.text())
        .then(text => processDataAsObj(text))
        .then(() => {
            //console.log(CovidDataObject);
                    })

    setTimeout(() => {  drawWithData();
        let lineChartCanvas = document.getElementById("line_chart");
        let ctx = lineChartCanvas.getContext("2d");
        drawLineDiagramm(days_selection_pm, ctx, lineChartCanvas,  5, 0);
        }, 2000);
}

const erstimpfungen_diagramValue = {
    values: [
        {A: "Jan", B: 32, C: "#FFFFFF"},
        {A: "Feb", B: 40, C: "#FFFFFF"},
        {A: "Mrz", B: 50, C: "#FFFFFF"},
        {A: "Apr", B: 20, C: "#FFFFFF"},
        {A: "Mai", B: 40, C: "#FFFFFF"},
        {A: "Jun", B: 60, C: "#FFFFFF"},
        {A: "Jul", B: 90, C: "#FFFFFF"},
        {A: "Aug", B: 75, C: "#FFFFFF"},
        {A: "Sep", B: 95, C: "#FFFFFF"},
        {A: "Okt", B: 120, C: "#FFFFFF"},
        {A: "Nov", B: 160, C: "#FFFFFF"},
        {A: "Dez", B: 100, C: "#FFFFFF"},
    ]
};

const zweitimpfungen_diagramValue = {
    values: [
        {A: "Jan", B: 60, C: "#2B9E90"},
        {A: "Feb", B: 60, C: "#2B9E90"},
        {A: "Mrz", B: 60, C: "#2B9E90"},
        {A: "Apr", B: 60, C: "#2B9E90"},
        {A: "Mai", B: 40, C: "#2B9E90"},
        {A: "Jun", B: 60, C: "#2B9E90"},
        {A: "Jul", B: 90, C: "#2B9E90"},
        {A: "Aug", B: 75, C: "#2B9E90"},
        {A: "Sep", B: 95, C: "#2B9E90"},
        {A: "Okt", B: 120, C: "#2B9E90"},
        {A: "Nov", B: 160, C: "#2B9E90"},
        {A: "Dez", B: 100, C: "#2B9E90"},
    ]
};


const data = {
    values: [
        {A: "Jan", B: 45, C: "#2B9E90"},
        {A: "Feb", B: 70, C: "#2B9E90"},
        {A: "Mrz", B: 100, C: "#2B9E90"},
        {A: "Apr", B: 100, C: "#2B9E90"},
        {A: "Mai", B: 100, C: "#2B9E90"},
        {A: "Jun", B: 100, C: "#2B9E90"},
        {A: "Jul", B: 100, C: "#2B9E90"},
        {A: "Aug", B: 100, C: "#2B9E90"},
        {A: "Sep", B: 100, C: "#2B9E90"},
        {A: "Okt", B: 150, C: "#2B9E90"},
        {A: "Nov", B: 180, C: "#2B9E90"},
        {A: "Dez", B: 200, C: "#2B9E90"},
    ]
};

//Data Graph
const dataImpfPerWeekday = {
    values: [
        {A: "So", B: 32, C: "#2B9E90"},
        {A: "Mo", B: 70, C: "#2B9E90"},
        {A: "Di", B: 25, C: "#2B9E90"},
        {A: "Mi", B: 20, C: "#2B9E90"},
        {A: "Do", B: 40, C: "#2B9E90"},
        {A: "Fr", B: 10, C: "#2B9E90"},
        {A: "Sa", B: 10, C: "#2B9E90"},
    ]
};


//Data Graph
const dataImpfPerCalWeek = {
    values: [
        {A: "KW6",  B: 8635, C: "#2B9E90"},
        {A: "KW7",  B: 6850, C: "#2B9E90"},
        {A: "KW8",  B: 11032, C: "#2B9E90"},
        {A: "KW9",  B: 15102, C: "#2B9E90"},
        {A: "KW10", B: 13551, C: "#2B9E90"},
        {A: "KW11", B: 13405, C: "#2B9E90"},
        {A: "KW12", B: 10492, C: "#2B9E90"},
        {A: "KW13", B: 16563, C: "#2B9E90"},
        {A: "KW14", B: 16072, C: "#2B9E90"},
        {A: "KW15", B: 20029, C: "#2B9E90"},
        {A: "KW16", B: 24481, C: "#2B9E90"},
        {A: "KW17", B: 10433, C: "#2B9E90"}
    ]
};

const SHIFT_SIZE = 35;
const BAR_PADDING = 5;

function drawWithData() {
    let lastCovidElement = CovidDataObject.length - 1;
    let lastBarIndex = 11;

    let dataIdx = lastCovidElement -7;

    while(lastBarIndex >= 0 ){

        // Diagram 2
        generateDiagram2_FromRealData(lastBarIndex)(dataIdx);

        // diagram 3
        generateDiagram3_FromRealData(lastBarIndex)(dataIdx);

        lastBarIndex--; dataIdx -= 7;
    }

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const width = 20; //bar width

    //assignRealData(data, 1);
    //assignRealData(data, 2);

    drawDiagramm(dataImpfPerWeekday, canvas, width, 0, true);

    drawDiagramm(dataImpfPerCalWeek, document.getElementById("myCanvas1"), width, 0, true);


    const lineChartCanvas = document.getElementById('line_chart');
    const lineChartCtx = lineChartCanvas.getContext('2d');

}

/**
 * Read real data from csv and assign to dataImpfPerWeekday
 * - data:
 * - typ:
 * @typedef {{data: object, typ: number }}
 */

function drawDiagramm(data1, canvas,  width, startPixel, drawLegende,ctx = canvas.getContext("2d")) {

    let calcMax = 0;
    Math.max(data1.values.forEach(
        num => num.B > calcMax? calcMax = num.B : "do nothing"
    ));
    console.log(calcMax)

    maxY = 0;
    minY = calcMax;


    function getBottomY() {
        return canvas.height - ((normalizeY(canvas.height)(h)) + SHIFT_SIZE);
    }

    function getTopY() {
        return normalizeY(canvas.height)(h);
    }

    for (let i = 0; i < data1.values.length; i++) {
        ctx.fillStyle = data1.values[i].C;
        var h = data1.values[i].B;
        ctx.fillRect(startPixel, getBottomY(h), width, getTopY());
        startPixel += width + BAR_PADDING;
        /* text to display Bar number */
        //ctx.fillStyle = data1.values[i].C;
        if(drawLegende === false){} // do nothing
        else {
            // rotate context to write from bottom to top
            ctx.rotate(-Math.PI * 90 / 180);
            // legenden-beschriftungen
            ctx.fillStyle = "#FCCC56";
            ctx.font = "12px Arial";
            ctx.fontWeight = "bold"
            ctx.fillText(data1.values[i].A, -canvas.height, startPixel - 15);
            // rotate context back
            ctx.rotate(Math.PI * 90 / 180);
        }
    }

}

function drawLineDiagramm(data2, ctx, canvas, width, startPixel) {

    let calcMax = 0;
    // TODO:dynamically calculate value on the top of Diagram
    // Static Diagram-Range
    maxY = 200000;
    minY = 0;

    // console.warn(Math.max(data2.values.forEach(
    //     num => num.B > calcMax? calcMax = num.B : "do nothing"
    // )));
    console.log(calcMax)

    let numberOfBars = 14*6;
    let widthDynamic = floor(canvas.width / numberOfBars);
    ctx.moveTo(0,0);
    const calculateY = h => {
        return (normalizeY(canvas.height)(h))
    }

    let current_YValue = 0;


    console.log(vaccines);
    // first line (Vaccine doses given )
    ctx.strokeStyle = '#2B9E90'
    days_selection_pm.forEach( (calendarweekArr, i) =>{
        let oldStartPixelForWeekSeparation = startPixel;
        calendarweekArr.forEach( ( dayEl, dayindex) => {
            // draw WeekSeparationFrame
            // first two numbers are KW nr and year, skip these
            if(dayindex > 2) {
                // sum up the value over time
                current_YValue += Number(dayEl[1]);
                ctx.lineTo(startPixel, calculateY(current_YValue ));
                ctx.stroke();
                startPixel += widthDynamic ;
            }
        })

        // highlight odd columns
        const isEven = i %2 ===0;
        ctx.fillStyle = isEven ? 'transparent' : '#265C61';
        ctx.fillRect(
            oldStartPixelForWeekSeparation, 0,
            startPixel- oldStartPixelForWeekSeparation, canvas.height )

        // draw week number (vertical with 10px padding)
        let padding = 10
        ctx.fillStyle = "#FCCC56";
        ctx.fillText("KW "+calendarweekArr[1], oldStartPixelForWeekSeparation + padding, padding)


    })

    // draw left axis
    ctx.strokeStyle = '#FCCC56';
    ctx.moveTo(0,0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    // set text color
    ctx.fillStyle = '#FCCC56';
    ctx.fillText(maxY, 5,22);
    ctx.fillText(minY, 5,canvas.height - 10);

    // draw bottom axis
    let legende = document.getElementById("line_chart_legende_bottom");
    let legendeCtx = legende.getContext("2d");

    legendeCtx.strokeStyle = '#FCCC56';
    legendeCtx.moveTo(0,0);
    legendeCtx.lineTo(canvas.width, 0);
    legendeCtx.stroke();


    startPixel =0;

    console.log(calculateY(0))
    ctx.lineTo(startPixel, calculateY(0));
    ctx.stroke();

    console.error( vaccines[2][2][1] );
    let vacc_current_YValue = 0;
    vaccines.forEach( (cw, i) =>{
        //     let oldStartPixelForWeekSeparation = startPixel;
        cw.forEach( ( dE, dayindex) => {
            //         // draw WeekSeparationFrame
            //         // first two numbers are KW nr and year, skip these
            if (dayindex > 2) {
                // values are already the sum the value over time
                //
                vacc_current_YValue = Number(dE[2]); //
                ctx.lineTo(startPixel, calculateY(vacc_current_YValue));
                ctx.stroke();
                startPixel += widthDynamic ;
            }
        });
    });
    // second line (received vaccine doses)
    //ctx.lineTo(0,canvas.height) // bottom left


}

const generateDiagram2_FromRealData = barIdx => dataIdx =>{
    let weeklyData = CovidDataObject.slice(dataIdx, dataIdx +6);
    let result = [];

    // extract number of Vaccinates per week
    for (let j = 0; j < 6; j++) {
        result.push(Number(weeklyData[j]["Totale Impfungen (täglich)"]));
    }

    //dataImpfPerCalWeek.values[barIdx].B = result.reduce( (prev, curr) => prev + curr );

}

/*
* the Function for Diagram3
* */
const generateDiagram3_FromRealData = barIdx => dataIdx =>{
    let weeklyData = CovidDataObject.slice(dataIdx, dataIdx +6);
    
    let erstimpfungen_weekday_separated = [];
    let zweitimpfungen_weekday_separated = [];

    // extract number of Vaccinates per week
    for (let j = 0; j < 6; j++) {
        erstimpfungen_weekday_separated.push(Number(weeklyData[j]["Total Erstimpfungen (täglich)"]));
        zweitimpfungen_weekday_separated.push(Number(weeklyData[j]["Total Zweitimpfungen (täglich)"]));

    }

    // calculate the values (sum up all from previous read data)
    erstimpfungen_diagramValue.values[barIdx].B = erstimpfungen_weekday_separated.reduce( (prev, curr) => prev + curr );
    zweitimpfungen_diagramValue.values[barIdx].B = zweitimpfungen_weekday_separated.reduce( (prev, curr) => prev + curr );
    
    // the width of a single bar
    let width = 20;

    // set a common maxValue for the diagram
    let maxVal = 17000;

    drawDiagrammNormalized(zweitimpfungen_diagramValue, document.getElementById("myCanvas2"), width/2, 0, false, maxVal);
    drawDiagrammNormalized(erstimpfungen_diagramValue, document.getElementById("myCanvas2"), width/2, width/2, true, maxVal);

}

function drawDiagrammNormalized(data1, canvas,  width, startPixel, drawLegende,calcMax, ctx = canvas.getContext("2d")) {

    maxY = 0;
    minY = calcMax;


    for (let i = 0; i < data1.values.length; i++) {
        ctx.fillStyle = data1.values[i].C;
        const h = data1.values[i].B;
        ctx.fillRect(startPixel, canvas.height - ((normalizeY(canvas.height)(h)) + SHIFT_SIZE), width, (normalizeY(canvas.height)(h)));
        //startPixel += width + BAR_PADDING;
        startPixel += 2*width + BAR_PADDING;
        /* text to display Bar number */
        //ctx.fillStyle = data1.values[i].C;
        if(drawLegende === false){} // do nothing
        else {
            // rotate context to write from bottom to top
            ctx.rotate(-Math.PI * 90 / 180);
            // legenden-beschriftungen
            ctx.fillStyle = "#FCCC56";
            ctx.font = "12px Arial";
            ctx.fontWeight = "bold"
            ctx.fillText(data1.values[i].A, -canvas.height, startPixel - 15);
            // rotate context back
            ctx.rotate(Math.PI * 90 / 180);
        }
    }

}

//if your csv file contains the column names as the first line
function processDataAsObj(csv) {
    let allTextLines = csv.split(/\r\n|\n/);
    let lines = [];

    //first line of csv
    let keys = allTextLines.shift().split(';');


    // TODO: fix detection of Empty Data
    let EMPTY_COLUMNS = 15;
    while (allTextLines.length - EMPTY_COLUMNS) {
        let arr = allTextLines.shift().split(';');
        let obj = {};
        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = arr[i];
        }

        // INFO: parse the Date here
        obj.Datum = new Date(obj.Datum);
        //	console.log(obj.Datum.getFullYear());
        lines.push(obj);

    }


    CovidDataObject = lines;

    // return lines for automated tests
    return lines;
}

let minY = 0;
let maxY = 1700;
const normalizeY = height => y => {
    let scaleFactor = height / (maxY - minY);
    return height - (y - minY) * scaleFactor;
};

const normalizeX = width => x => {
    let scaleFactor = width / (maxX - minX);
    return ( x - minX) * scaleFactor;
};



