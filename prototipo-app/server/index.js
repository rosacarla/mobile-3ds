import express from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

app.post("/pagar", async (req, res) => {
  try {
    const { itens } = req.body;

    const preference = {
      items: itens.map((item) => ({
        title: item.nome,
        unit_price: item.preco,
        quantity: item.quantidade || 1,
      })),
      back_urls: {
        success: "http://localhost:19006/success",
        failure: "http://localhost:19006/failure",
        pending: "http://localhost:19006/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
