interface IUser{
    firstName?: string,
    lastName?: string,
    isCritic?: boolean,
    role?: string,
    userId?: number
}

let data : IUser = {
    firstName : 'Alex',
    lastName : 'Berezhnykh',
    isCritic : false,
    role: 'teacher',
    userId : 1
}

export default data