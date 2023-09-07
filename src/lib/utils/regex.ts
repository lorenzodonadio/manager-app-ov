export const matchEmail = (text: string): boolean => {
	const mailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const re = text.match(mailRe);
	if (!re) return false;
	return re[0] === text;
};
export const matchURL = (text: string): boolean => {
	/* Thanks to https://regexr.com/39nr7 */
	const urlRe =
		/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	const re = text.match(urlRe);
	if (!re) return false;
	return re[0] === text;
};
