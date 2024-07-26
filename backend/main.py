from flask import Flask,  request, abort
import pandas as pd
import json

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

@app.get('/mastite')
def get_mastite():
    df = pd.read_json('mastite.json')
    df['Data'] = pd.to_datetime(df['date_record'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date_record')
    return df.to_json(orient='records')


@app.get('/receita-leite')
def get_receita_leite():
    df = pd.read_json('receita-leite.json')
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('date')
    return df.to_json(orient='records')

@app.get('/producao-leite')
def get_producao_leite():
    df = pd.read_json('producao-leite.json')
    df['date_record'] = pd.to_datetime(df['Data'], format="%Y-%m-%dT%H:%M:%S.%f").dt.strftime('%Y-%m-%d')
    df =  df.sort_values('Data')
    return df.to_json(orient='records')

@app.get('/quantidade-animais')
def get_quantidade_animais():
    df = pd.read_json('quantidade-animais.json')
    return df.to_json(orient='records')

@app.get('/custo-alimentacao')
def get_custo_alimentacao():
    df = pd.read_json('custo-alimentacao.json')
    return df.to_json(orient='records')

@app.get('/custo-leite')
def get_custo_leite():
    df = pd.read_json('custo-leite.json')
    return df.to_json(orient='records')


@app.get('/eficiencia-alimentar')
def get_eficiencia_alimentar():
    df = pd.read_json('eficiencia-alimentar.json')
    return df.to_json(orient='records')



if __name__ == '__main__':
   app.run(host="0.0.0.0",port=8001, threaded=True, debug=True)
