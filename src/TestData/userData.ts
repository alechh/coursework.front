interface IUser{
    firstName?: string,
    lastName?: string,
    isCritic?: boolean,
    role?: string
}

let data : IUser = {
    firstName : 'Alex',
    lastName : 'Berezhnykh',
    isCritic : false,
    role: 'curator'
}

export default data