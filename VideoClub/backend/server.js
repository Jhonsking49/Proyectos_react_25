import app from "./app.js"; // Asegúrate de incluir la extensión .js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
