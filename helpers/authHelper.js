const bcrypt = require('bcrypt')
exports.hashPassword=async (password) =>{

    try {
        const saltRounds  = 10
        const hashedPassword  = await bcrypt.hash(password,saltRounds)
        
        console.log(hashedPassword);
        return hashedPassword
    } catch (error) {
        console.log('hashing error')
    }

}
exports.comparePassword = async(password,hashedPassword)=>{
  try {
    return bcrypt.compare(password,hashedPassword)
    
  } catch (error) {
    console.log('password is not matching')
  }
}