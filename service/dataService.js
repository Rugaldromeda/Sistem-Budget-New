const listaReceitas1 = async () =>  {
    const resposta = await fetch(`http://localhost:3000/receitasLoja1`);
    if (resposta.ok) {
        return resposta.json();
        console.log(resposta);
    }
    throw new Error('Não foi possível listar os clientes');
}
const buscaItemId = async (lista, id) =>  {
    const resposta = await fetch(`http://localhost:3000/${lista}/${id}`);
    if (resposta.ok) {
        return resposta.json();
        console.log(resposta);
    }
    throw new Error('Não foi possível listar os clientes');
}
const listaReceitas2 = async () =>  {
    const resposta = await fetch(`http://localhost:3000/receitasLoja2`);
    if (resposta.ok) {
        return resposta.json();
        console.log(resposta);
    }
    throw new Error('Não foi possível listar as receitas');
}
const listaDespesas = async () =>  {
    const resposta = await fetch(`http://localhost:3000/listaDespesas`);
    if (resposta.ok) {
        return resposta.json();
        console.log(resposta);
    }
    throw new Error('Não foi possível listar as despesas');
}
const periodos = async () =>  {
    const resposta = await fetch(`http://localhost:3000/periodos`);
    if (resposta.ok) {
        return resposta.json();
    }
    throw new Error('Não foi possível listar os meses e anos');
}

const criaPeriodo = async (mesAno) => { 
    const resposta = await fetch(`http://localhost:3000/periodos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            periodo:mesAno
        })
    });
    if (resposta.ok) {
        console.log("criou a data")
        return resposta.body;
    }
    throw new Error('data não foi criada');
}
const criaReceita = async (data,venda_dinheiro,venda_debito,venda_credito,
    venda_voucher,total,quantidade_clientes,data_ano,formId) => { 
    const resposta = await fetch(`http://localhost:3000/${formId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data,
            venda_dinheiro: venda_dinheiro,
            venda_debito: venda_debito,
            venda_credito: venda_credito,
            venda_voucher: venda_voucher,
            total: total,
            quantidade_clientes: quantidade_clientes,
            data_ano: data_ano
        })
    });
    if (resposta.ok) {
        return resposta.body;
    }
    throw new Error('Não foi possível criar uma receita');
}
const criaDespesa = async (data,nome_despesa,valor, 
    data_ano,formId ) => { 
    const resposta = await fetch(`http://localhost:3000/${formId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data,
            nome_despesa: nome_despesa,
            total:valor,
            data_ano: data_ano
        })
    });
    if (resposta.ok) {
        return resposta.body;
    }
    throw new Error('Não foi possível criar uma despesa');
}

const removeDado = async (campo, id) => { 
    const resposta = await fetch(`http://localhost:3000/${campo}/${id}`, {
        method: 'DELETE'
    });
    if (!resposta.ok) {
        throw new Error('Não foi possível deletar');
    }
}

const atualizaReceita = async (id, data,venda_dinheiro,venda_debito,venda_credito,
    venda_voucher,total,quantidade_clientes,data_ano,formId) => {
    const resposta = await fetch(`http://localhost:3000/${formId}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            data: data,
            venda_dinheiro: venda_dinheiro,
            venda_debito: venda_debito,
            venda_credito: venda_credito,
            venda_voucher: venda_voucher,
            total: total,
            quantidade_clientes: quantidade_clientes,
            data_ano: data_ano
        })
    });
    if (resposta.ok) {
        return resposta.json();
    }
    throw new Error('Não foi possível detalhar um cliente');
}
const atualizaDespesa = async (id, data,nome_despesa,valor, 
    data_ano,formId) => {
    const resposta = await fetch(`http://localhost:3000/${formId}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            data: data,
            nome_despesa: nome_despesa,
            total:valor,
            data_ano: data_ano
        })
    });
    if (resposta.ok) {
        return resposta.json();
    }
    throw new Error('Não foi possível editar');
}
export const acoes = {listaReceitas1, listaReceitas2,periodos, criaReceita,
     criaPeriodo, listaDespesas, criaDespesa, removeDado, atualizaReceita, buscaItemId, atualizaDespesa};

