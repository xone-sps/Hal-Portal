export default function (array = []) {
    const option = {}
    for (const item of array) {
        if (Object.keys(item).length == 1 && item[Object.keys(item)]) {
            option[Object.keys(item)] = item[Object.keys(item)]
        }
    }
    return option
}
