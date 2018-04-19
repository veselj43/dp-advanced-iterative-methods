export function getRandomFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomBoolean() {
    return !!Math.round(Math.random());
}
