/* Check if a string is already ISO-8601 compliant. */
/**
 * @param {string} input_string
 */
function isISO8601(input_string) {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

    return iso8601Regex.test(input_string)
}

/* Convert a date string from Taskwarrior to an ISO-8601 string. */
/**
 * @param {string | undefined} input_string
 */
export function convertTaskwarriorDateToISO8601Format(input_string, undefined_value = null) {
    if (input_string === undefined) {
        return (undefined_value === null) ? input_string : undefined_value
    }

    if (isISO8601(input_string)) return input_string

    const year = input_string.slice(0, 4)
    const month = input_string.slice(4, 6)
    const day = input_string.slice(6, 8)
    const hour = input_string.slice(9, 11)
    const minute = input_string.slice(11, 13)
    const second = input_string.slice(13, 15)
    const timezone = input_string.slice(15)

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`
}