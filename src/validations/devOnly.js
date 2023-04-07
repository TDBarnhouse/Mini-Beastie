module.exports = (interaction, commandObj) => {
    if (commandObj.devOnly) {
        if (interaction.member.id !== MEMBER_ID) {
            interaction.reply('This command is for the developer only.');
            return true;
        }
    }
};