var useridmap = new Map();

function setUser(SessionId, user) {
    useridmap.set(SessionId, user)
}

function getUser(SessionId) {
    return useridmap.get(SessionId)
}

module.exports = {
    setUser,
    getUser
} 