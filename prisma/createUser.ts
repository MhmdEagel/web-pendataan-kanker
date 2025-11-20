import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  // Hash Password
  const hashedPassword = await bcrypt.hash("GwehKeren123!", 10); // ganti password
  console.log("🙍‍♂️ Mebuat user baru...");
  await prisma.user.create({
    data: {
      email: "muhammadeageltri@gmail.com", // ganti email
      fullname: "Muhammad Eagel Triutama", // ganti nama
      password: hashedPassword,
    },
  });
  console.log("✅ Membuat user baru selesai.");

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
