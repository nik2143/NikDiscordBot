module.exports.getRandomIndex = function randomIndex(array){
    return Math.floor(Math.random()*array.length);
}

module.exports.getUserFromMention = function getUserFromMention(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);

	if (!matches) return;

	const id = matches[1];

	return client.users.cache.get(id);
}