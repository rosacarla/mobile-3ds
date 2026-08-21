import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({ name: "pagamentos.db", location: "default" });

export default function App() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, valor REAL);"
      );
    });
    carregarHistorico();
  }, []);

  const carregarHistorico = () => {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM historico", [], (_, { rows }) => {
        setHistorico(rows.raw());
      });
    });
  };

  const iniciarPagamento = async () => {
    try {
      const itens = [{ nome: "Produto Teste", preco: 10.0, quantidade: 1 }];

      const response = await fetch("http://10.0.2.2:3000/pagar", { // 🔹 10.0.2.2 acessa localhost no emulador Android
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens }),
      });

      const data = await response.json();
      await WebBrowser.openBrowserAsync(data.init_point);

      db.transaction(tx => {
        tx.executeSql("INSERT INTO historico (descricao, valor) VALUES (?, ?)", [
          "Produto Teste",
          10.0,
        ]);
      });

      carregarHistorico();
      alert("Pagamento iniciado e registrado no histórico!");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Protótipo Mercado Pago + SQLite</Text>
      <Button title="Pagar Produto Teste" onPress={iniciarPagamento} />
      <View style={{ marginTop: 20 }}>
        <Text>Histórico:</Text>
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
