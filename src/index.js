#!/usr/bin/env node
import axios from "axios";
import chalk from "chalk";

const input = process.argv[2];

if (!input) {
  console.log(chalk.yellow("Uso: npx meu-cep <cep>"));
  process.exit(1);
}

async function searchItem(code) {
  const cep = code.replace(/\D/g, "");

  if (cep.length !== 8) {
    console.log(chalk.red("CEP inválido. Use 8 dígitos."));
    process.exit(1);
  }

  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: { Accept: "application/json" },
    });

    if (data.erro) {
      console.log(chalk.red("CEP não encontrado."));
      process.exit(1);
    }

    console.log(chalk.green(`📍 CEP: ${data.cep}`));
    console.log(`Endereço: ${data.logradouro}`);
    console.log(`Bairro: ${data.bairro}`);
    console.log(`Cidade: ${data.localidade}`);
    console.log(`Estado: ${data.uf}`);
  } catch {
    console.error(chalk.red("Erro ao consultar o CEP"));
    process.exit(1);
  }
}

searchItem(input);
