const valid = (firstName, username, email, password, role, type) => {
    console.log(firstName, username, email, password, role, type)
    if (type === 'login') {
        if(!email || !password)
        return 'Please fill all fields.'
    } else if (type === 'signup') {
        if(!firstName || !username || !email || !password) {
            return 'Please fill all fields.'
        }
    } else if (type === 'edit') {
        if(!firstName || !username || !email || !role) {
            return 'Please fill all fields.'
        }

        if(role !== 'admin' && role !== 'user') {
            return 'Invalid role.'
        }
    }

    if(!validateEmail(email))
    return 'Invalid emails.'

    if(password.length < 6 && type === 'signup')
    return 'Password must be at least 6 characters.'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid