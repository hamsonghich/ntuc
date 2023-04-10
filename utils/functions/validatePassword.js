export const isStrongPassword = (value) => {
	const reg = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()\-_=+|\[\]{}:;"'/?.>,<])(?:.*[0-9])/
	return reg.test(value);
}

export const isLeast8Characters = (value) => {
	const reg = /(?=.{8,})/
	return reg.test(value);
}


export const isContainUppercase = (value) => {
	const reg = /(?=.*[A-Z])/
	return reg.test(value);
}

export const isContainLowercase = (value) => {
	const reg = /(?=.*[a-z])/
	return reg.test(value);
}


export const isContainNumber = (value) => {
	const reg = /(?=.*[0-9])/
	return reg.test(value);
}


export const isContainSymbol = (value) => {
	const reg = /(?=.*[~!@#$%^&*()\-_=+|\[\]{}:;"'/?.>,<])/
	return reg.test(value);
}

export const isNotRepeats4Times = (value) => {
	const arr = (value || '').split('');
	if (arr) {
		for (var i in arr.length) {
			let count = arr.filter(x => x == arr[i]).length
			if (count >= 4) return false
		}
		return true
	}
	return true
}
