import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function Login({ irParaCatalogo, irParaCadastro }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>
      <TextInput placeholder="Usuário" value={usuario} onChangeText={setUsuario} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={{ borderWidth: 1, marginBottom: 20, padding: 8 }} />
      <Button title="Entrar" onPress={irParaCatalogo} />
      <Button title="Cadastrar" onPress={irParaCadastro} />
    </View>
  );
}