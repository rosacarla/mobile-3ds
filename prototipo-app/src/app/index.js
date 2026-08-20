import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function Index() {
  const [historico, setHistorico] = useState([]);

  const iniciarPagamento = async () => {
    try {
      const itens = [{ nome: "Produto Teste", preco: 10.0, quantidade: 1 }];

      // 🔹 Use o endereço público do Codespaces em vez de localhost
      const response = await fetch("https://reimagined-fiesta-rw7prr7q76r35rxp-3000.app.github.dev/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens }),
      });

      const data = await response.json();
      await WebBrowser.openBrowserAsync(data.init_point);

      // Mock do histórico em memória (sem SQLite)
      setHistorico([...historico, { descricao: "Produto Teste", valor: 10.0 }]);

      alert("Pagamento iniciado!");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Protótipo Mercado Pago (Mock)</Text>
      <Button title="Pagar Produto Teste" onPress={iniciarPagamento} />
      <View style={{ marginTop: 20 }}>
        <Text>Histórico (mockado):</Text>
        {historico.map((item, idx) => (
          <Text key={idx}>{item.descricao} - R$ {item.valor}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  titulo: { fontSize: 20, marginBottom: 20, fontWeight: "bold" },
});
