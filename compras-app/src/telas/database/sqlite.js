import * as SQLite from "expo-sqlite";

// abre (ou cria) o banco local
const db = SQLite.openDatabase("pedidos.db");

// inicializa a tabela de pedidos
export function inicializarBanco() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT,
        itens TEXT,
        total REAL
      );`
    );
  });
}

// salva um pedido no banco
export function salvarPedido(itens) {
  const data = new Date().toISOString();
  const total = itens.reduce((soma, produto) => soma + (produto.preco || 0), 0);

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO pedidos (data, itens, total) VALUES (?, ?, ?);",
      [data, JSON.stringify(itens), total]
    );
  });
}

// lista todos os pedidos
export function listarPedidos(callback) {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM pedidos;", [], (_, { rows }) => {
      const pedidos = rows._array.map((row) => ({
        id: row.id,
        data: row.data,
        itens: JSON.parse(row.itens),
        total: row.total,
      }));
      callback(pedidos);
    });
  });
}