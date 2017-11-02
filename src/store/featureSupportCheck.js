function checkObj(dependencyName, supportCheckCondition, consequence, longDescription) {
    return {
        dependencyName,
        isSupported: !!supportCheckCondition,
        consequence,
        longDescription
    }
}

const deps = [
    checkObj(
        'IndexedDB',
        window.indexedDB,
        "You can't generate big instances directly as problem input."
    ),
    checkObj(
        'Web Workers',
        Worker !== undefined,
        "You can't compute or generate any instance."
    )
];

export default deps;

export const missingFeatures = deps.filter(dep => !dep.isSupported);

export const metFeatures = deps.filter(dep => dep.isSupported);
