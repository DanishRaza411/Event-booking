import bcrypt from "bcryptjs"
const plainPassword = '123456'; // Replace with desired password

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});