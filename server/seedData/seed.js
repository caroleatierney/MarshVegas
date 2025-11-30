// This will populated the Neon Database

require("dotenv").config();
const client = require("../postgres"); // this is your database connection

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // OPTIONAL: drop table if you want to reset each time
    // await client.query(`DROP TABLE IF EXISTS beaches;`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS beaches (
        id SERIAL PRIMARY KEY,
        name TEXT,
        photo TEXT,
        photo_credit TEXT,
        access TEXT,
        parking TEXT,
        hours TEXT,
        avail_rec TEXT,
        notes TEXT,
        latitude NUMERIC,
        longitude NUMERIC
      );
    `);

    await client.query(`
      INSERT INTO beaches 
      (name, photo, photo_credit, access, parking, hours, avail_rec, notes, latitude, longitude)
      VALUES 
      ('Rexhame Beach', 'https://i.imgur.com/oiKe0rJ.jpg', 'South Shore Trails', 'Public', 'Weekday: $15, Weekend: $20...', 'Monday: 6am - 10pm...', 'https://i.imgur.com/FAOW8rW.png, https://i.imgur.com/boTxmLr.png...', 'Rexhame is my favorite beach...', 42.124, -70.677),

      ('Sunrise Beach', 'https://i.imgur.com/J7I7QGt.jpg', 'Bedroomvillas.org', 'Public', 'No public parking...', 'Monday: 6am - 10pm...', 'https://i.imgur.com/FAOW8rW.png, https://i.imgur.com/gSIFxt4.png...', 'This beach is known for its beautiful sunrises...', 42.105, -70.660),

      ('Burkes Beach', 'https://i.imgur.com/P9mTqEB.jpg', 'rightcitydata.com', 'Public', 'Weekday: $15, Weekend: $20...', 'Monday: 6am - 10pm...', 'https://i.imgur.com/FAOW8rW.png, https://i.imgur.com/EJwnOgi.png...', 'Burkes Beach is a great beach for families...', 42.077, -70.646),

      ('Fieldston Beach', 'https://i.imgur.com/Jp5viWD.jpg', 'NSRWA', 'Public', 'Limited resident parking...', 'Monday: 6am - 10pm...', 'https://i.imgur.com/FAOW8rW.png...', 'Adjacent to Sunrise Beach...', 42.108, -70.663),

      ('Brant Rock Beach', 'https://i.imgur.com/bXIvGgd.jpg', 'FidoLoves.org', 'Public', 'Resident sticker parking...', 'Monday: 6am - 10pm...', 'https://i.imgur.com/FAOW8rW.png...', 'Brant Rock Beach is dog friendly...', 42.090, -70.641),

      ('Ocean Bluff Beach', 'https://i.imgur.com/FOKvHiZ.jpg', 'Vrbo.org', 'Public', 'No public parking...', 'Monday: 6am - 10pm...', 'https://i.imgur.com/FAOW8rW.png...', 'Never been!!! On my bucket list.', 42.099, -70.652);
    `);

    console.log("✅ Seeding complete!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
