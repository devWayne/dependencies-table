function max(list) {
    list = list.map((item, index) => {
        return parseInt(item.split('.').join(''));
    });
    console.log(list);
    var max = Math.max.apply(null, list);
    var min = Math.min.apply(null, list);
    max = max.toString().split('').join('.');
    min = min.toString().split('').join('.');
    return {
        max: max
        min: min
    }
}

max(['4.0.1', '4.0.2']);
