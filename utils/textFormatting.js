function toTitleCase(data) {
    if (typeof data == "string") {
        return data.replace(/\w\S*/g, function (text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    } else {
        return;
    }
}

export { toTitleCase };
