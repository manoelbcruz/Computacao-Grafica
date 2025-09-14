# 💻 Projeto de Computação Gráfica com Python e Flask

Uma aplicação web modular que demonstra algoritmos clássicos de computação gráfica. O projeto utiliza um backend em **Python** com o micro-framework **Flask** para realizar os cálculos e servir a aplicação, enquanto o frontend é construído com **HTML, CSS e JavaScript** para a interação do usuário.

A arquitetura foi projetada com **Flask Blueprints** para garantir que cada funcionalidade seja organizada em seu próprio módulo, tornando o código limpo e escalável.

---

### ✨ Funcionalidades

O projeto é dividido nos seguintes módulos, acessíveis através do menu de navegação lateral:

- ✅ **1-Tela Principal:** Página de boas-vindas da aplicação.
- ✅ **2-Sistemas de Coordenadas:** Demonstração interativa da conversão entre sistemas de coordenadas (Mundo, Dispositivo, etc.), com lógica executada no frontend para feedback em tempo real.
- ✅ **3-Retas:** Implementação e visualização dos algoritmos de rasterização de retas **DDA** e **Ponto Médio (Bresenham)**.
- ✅ **4-Circunferências:** Implementação e visualização do algoritmo de rasterização de circunferências de **Ponto Médio (Bresenham)**.
- ✅ **5-Transformações 2D:** Aplicação interativa de transformações geométricas (Translação, Escala e Rotação) em um objeto 2D.

---

### 🛠️ Tecnologias Utilizadas

- **Backend:**
  - ![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
  - ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- **Frontend:**
  - ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  - ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  - ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- **Arquitetura:**
  - Flask Blueprints para modularização.
  - Comunicação via API RESTful entre frontend e backend.

---

### 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação em seu ambiente local.

**1. Clone o repositório**

```bash
git clone [https://github.com/manoelbcruz/Computacao-grafica.git](https://github.com/manoelbcruz/Computacao-grafica.git)
cd Computacao-grafica
```

**2. Crie e ative um ambiente virtual**

Isso cria um ambiente isolado para as dependências do projeto.

```bash
# Crie o ambiente (pode ser necessário usar 'python3')
python -m venv venv (ou py -m venv venv)

# Ative o ambiente
# No Windows:
.\venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate
```

**3. Instale as dependências**

O arquivo `requirements.txt` lista todas as bibliotecas Python que o projeto precisa (neste caso, o Flask).

> **Nota:** Se você ainda não criou este arquivo, crie-o com o ambiente virtual ativado, usando o comando:
> `pip freeze > requirements.txt`

Após criar o arquivo, instale as dependências:

```bash
pip install -r requirements.txt
```

**4. Execute a aplicação**

Com o ambiente virtual ainda ativo, inicie o servidor Flask:

```bash
python run.py
```

**5. Acesse no navegador**

O terminal mostrará que o servidor está rodando. Abra seu navegador e acesse a seguinte URL:

[http://127.0.0.1:5001](http://127.0.0.1:5001)

---

### 🛑 Como Parar a Aplicação

Quando terminar de usar o projeto, siga estes passos para desligar o servidor e o ambiente virtual de forma segura.

**1. Pare o Servidor Flask:**

- Volte para a janela do terminal onde o servidor está rodando.
- Pressione as teclas `Ctrl + C`. Isso interromperá o processo do servidor e devolverá o controle do terminal a você.

**2. Desative o Ambiente Virtual:**

- Após parar o servidor, o ambiente virtual ainda estará ativo. Para sair, digite o comando:
  ```bash
  deactivate
  ```
- O prefixo `(venv)` desaparecerá do seu terminal, indicando que o ambiente foi desativado.
