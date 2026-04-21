import json

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/messages/pt-BR.json'
with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Override services items to outcome-driven
data['services']['title'] = "FOCO EM"
data['services']['titleHighlight'] = "RESULTADO"
data['services']['subtitle'] = "Esqueça serviços engessados. Nós implementamos soluções que desbloqueiam a verdadeira eficiência e escalam."
data['services']['items'] = [
  {
    "title": "Automação Extrema",
    "description": "Remova gargalos manuais instalando bots e scripts que rodam 24/7 com precisão absoluta."
  },
  {
    "title": "Integração Fluida",
    "description": "Conectamos todo o seu ecossistema digital. Ferramentas, CRMs e ERPs se falando em tempo real."
  },
  {
    "title": "Sistemas Escaláveis",
    "description": "Software focado em reduzir custos e preparar sua estrutura tecnológica para volumes gigantes de operação."
  },
  {
    "title": "Inteligência Operacional",
    "description": "Visão analítica, dashboards estruturados e inteligência artificial antecipando problemas."
  }
]

# Override audience
data['audience']['eyebrow'] = "Para Quem Funciona"
data['audience']['title'] = "Sua operação precisa de maturidade tecnológica?"
data['audience']['description'] = "Empresas que não se adaptam a sistemas robustos estão perdendo escala."
data['audience']['items'] = [
    "Operações estagnadas por dependência de planilhas",
    "Empresas escalando além da capacidade manual",
    "Diretores buscando redução de custo fixo com automação"
]

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
