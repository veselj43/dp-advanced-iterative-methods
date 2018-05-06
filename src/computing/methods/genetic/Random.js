/**
 * Gets random float from min included and max excluded.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}
/**
 * Gets random int from min included and max excluded.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets random boolean.
 * @returns {boolean}
 */
export function getRandomBoolean() {
    return !!Math.round(Math.random());
}
