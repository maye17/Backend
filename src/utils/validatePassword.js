const bcrypt = require('bcrypt');

async function validatePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error al validar la contraseña:', error);
    throw error;
  }
}

module.exports = validatePassword;