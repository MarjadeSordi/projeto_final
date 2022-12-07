export const TrataCategoria = (categoria) => {
 let categ = ''; 
  switch(categoria){
    case 'MANUTENCAO_ELETRICA':
     categ= 'Manutenção elétrica'
     break
    case 'MANUTENCAO_HIDRAULICA':
      categ ='Manutenção Hidraúlica'
    break
    case  'DIARISTA':
      categ ='Diarista'
    break
    case 'BABA':
      categ ='Babá'
    break
    case 'BABA_POR_TURNO':
      categ ='Babá por turno'
    break
    case 'PINTORA':
      categ ='Pintora'
    break
    case 'PEQUENOS_REPAROS':
      categ ='Pequenos reparos'
    break
    case 'COSTURA':
      categ ='Costura'
    break
    case 'HIGIENE_PESSOAL':
      categ ='Higiene Pessoal'
    break
    default: categ = ''; 
  }
}

