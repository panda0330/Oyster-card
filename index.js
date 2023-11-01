function calc_cost(a, b) {
    //any three zones
    if (Math.abs(a - b) == 2) {
        return 3.2;
    }
    // anywhere in zone 1
    if (a == 1 && b == 1) {
        return 2.5;
    }
    //any one zone outside 1
    if (a == b && a != 1) {
        return 2;
    }
    //any tow zones including zone 1
    if (Math.abs(a - b) == 1 && (a == 1 || b == 1)) {
        return 3;
    }
    //any two zones excluding zone 1
    if (Math.abs(a - b) == 1 && a != 1 && b != 1) {
        return 2.25;
    }
}

function calc_balance(start, end, transpotation, swipe, test_data) {
    let m_stationName = [];
    var start_zones = [], end_zones = []
    var start_zone_str, end_zone_str;

    if (start.value == end.value) {
        alert("You are goint to the same station!");
        return 0;
    }
    else {
        if (transpotation.value == "Bus") {
            return 1.8;
        }
        else {
            if (swipe.checked == false) {
                return 3.2;
            }
            for (var i = 0; i <= 3; i++) {
                m_stationName.push(test_data.stations[i].stationName);
            }
            for (var i = 0; i <= 3; i++) {
                if (m_stationName[i].indexOf(start.value) >= 0) {
                    start_zone_str = test_data.stations[i].zone;
                    start_zone_str.split(",").forEach((z) => start_zones.push(parseInt(z)));
                }
                if (m_stationName[i].indexOf(end.value) >= 0) {
                    end_zone_str = test_data.stations[i].zone;
                    end_zone_str.split(",").forEach((z) => end_zones.push(parseInt(z)));
                }
            }
            let cost = Number.MAX_VALUE
            for (let i = 0; i < start_zones.length; i++)
                for (let j = 0; j < end_zones.length; j++)
                    cost = Math.min(cost, calc_cost(start_zones[i], end_zones[j]))
            return cost;
        }
    }
}

function add_click(e) {
    const element = document.getElementById("show_chanel");
    const money = document.getElementById("current_money");
    const startPoint = document.getElementById("starting_point");
    const destination = document.getElementById("destination");
    const transpotation = document.getElementById("transpotation");
    const swipe = document.getElementById("swipe");
    const input = {
        "stations":
            [
                { "stationName": "Holborn", "zone": "1" },
                { "stationName": "Earl", "zone": "1,2" },
                { "stationName": "Wimbledon", "zone": "3" },
                { "stationName": "Hammersmith", "zone": "2" }
            ]
    }
    const cost = calc_balance(startPoint, destination, transpotation, swipe, input);

    money.value = money.value - cost;
    let msg = "From" + "\t" + "'" + startPoint.value + "'" + "\t" + "to" + "\t" + "'" + destination.value + "'" + "\t" + "by" + "\t" + transpotation.value + "\t" + ":" + "\t" + "£" + cost;
    const node = document.createElement("div");
    node.className = "alert alert-success";
    const textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    element.appendChild(node);

}
function reset_click() {
    const element = document.getElementById("show_chanel");
    const money = document.getElementById("current_money");
    element.innerText = "";
    money.value = 30;
}