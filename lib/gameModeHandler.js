const modeSettings = {
    rugby: {
        timer: true,
        halfTimeIndicator: true,
        scoreFormat: ["tries", "conversions", "penalties", "dropgoals"],
    },
    cricket: {
        timer: false,
        halfTimeIndicator: false,
        scoreFormat: ["wickets", "runs", "overs"],
    },
};

function getModeSettings(mode) {
    return modeSettings[mode];
}

export { getModeSettings };
