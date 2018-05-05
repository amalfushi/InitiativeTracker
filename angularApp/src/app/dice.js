
function dice(str) {
    let parse =  str.match(/(\d*)(D\d*)((?:[+*-](?:\d+|\([A-Z]*\)))*)(?:\+(D\d*))?/i)
    console.log(parse)
    let out = 0
    const amount = parse[1] === "" ? 1 : parse[1]
    const die = parseInt(parse[2].split("d")[1])
    for (let i = 0; i < amount; i++){
        const roll = Math.ceil(Math.random() * die);
        // console.log(roll);
        out += roll;
    }
    return parse[3] === "" ? out : out+2;
}


let st = "d6+2,3d10";
let rolls = st.split(",");
console.log(rolls)

for (let roll of rolls) console.log(dice(roll))
