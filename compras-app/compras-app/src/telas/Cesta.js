import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function Cesta({ nome, fazenda, preco, imagemFazenda, itens }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>
      <Text style={styles.subtitulo}>{fazenda}</Text>
      <Image source={{ uri: imagemFazenda }} style={styles.imagemFazenda} />
      <Text style={styles.preco}>{preco}</Text>

      <Text style={styles.itensTitulo}>Itens da cesta:</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagem }} style={styles.itemImagem} />
            <Text style={styles.item}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 }, // margem superior aumentada
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  subtitulo: { fontSize: 18, color: "#555", marginBottom: 5 },
  preco: { fontSize: 18, color: "green", marginBottom: 15 },
  imagemFazenda: { width: "100%", height: 200, marginBottom: 15, borderRadius: 10 },
  itensTitulo: { fontSize: 20, marginBottom: 10 },
  itemContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  itemImagem: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  item: { fontSize: 16 },
});