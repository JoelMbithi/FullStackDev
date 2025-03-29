import User from '../routes/UserModel.js'

export const UploadProductPermission = async (userId) => {
    const user = await User.findById(userId)

    if(user.role  !== 'ADMIN'){
        return false
    }

    return true

}