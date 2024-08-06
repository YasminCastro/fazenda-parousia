from flask import Flask,  request, abort
import pandas as pd
import json
import random

app = Flask(__name__)
@app.get('/data')
def get_data():
   df = pd.read_json('dados.json')
   return df.to_json(orient='records')

@app.get('/producao')
def get_producao():
   df = pd.read_json('producao.json')
   df['Data'] = pd.to_datetime(df['Data'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
   df = df.sort_values('Data')
   df.columns = ['data', 'producao']
   return df.to_json(orient='records')

@app.get('/receita-leite')
def get_receita_leite():
    df = pd.read_json('receita-leite.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/custo-leite')
def get_custo_leite():
    df = pd.read_json('custo-leite.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/custo-alimentacao')
def get_custo_alimentacao():
    df = pd.read_json('custo-alimentacao.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/margem-alimentacao')
def get_margem_alimentacao():
    df = pd.read_json('margem-alimentacao.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/margem-leite')
def get_margem_leite():
    df = pd.read_json('margem-leite.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/retorno-investimento')
def get_retorno_investimento():
    df = pd.read_json('retorno-investimento.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/producao-leite')
def get_producao_leite():
    df = pd.read_json('producao-leite.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/quantidade-animais')
def get_quantidade_animais():
    df = pd.read_json('quantidade-animais.json')
    return df.to_json(orient='records')

@app.get('/eficiencia-alimentar')
def get_eficiencia_alimentar():
    df = pd.read_json('eficiencia-alimentar.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')


@app.get('/mastite')
def get_mastite():
    df = pd.read_json('mastite.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/get-dados')
def get_dados():
    data = [
        {
            "key": "Animais",
            "Lote A": random.randint(30, 70),
            "Lote B": random.randint(30, 70),
            "Lote C": random.randint(30, 70),
            "Lote D": random.randint(30, 70),
            "Lote N": random.randint(30, 70),
            "KPI": "Número de Animais",
            "Fazenda": random.randint(220, 230),
            "Ordem": 0
        },
        {
            "key": "vaca_mastite",
            "Lote A": random.randint(0, 7),
            "Lote B": random.randint(0, 1),
            "Lote C": random.randint(0, 1),
            "Lote D": random.randint(0, 1),
            "Lote N": random.randint(0, 1),
            "KPI": "Vacas Mastite",
            "Fazenda": random.randint(0, 10),
            "Ordem": 1
        },
        {
            "key": "vaca_carencia_mastite",
            "Lote A": random.randint(0, 5),
            "Lote B": random.randint(0, 1),
            "Lote C": random.randint(0, 1),
            "Lote D": random.randint(0, 1),
            "Lote N": random.randint(0, 1),
            "KPI": "Vacas Carência Mastite",
            "Fazenda": random.randint(0, 5),
            "Ordem": 2
        },
        {
            "key": "DEL",
            "Lote A": round(random.uniform(170, 220), 2),
            "Lote B": round(random.uniform(170, 220), 2),
            "Lote C": round(random.uniform(170, 220), 2),
            "Lote D": round(random.uniform(170, 220), 2),
            "Lote N": round(random.uniform(170, 220), 2),
            "KPI": "DEL",
            "Fazenda": round(random.uniform(170, 220), 2),
            "Ordem": 3
        },
        {
            "key": "Producao",
            "Lote A": random.randint(800, 2400),
            "Lote B": random.randint(800, 2400),
            "Lote C": random.randint(800, 2400),
            "Lote D": random.randint(800, 2400),
            "Lote N": random.randint(800, 2400),
            "KPI": "Produção (Kg)",
            "Fazenda": random.randint(800, 2400),
            "Ordem": 4
        },
        {
            "key": "Media_Producao",
            "Lote A": round(random.uniform(20, 45), 2),
            "Lote B": round(random.uniform(20, 45), 2),
            "Lote C": round(random.uniform(20, 45), 2),
            "Lote D": round(random.uniform(20, 45), 2),
            "Lote N": round(random.uniform(20, 45), 2),
            "KPI": "Média de produção (kg/vaca/dia)",
            "Fazenda": round(random.uniform(20, 45), 2),
            "Ordem": 5
        },
        {
            "key": "Receita do Leite",
            "Lote A": round(random.uniform(2000, 5000), 2),
            "Lote B": round(random.uniform(2000, 5000), 2),
            "Lote C": round(random.uniform(2000, 5000), 2),
            "Lote D": round(random.uniform(2000, 5000), 2),
            "Lote N": round(random.uniform(2000, 5000), 2),
            "KPI": "Receita do Leite (R$)",
            "Fazenda": round(random.uniform(10000, 15000), 2),
            "Ordem": 6
        },
        {
            "key": "Feed_Cost",
            "Lote A": round(random.uniform(20, 40), 2),
            "Lote B": round(random.uniform(20, 40), 2),
            "Lote C": round(random.uniform(20, 40), 2),
            "Lote D": round(random.uniform(20, 40), 2),
            "Lote N": round(random.uniform(20, 40), 2),
            "KPI": "Custo alimentação",
            "Fazenda": round(random.uniform(20, 40), 2),
            "Ordem": 7
        },
        {
            "key": "IoFC / vaca",
            "Lote A": round(random.uniform(20, 40), 2),
            "Lote B": round(random.uniform(20, 40), 2),
            "Lote C": round(random.uniform(20, 40), 2),
            "Lote D": round(random.uniform(20, 40), 2),
            "Lote N": round(random.uniform(20, 40), 2),
            "KPI": "Margem sobre alimentação (R$/vaca/dia)",
            "Fazenda": round(random.uniform(20, 40), 2),
            "Ordem": 8
        },
        {
            "key": "IoFC / litro",
            "Lote A": round(random.uniform(1, 2), 2),
            "Lote B":round(random.uniform(1, 2), 2),
            "Lote C": round(random.uniform(1, 2), 2),
            "Lote D": round(random.uniform(1, 2), 2),
            "Lote N":round(random.uniform(1, 2), 2),
            "KPI": "Margem sobre alimentação (R$/kg)",
            "Fazenda": round(random.uniform(1, 2), 2),
            "Ordem": 9
        },
        {
            "key": "custo",
            "Lote A": round(random.uniform(50, 60), 2),
            "Lote B": round(random.uniform(50, 60), 2),
            "Lote C": round(random.uniform(50, 60), 2),
            "Lote D": round(random.uniform(50, 60), 2),
            "Lote N": round(random.uniform(50, 60), 2),
            "KPI": "Retorno Investimento (%)",
            "Fazenda": round(random.uniform(50, 60), 2),
            "Ordem": 10
        },
        {
            "key": "Feed Efficiency",
            "Lote A": round(random.uniform(1, 2), 2),
            "Lote B": round(random.uniform(1, 2), 2),
            "Lote C": round(random.uniform(1, 2), 2),
            "Lote D": round(random.uniform(1, 2), 2),
            "Lote N": round(random.uniform(1, 2), 2),
            "KPI": "Eficiência Alimentar",
            "Fazenda": round(random.uniform(1, 2), 2),
            "Ordem": 11
        },
        {
            "key": "Controle Leiteiro",
            "Lote A": round(random.uniform(20, 50), 2),
            "Lote B": round(random.uniform(20, 50), 2),
            "Lote C": round(random.uniform(20, 50), 2),
            "Lote D": round(random.uniform(20, 50), 2),
            "Lote N": round(random.uniform(20, 50), 2),
            "KPI": "Controle Leiteiro",
            "Fazenda": round(random.uniform(20, 50), 2),
            "Ordem": 12
        }
    ]
    return json.dumps(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8001, threaded=True, debug=True)



if __name__ == '__main__':
   app.run(host="0.0.0.0",port=8001, threaded=True, debug=True)
