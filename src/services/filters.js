export default {
    parseTime: function(processTime) {
        var parsed = "";
        if (processTime) {
            if (processTime < 1) {
                return "< 1 ms";
            }

            var time = [
                {name: "m", value: Math.floor(processTime / (1000 * 60))},
                {name: "s", value: Math.floor(processTime / 1000)},
                {name: "ms", value: Math.floor(processTime % 1000)}
            ];
            time.filter(unit => unit.value > 0).forEach(unit => {
                parsed += " " + unit.value + " " + unit.name;
            });
        }
        return parsed;
    }
};
