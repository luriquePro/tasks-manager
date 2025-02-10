// Importar APP express
const { application } = require("./app");

const PORT = 3000;

application.listen(PORT, () => console.log(`Server running on port ${PORT}`));
