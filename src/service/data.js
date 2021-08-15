export default function date(time) {
	const data = (Date.now() - time) * 2.7777777777778e-7;
	const day = Math.floor(data / 24);
	if (data < 24) {
		return '오늘';
	}
	return `${day}일전`;
}
