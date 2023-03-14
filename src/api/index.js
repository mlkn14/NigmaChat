import ajax from './ajax'


export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')

export const reqRegister = ({username, password}) => ajax('/register',{username, password}, 'POST')

export const reqMessages = ()=>ajax('/chat')

export const reqMessage = ({msgid})=>ajax('/message', {msgid})

export const reqUser = ({userid})=>ajax('/user', {userid}, 'POST')

export const reqUpdateUser = ({userid, username, password, signature, avatar}) => ajax('/updateuser', {userid, username, password, signature, avatar}, 'POST')
