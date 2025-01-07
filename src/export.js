import { collection, getDocs, doc, setDoc, query } from "firebase/firestore";
import { db } from "./firebase";


async function exportCollectionToCSV(collectionName) {
  try {
    const q = query(collection(db, collectionName));
    console.log(q);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Nenhum documento encontrado.');
      return;
    } else {
      console.log('doc encontrado');
    }

    const records = [];
    querySnapshot.forEach((doc) => {
      records.push({
        id: doc.id,
        ...doc.data()['selecionados'],
      });
    });

    
    if (!Array.isArray(records) || records.length === 0) {
      console.error('O array de dados está vazio ou inválido.');
      return;
    }

    // Transformar os dados em formato CSV
    const headers = Object.keys(records[0]).join(',');
    const rows = records.map(obj => Object.values(obj).join(','));
    const csvContent = [headers, ...rows].join('\n');

    // Criar um blob para o arquivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Criar um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dados.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Arquivo CSV gerado e baixado com sucesso!');




  } catch (error) {
    console.error('Erro ao exportar dados: ', error);
  };
};


// Chame a função com o nome da coleção que deseja exportar
export default exportCollectionToCSV;
