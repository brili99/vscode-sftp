
const Nothing = (() => {
	const fn = () => Nothing
	fn.toString = fn.toLocaleString = fn[Symbol.toPrimitive] = () => ''
	fn.valueOf = () => false

	return new Proxy(fn, {
		get: (o, key) => Object.prototype.hasOwnProperty.call(o, key) ? o[key] : Nothing
	})
})()

module.exports = Nothing;
